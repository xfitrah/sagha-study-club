
import "./data/materi/validasi-kata";
import { useEffect, useState } from "react";

import {
  daftarMateri,
  dataHuruf,
  dataKata,
  dataSukuKata,
  type MateriId,
} from "./data/materi";

import {
  dataKataSederhana,
  tingkatKataSederhana,
} from "./data/materi/kata-sederhana";

import { dataKataTambahan } from "./data/materi/kata-tambahan";
import { dataKataLanjutan } from "./data/materi/kata-lanjutan";
import { dataKataPengayaan } from "./data/materi/kata-pengayaan";
import { dataAngka } from "./data/materi/berhitung";

import MenghitungBenda from "./MenghitungBenda";
import MembandingkanBilangan from "./MembandingkanBilangan";
import PenjumlahanBilangan from "./PenjumlahanBilangan";
import PenguranganBilangan from "./PenguranganBilangan";

import LatihanPraMenulis from "./LatihanPraMenulis";
import MenebalkanHuruf from "./MenebalkanHuruf";
import MenyalinHuruf from "./MenyalinHuruf";
import MenulisSukuKata from "./MenulisSukuKata";
import MenulisAngka from "./MenulisAngka";

import "./App.css";

type KelompokKata =
  | "sederhana"
  | "awal"
  | "tambahan"
  | "lanjutan"
  | "pengayaan";

type FilterTingkat = "semua" | "1" | "2" | "3" | "4";

type TahapHalaman =
  | "pembuka"
  | "pilih-pelajaran"
  | "materi";

type JenisPelajaran =
  | "membaca"
  | "menulis"
  | "berhitung";

type TopikBerhitung =
  | "angka"
  | "menghitung"
  | "membandingkan"
  | "penjumlahan"
  | "pengurangan";

type TopikMenulis =
  | "pra-menulis"
  | "menebalkan-huruf"
  | "menyalin-huruf"
  | "menulis-suku-kata"
  | "menulis-angka";

type StatusBelajar = {
  tahapHalaman: TahapHalaman;
  pelajaranAktif: JenisPelajaran;
  materiAktif: MateriId;
  kelompokKata: KelompokKata;
  hurufFilter: string;
  tingkatFilter: FilterTingkat;
  indeksAktif: number;
  tampilkanDaftar: boolean;
  indeksAngka: number;
  topikBerhitung: TopikBerhitung;
  tampilkanDaftarAngka: boolean;
  topikMenulis: TopikMenulis;
};

const KUNCI_STATUS = "sagha-study-club-status";

const statusDefault: StatusBelajar = {
  tahapHalaman: "pembuka",
  pelajaranAktif: "membaca",
  materiAktif: "huruf",
  kelompokKata: "sederhana",
  hurufFilter: "semua",
  tingkatFilter: "semua",
  indeksAktif: 0,
  tampilkanDaftar: false,
  indeksAngka: 0,
  topikBerhitung: "angka",
  tampilkanDaftarAngka: false,
  topikMenulis: "pra-menulis",
};

function bacaStatus(): StatusBelajar {
  try {
    const tersimpan = sessionStorage.getItem(KUNCI_STATUS);

    if (!tersimpan) {
      return statusDefault;
    }

    const data = JSON.parse(tersimpan);

    const status: StatusBelajar = {
      ...statusDefault,
      ...data,
    };

    const topikValid: TopikBerhitung[] = [
      "angka",
      "menghitung",
      "membandingkan",
      "penjumlahan",
      "pengurangan",
    ];

    if (!topikValid.includes(status.topikBerhitung)) {
      status.topikBerhitung = "angka";
    }

    const topikMenulisValid: TopikMenulis[] = [
      "pra-menulis",
      "menebalkan-huruf",
      "menyalin-huruf",
      "menulis-suku-kata",
      "menulis-angka",
    ];

    if (!topikMenulisValid.includes(status.topikMenulis)) {
      status.topikMenulis = "pra-menulis";
    }

    if (
      typeof status.indeksAngka !== "number" ||
      status.indeksAngka < 0 ||
      status.indeksAngka >= dataAngka.length
    ) {
      status.indeksAngka = 0;
    }

    return status;
  } catch {
    return statusDefault;
  }
}

const ikonMateri: Record<MateriId, string> = {
  huruf: "🔤",
  "suku-kata": "🧩",
  kata: "📚",
};

const deskripsiKelompok: Record<KelompokKata, string> = {
  sederhana: "Mulai dari kata-kata yang mudah dibaca.",
  awal: "Kenali beragam kata dari A sampai Z.",
  tambahan: "Tambah koleksi kata baru.",
  lanjutan: "Tantang kemampuan membacamu.",
  pengayaan: "Jelajahi lebih banyak kosakata.",
};

const pilihanPelajaran: {
  id: JenisPelajaran;
  ikon: string;
  judul: string;
  deskripsi: string;
}[] = [
  {
    id: "membaca",
    ikon: "📖",
    judul: "Membaca",
    deskripsi: "Kenali huruf, suku kata, dan kata.",
  },
  {
    id: "menulis",
    ikon: "✏️",
    judul: "Menulis",
    deskripsi: "Belajar menulis dengan lebih terampil.",
  },
  {
    id: "berhitung",
    ikon: "🔢",
    judul: "Berhitung",
    deskripsi: "Jelajahi angka dan latihan berhitung.",
  },
];

const pilihanTopikBerhitung: {
  id: TopikBerhitung;
  ikon: string;
  judul: string;
}[] = [
  {
    id: "angka",
    ikon: "🔢",
    judul: "Mengenal Angka",
  },
  {
    id: "menghitung",
    ikon: "🍎",
    judul: "Menghitung Benda",
  },
  {
    id: "membandingkan",
    ikon: "⚖️",
    judul: "Membandingkan Bilangan",
  },
  {
    id: "penjumlahan",
    ikon: "➕",
    judul: "Penjumlahan",
  },
  {
    id: "pengurangan",
    ikon: "➖",
    judul: "Pengurangan",
  },
];

const pilihanTopikMenulis: {
  id: TopikMenulis;
  ikon: string;
  judul: string;
  deskripsi: string;
}[] = [
  {
    id: "pra-menulis",
    ikon: "〰️",
    judul: "Latihan Pra-Menulis",
    deskripsi: "Berlatih mengikuti garis lurus, lengkung, dan pola.",
  },
  {
    id: "menebalkan-huruf",
    ikon: "🔤",
    judul: "Menebalkan Huruf",
    deskripsi: "Belajar menebalkan huruf kapital dan huruf kecil A–Z.",
  },
  {
    id: "menyalin-huruf",
    ikon: "✍️",
    judul: "Menyalin Huruf",
    deskripsi: "Lihat contoh huruf, lalu tulis sendiri di area latihan.",
  },
  {
    id: "menulis-suku-kata",
    ikon: "📝",
    judul: "Menulis Suku Kata",
    deskripsi:
      "Belajar menulis suku kata sederhana seperti ba, bi, bu, be, dan bo.",
  },
  {
    id: "menulis-angka",
    ikon: "🔢",
    judul: "Menulis Angka 1–10",
    deskripsi:
      "Berlatih menebalkan dan menulis angka 1 sampai 10.",
  },
];

function App() {
  const [statusAwal] = useState<StatusBelajar>(bacaStatus);

  const [tahapHalaman, setTahapHalaman] =
    useState<TahapHalaman>(statusAwal.tahapHalaman);

  const [pelajaranAktif, setPelajaranAktif] =
    useState<JenisPelajaran>(statusAwal.pelajaranAktif);

  const [materiAktif, setMateriAktif] =
    useState<MateriId>(statusAwal.materiAktif);

  const [kelompokKata, setKelompokKata] =
    useState<KelompokKata>(statusAwal.kelompokKata);

  const [hurufFilter, setHurufFilter] =
    useState(statusAwal.hurufFilter);

  const [tingkatFilter, setTingkatFilter] =
    useState<FilterTingkat>(statusAwal.tingkatFilter);

  const [indeksAktif, setIndeksAktif] =
    useState(statusAwal.indeksAktif);

  const [tampilkanDaftar, setTampilkanDaftar] =
    useState(statusAwal.tampilkanDaftar);

  const [indeksAngka, setIndeksAngka] =
    useState(statusAwal.indeksAngka);

  const [topikBerhitung, setTopikBerhitung] =
    useState<TopikBerhitung>(statusAwal.topikBerhitung);

  const [tampilkanDaftarAngka, setTampilkanDaftarAngka] =
    useState(statusAwal.tampilkanDaftarAngka);

  const [topikMenulis, setTopikMenulis] =
    useState<TopikMenulis>(statusAwal.topikMenulis);

  // Simpan posisi belajar setiap kali ada perubahan.
  useEffect(() => {
    const status: StatusBelajar = {
      tahapHalaman,
      pelajaranAktif,
      materiAktif,
      kelompokKata,
      hurufFilter,
      tingkatFilter,
      indeksAktif,
      tampilkanDaftar,
      indeksAngka,
      topikBerhitung,
      tampilkanDaftarAngka,
      topikMenulis,
    };

    try {
      sessionStorage.setItem(
        KUNCI_STATUS,
        JSON.stringify(status)
      );
    } catch {
      // Aplikasi tetap dapat digunakan jika penyimpanan tidak tersedia.
    }
  }, [
    tahapHalaman,
    pelajaranAktif,
    materiAktif,
    kelompokKata,
    hurufFilter,
    tingkatFilter,
    indeksAktif,
    tampilkanDaftar,
    indeksAngka,
    topikBerhitung,
    tampilkanDaftarAngka,
    topikMenulis,
  ]);

  const kataUntukMateri =
    kelompokKata === "sederhana"
      ? dataKataSederhana
      : kelompokKata === "awal"
        ? dataKata
        : kelompokKata === "tambahan"
          ? dataKataTambahan
          : kelompokKata === "lanjutan"
            ? dataKataLanjutan
            : dataKataPengayaan;

  const kataDenganTingkat =
    kelompokKata !== "sederhana" || tingkatFilter === "semua"
      ? kataUntukMateri
      : kataUntukMateri.filter(
          (item) =>
            String(tingkatKataSederhana[item.kata]) === tingkatFilter
        );

  const daftarHurufTersedia = Array.from(
    new Set(kataDenganTingkat.map((item) => item.huruf))
  ).sort();

  const kataTerfilter =
    hurufFilter === "semua"
      ? kataDenganTingkat
      : kataDenganTingkat.filter(
          (item) => item.huruf === hurufFilter
        );

  const jumlahMateri =
    materiAktif === "huruf"
      ? dataHuruf.length
      : materiAktif === "suku-kata"
        ? dataSukuKata.length
        : kataTerfilter.length;

  const kataAktif = kataTerfilter[indeksAktif];
  const angkaAktif = dataAngka[indeksAngka];

  const materiTerpilih = daftarMateri.find(
    (materi) => materi.id === materiAktif
  );

  const mulaiBelajar = () => {
    setTahapHalaman("pilih-pelajaran");
  };

  const pilihPelajaran = (pelajaran: JenisPelajaran) => {
    setPelajaranAktif(pelajaran);

    if (pelajaran === "membaca") {
      setMateriAktif("huruf");
      setIndeksAktif(0);
      setKelompokKata("sederhana");
      setHurufFilter("semua");
      setTingkatFilter("semua");
      setTampilkanDaftar(false);
      setTahapHalaman("materi");
    } else if (pelajaran === "berhitung") {
      setTopikBerhitung("angka");
      setIndeksAngka(0);
      setTampilkanDaftarAngka(false);
      setTahapHalaman("materi");
    } else {
      setTopikMenulis("pra-menulis");
      setTahapHalaman("materi");
    }
  };

  const kembaliKePilihanPelajaran = () => {
    setTahapHalaman("pilih-pelajaran");
    setIndeksAktif(0);
    setIndeksAngka(0);
    setTampilkanDaftar(false);
    setTampilkanDaftarAngka(false);
  };

  const pilihMateri = (id: MateriId) => {
    setMateriAktif(id);
    setIndeksAktif(0);
    setTampilkanDaftar(false);
  };

  const pilihKelompokKata = (kelompok: KelompokKata) => {
    setKelompokKata(kelompok);
    setHurufFilter("semua");
    setTingkatFilter("semua");
    setIndeksAktif(0);
    setTampilkanDaftar(false);
  };

  const pilihHuruf = (huruf: string) => {
    setHurufFilter(huruf);
    setIndeksAktif(0);
    setTampilkanDaftar(false);
  };

  const pilihTingkat = (tingkat: FilterTingkat) => {
    setTingkatFilter(tingkat);
    setHurufFilter("semua");
    setIndeksAktif(0);
    setTampilkanDaftar(false);
  };

  const materiBerikutnya = () => {
    setIndeksAktif((sebelumnya) =>
      jumlahMateri > 0
        ? (sebelumnya + 1) % jumlahMateri
        : 0
    );
  };

  const materiSebelumnya = () => {
    setIndeksAktif((sebelumnya) =>
      jumlahMateri > 0
        ? (sebelumnya - 1 + jumlahMateri) % jumlahMateri
        : 0
    );
  };

  const angkaBerikutnya = () => {
    setIndeksAngka((sebelumnya) =>
      (sebelumnya + 1) % dataAngka.length
    );
  };

  const angkaSebelumnya = () => {
    setIndeksAngka((sebelumnya) =>
      (sebelumnya - 1 + dataAngka.length) % dataAngka.length
    );
  };

  const pilihAngka = (indeks: number) => {
    setIndeksAngka(indeks);
  };

  const pilihTopikBerhitung = (topik: TopikBerhitung) => {
    setTopikBerhitung(topik);
    setTampilkanDaftarAngka(false);
  };

  const pilihTopikMenulis = (topik: TopikMenulis) => {
    setTopikMenulis(topik);
  };

  const daftarPilihan =
    materiAktif === "huruf"
      ? dataHuruf
      : materiAktif === "suku-kata"
        ? dataSukuKata
        : kataTerfilter.map((item) => item.kata);

  const persentaseMateri =
    jumlahMateri > 0
      ? ((indeksAktif + 1) / jumlahMateri) * 100
      : 0;

  const persentaseAngka =
    angkaAktif
      ? ((indeksAngka + 1) / dataAngka.length) * 100
      : 0;

  const kelasMain =
    tahapHalaman === "pembuka"
      ? "main main-centered main-welcome"
      : tahapHalaman === "pilih-pelajaran"
        ? "main main-centered main-selection"
        : "main";

  const judulTopikBerhitung =
    topikBerhitung === "angka"
      ? "Mengenal Angka 0–20"
      : topikBerhitung === "menghitung"
        ? "Menghitung Benda 0–10"
        : topikBerhitung === "membandingkan"
          ? "Membandingkan Bilangan 0–10"
          : topikBerhitung === "penjumlahan"
            ? "Penjumlahan Bilangan 0–10"
            : "Pengurangan Bilangan 0–10";

  const deskripsiTopikBerhitung =
    topikBerhitung === "angka"
      ? "Yuk, kenali lambang angka dan namanya!"
      : topikBerhitung === "menghitung"
        ? "Amati benda-benda berikut, lalu hitung jumlahnya."
        : topikBerhitung === "membandingkan"
          ? "Yuk, belajar membandingkan jumlah benda!"
          : topikBerhitung === "penjumlahan"
            ? "Yuk, gabungkan dua kelompok benda dan hitung jumlahnya!"
            : "Yuk, belajar mengurangi benda dan menghitung sisanya!";

  const deskripsiPenutupBerhitung =
    topikBerhitung === "angka"
      ? "Mengenal angka adalah langkah pertama menjadi jago berhitung."
      : topikBerhitung === "menghitung"
        ? "Menghitung benda membantu kita memahami jumlah."
        : topikBerhitung === "membandingkan"
          ? "Membandingkan bilangan membantu kita memahami lebih banyak, lebih sedikit, dan sama banyak."
          : topikBerhitung === "penjumlahan"
            ? "Penjumlahan membantu kita mengetahui jumlah seluruh benda."
            : "Pengurangan membantu kita mengetahui jumlah benda yang tersisa.";

  const judulTopikMenulis =
    topikMenulis === "pra-menulis"
      ? "Latihan Pra-Menulis"
      : topikMenulis === "menebalkan-huruf"
        ? "Menebalkan Huruf A–Z"
        : topikMenulis === "menyalin-huruf"
          ? "Menyalin Huruf A–Z"
          : topikMenulis === "menulis-suku-kata"
            ? "Menulis Suku Kata"
            : "Menulis Angka 1–10";

  const deskripsiPenutupMenulis =
    topikMenulis === "pra-menulis"
      ? "Latihan kecil hari ini membantu tanganmu semakin siap menulis."
      : topikMenulis === "menebalkan-huruf"
        ? "Terus berlatih mengikuti bentuk huruf agar tulisanmu semakin rapi."
        : topikMenulis === "menyalin-huruf"
          ? "Latihan menyalin membantu kamu mengenal bentuk huruf dan menulisnya sendiri."
          : topikMenulis === "menulis-suku-kata"
            ? "Latihan menulis suku kata membantu kamu menyusun huruf menjadi bunyi yang bermakna."
            : "Terus berlatih menulis angka agar tulisanmu semakin rapi dan mudah dibaca.";

  return (
    <div className="app">
      <header className="header">
        <a
          href="/"
          className="brand"
          aria-label="Sagha Study Club, beranda"
          onClick={(event) => {
            event.preventDefault();
            setTahapHalaman("pembuka");
          }}
        >
          <img
            src="/sagha-logo.svg"
            alt=""
            className="brand-logo"
          />

          <div className="brand-text">
            <h1>Sagha Study Club</h1>
            <p>Belajar membaca, tumbuh bersama.</p>
          </div>
        </a>

        <div className="grade-badge">
          <span>🎒</span>
          Kelas 1 SD
        </div>
      </header>

      <main className={kelasMain}>
        {tahapHalaman === "pembuka" && (
          <section className="welcome">
            <div className="welcome-content">
              <span className="welcome-label">
                HALO, TEMAN BELAJAR! 👋
              </span>

              <h2>
                Yuk, belajar
                <br />
                hal baru hari ini!
              </h2>

              <p>
                Membaca, menulis, dan berhitung.
                Kita belajar sedikit demi sedikit!
              </p>

              <button
                className="nav-button primary"
                onClick={mulaiBelajar}
              >
                Mulai Belajar
                <span>→</span>
              </button>
            </div>

            <div className="welcome-decoration" aria-hidden="true">
              <span className="decoration-star star-one">✦</span>
              <span className="decoration-star star-two">✦</span>
              <span className="decoration-circle">📖</span>
              <span className="decoration-small">✏️</span>
            </div>
          </section>
        )}

        {tahapHalaman === "pilih-pelajaran" && (
          <section className="catalog">
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  AYO MULAI BELAJAR
                </span>
                <h2>Mau belajar apa hari ini?</h2>
                <p>
                  Pilih pelajaran yang ingin kamu jelajahi.
                </p>
              </div>
            </div>

            <div className="materi-list">
              {pilihanPelajaran.map((pelajaran) => (
                <button
                  key={pelajaran.id}
                  className="materi-item"
                  onClick={() => pilihPelajaran(pelajaran.id)}
                >
                  <span className="materi-icon">
                    {pelajaran.ikon}
                  </span>

                  <span className="materi-info">
                    <strong>{pelajaran.judul}</strong>
                    <small>{pelajaran.deskripsi}</small>
                  </span>

                  <span className="materi-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {tahapHalaman === "materi" &&
          pelajaranAktif === "membaca" && (
            <>
              <button
                className="toggle-list"
                onClick={kembaliKePilihanPelajaran}
              >
                <span>← Kembali ke Pilihan Pelajaran</span>
              </button>

              <section className="lesson">
                <div className="lesson-heading">
                  <div>
                    <span className="section-kicker">
                      WAKTUNYA BELAJAR
                    </span>
                    <h2>{materiTerpilih?.judul}</h2>
                  </div>

                  <div className="lesson-count">
                    <span>{indeksAktif + 1}</span>
                    <span className="count-divider">/</span>
                    <span>{jumlahMateri}</span>
                  </div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-value"
                    style={{ width: `${persentaseMateri}%` }}
                  />
                </div>

                {materiAktif === "kata" && (
                  <>
                    <div className="word-group-heading">
                      <div>
                        <h3>Pilih kumpulan kata</h3>
                        <p>{deskripsiKelompok[kelompokKata]}</p>
                      </div>
                    </div>

                    <div className="word-group-selector">
                      {(
                        [
                          ["sederhana", "🌱", "Kata Sederhana"],
                          ["awal", "🔤", "Kata A-Z"],
                          ["tambahan", "🌼", "Kata Tambahan"],
                          ["lanjutan", "🚀", "Kata Lanjutan"],
                          ["pengayaan", "⭐", "Pengayaan"],
                        ] as [KelompokKata, string, string][]
                      ).map(([id, ikon, label]) => (
                        <button
                          key={id}
                          className={kelompokKata === id ? "selected" : ""}
                          onClick={() => pilihKelompokKata(id)}
                          aria-pressed={kelompokKata === id}
                        >
                          <span>{ikon}</span>
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="filter-panel">
                      {kelompokKata === "sederhana" && (
                        <div className="word-filter">
                          <label htmlFor="word-level-filter">
                            Tingkat kesulitan
                          </label>

                          <select
                            id="word-level-filter"
                            value={tingkatFilter}
                            onChange={(event) =>
                              pilihTingkat(
                                event.target.value as FilterTingkat
                              )
                            }
                          >
                            <option value="semua">Semua tingkat</option>
                            <option value="1">
                              Tingkat 1 · Paling mudah
                            </option>
                            <option value="2">Tingkat 2 · Mudah</option>
                            <option value="3">Tingkat 3 · Menengah</option>
                            <option value="4">Tingkat 4 · Pengayaan</option>
                          </select>
                        </div>
                      )}

                      <div className="word-filter">
                        <label htmlFor="word-letter-filter">
                          Pilih huruf awal
                        </label>

                        <select
                          id="word-letter-filter"
                          value={hurufFilter}
                          onChange={(event) =>
                            pilihHuruf(event.target.value)
                          }
                        >
                          <option value="semua">Semua huruf</option>

                          {daftarHurufTersedia.map((huruf) => (
                            <option key={huruf} value={huruf}>
                              Huruf {huruf}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {materiAktif === "huruf" && (
                  <div className="learning-card letter-card">
                    <div className="learning-card-top">
                      <span className="learning-pill">
                        MENGENAL HURUF
                      </span>
                      <span className="learning-sparkle">✦</span>
                    </div>

                    <div className="letter-display">
                      <span className="uppercase-letter">
                        {dataHuruf[indeksAktif]}
                      </span>

                      <span className="lowercase-letter">
                        {dataHuruf[indeksAktif].toLowerCase()}
                      </span>
                    </div>

                    <div className="learning-tip">
                      <span>💡</span>
                      Perhatikan huruf besar dan huruf kecilnya.
                    </div>
                  </div>
                )}

                {materiAktif === "suku-kata" && (
                  <div className="learning-card syllable-card">
                    <div className="learning-card-top">
                      <span className="learning-pill">
                        MENGENAL SUKU KATA
                      </span>
                      <span className="learning-sparkle">✦</span>
                    </div>

                    <div className="syllable-display">
                      {dataSukuKata[indeksAktif]}
                    </div>

                    <div className="learning-tip">
                      <span>🗣️</span>
                      Yuk, baca suku kata ini bersama pengajar.
                    </div>
                  </div>
                )}

                {materiAktif === "kata" && kataAktif && (
                  <div className="learning-card word-card">
                    <div className="learning-card-top">
                      <span className="learning-pill">
                        AYO MEMBACA KATA
                      </span>
                      <span className="learning-sparkle">✦</span>
                    </div>

                    <div className="word-illustration" aria-hidden="true">
                      {kataAktif.emoji}
                    </div>

                    <div className="word-letter">
                      KATA DENGAN HURUF {kataAktif.huruf}
                    </div>

                    <h3 className="word-title">{kataAktif.kata}</h3>

                    <div
                      className="syllable-break"
                      aria-label={`Suku kata: ${kataAktif.sukuKata
                        .split("-")
                        .join(", ")}`}
                    >
                      {kataAktif.sukuKata
                        .split("-")
                        .map((bagian, index) => (
                          <span key={`${bagian}-${index}`}>
                            {bagian}
                          </span>
                        ))}
                    </div>

                    <div className="learning-tip">
                      <span>🌟</span>
                      Bacalah kata ini, lalu perhatikan suku katanya.
                    </div>
                  </div>
                )}

                {materiAktif === "kata" && !kataAktif && (
                  <div className="learning-card empty-card">
                    <span>📚</span>
                    <h3>Belum ada kata di sini</h3>
                    <p>
                      Coba pilih tingkat atau huruf yang lain, ya.
                    </p>
                  </div>
                )}

                <div className="lesson-navigation">
                  <button
                    className="nav-button secondary"
                    onClick={materiSebelumnya}
                    disabled={jumlahMateri === 0}
                  >
                    <span>←</span>
                    Sebelumnya
                  </button>

                  <button
                    className="nav-button primary"
                    onClick={materiBerikutnya}
                    disabled={jumlahMateri === 0}
                  >
                    Berikutnya
                    <span>→</span>
                  </button>
                </div>

                <button
                  className="toggle-list"
                  onClick={() => setTampilkanDaftar(!tampilkanDaftar)}
                  aria-expanded={tampilkanDaftar}
                >
                  <span>
                    {tampilkanDaftar
                      ? "Tutup daftar materi"
                      : "Lihat semua materi"}
                  </span>
                  <span>{tampilkanDaftar ? "−" : "+"}</span>
                </button>

                {tampilkanDaftar && (
                  <div className="letter-grid">
                    {daftarPilihan.map((item, index) => (
                      <button
                        key={`${item}-${index}`}
                        className={`grid-item ${
                          indeksAktif === index ? "selected" : ""
                        }`}
                        onClick={() => setIndeksAktif(index)}
                        aria-pressed={indeksAktif === index}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="catalog">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">
                      BELAJAR MEMBACA
                    </span>
                    <h2>Pilih materi membaca</h2>
                    <p>
                      Kita mulai dari huruf, lalu belajar suku kata dan kata.
                    </p>
                  </div>
                </div>

                <div className="materi-list">
                  {daftarMateri.map((materi) => (
                    <button
                      key={materi.id}
                      className={`materi-item ${
                        materiAktif === materi.id ? "active" : ""
                      }`}
                      onClick={() => pilihMateri(materi.id)}
                      aria-pressed={materiAktif === materi.id}
                    >
                      <span className={`materi-icon icon-${materi.id}`}>
                        {ikonMateri[materi.id]}
                      </span>

                      <span className="materi-info">
                        <strong>{materi.judul}</strong>
                        <small>{materi.deskripsi}</small>
                      </span>

                      <span className="materi-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="closing-note">
                <span>🌈</span>
                <div>
                  <strong>Terus semangat belajar!</strong>
                  <p>
                    Setiap hal baru yang kamu pelajari adalah kemajuan.
                  </p>
                </div>
              </section>
            </>
          )}

        {tahapHalaman === "materi" &&
          pelajaranAktif === "berhitung" && (
            <>
              <button
                className="toggle-list"
                onClick={kembaliKePilihanPelajaran}
              >
                <span>← Kembali ke Pilihan Pelajaran</span>
              </button>

              <section className="lesson">
                <div className="lesson-heading">
                  <div>
                    <span className="section-kicker">
                      WAKTUNYA BERHITUNG
                    </span>

                    <h2>{judulTopikBerhitung}</h2>

                    <p>{deskripsiTopikBerhitung}</p>
                  </div>

                  {topikBerhitung === "angka" && (
                    <div className="lesson-count">
                      <span>{indeksAngka + 1}</span>
                      <span className="count-divider">/</span>
                      <span>{dataAngka.length}</span>
                    </div>
                  )}
                </div>

                {topikBerhitung === "angka" && (
                  <div className="progress-track">
                    <div
                      className="progress-value"
                      style={{ width: `${persentaseAngka}%` }}
                    />
                  </div>
                )}

                {topikBerhitung === "angka" && angkaAktif && (
                  <div className="learning-card number-card">
                    <div className="learning-card-top">
                      <span className="learning-pill">
                        MARI MENGENAL ANGKA
                      </span>
                      <span className="learning-sparkle">✦</span>
                    </div>

                    <div className="number-display">
                      <span className="number-symbol">
                        {angkaAktif.angka}
                      </span>

                      <span className="number-name">
                        {angkaAktif.nama}
                      </span>
                    </div>

                    <div className="number-illustration">
                      {angkaAktif.angka === 0 ? (
                        <span className="zero-illustration">
                          🌱
                        </span>
                      ) : angkaAktif.angka <= 10 ? (
                        <span className="counting-objects">
                          {angkaAktif.ilustrasi}
                        </span>
                      ) : (
                        <span
                          className="counting-objects"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                            gap: "8px",
                            justifyItems: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "360px",
                            margin: "0 auto",
                          }}
                        >
                          {Array.from(
                            angkaAktif.ilustrasi,
                            (benda, index) => (
                              <span key={index}>{benda}</span>
                            )
                          )}
                        </span>
                      )}
                    </div>

                    <div className="number-description">
                      {angkaAktif.deskripsi}
                    </div>

                    <div className="learning-tip">
                      <span>💡</span>
                      Sebutkan angka dan hitung benda di atas bersama pengajar.
                    </div>
                  </div>
                )}

                {topikBerhitung === "angka" && (
                  <>
                    <div className="lesson-navigation">
                      <button
                        className="nav-button secondary"
                        onClick={angkaSebelumnya}
                      >
                        <span>←</span>
                        Sebelumnya
                      </button>

                      <button
                        className="nav-button primary"
                        onClick={angkaBerikutnya}
                      >
                        Berikutnya
                        <span>→</span>
                      </button>
                    </div>

                    <button
                      className="toggle-list"
                      onClick={() =>
                        setTampilkanDaftarAngka(!tampilkanDaftarAngka)
                      }
                      aria-expanded={tampilkanDaftarAngka}
                    >
                      <span>
                        {tampilkanDaftarAngka
                          ? "Tutup daftar angka"
                          : "Lihat semua angka"}
                      </span>

                      <span>
                        {tampilkanDaftarAngka ? "−" : "+"}
                      </span>
                    </button>

                    {tampilkanDaftarAngka && (
                      <div className="number-grid">
                        {dataAngka.map((item, index) => (
                          <button
                            key={item.angka}
                            className={`number-grid-item ${
                              indeksAngka === index ? "selected" : ""
                            }`}
                            onClick={() => pilihAngka(index)}
                            aria-pressed={indeksAngka === index}
                            aria-label={`Angka ${item.angka}, ${item.nama}`}
                          >
                            <strong>{item.angka}</strong>
                            <small>{item.nama}</small>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {topikBerhitung === "menghitung" && (
                  <MenghitungBenda />
                )}

                {topikBerhitung === "membandingkan" && (
                  <MembandingkanBilangan />
                )}

                {topikBerhitung === "penjumlahan" && (
                  <PenjumlahanBilangan />
                )}

                {topikBerhitung === "pengurangan" && (
                  <PenguranganBilangan />
                )}

                <div className="word-group-heading">
                  <h3>Pilih materi pembelajaran</h3>
                  <p>
                    Pilih materi berhitung yang ingin kamu pelajari.
                  </p>
                </div>

                <div className="word-group-selector">
                  {pilihanTopikBerhitung.map((topik) => (
                    <button
                      key={topik.id}
                      className={
                        topikBerhitung === topik.id ? "selected" : ""
                      }
                      onClick={() => pilihTopikBerhitung(topik.id)}
                      aria-pressed={topikBerhitung === topik.id}
                    >
                      <span>{topik.ikon}</span>
                      {topik.judul}
                    </button>
                  ))}
                </div>
              </section>

              <section className="closing-note">
                <span>🌈</span>
                <div>
                  <strong>Hebat! Terus berlatih, ya!</strong>
                  <p>{deskripsiPenutupBerhitung}</p>
                </div>
              </section>
            </>
          )}

        {tahapHalaman === "materi" &&
          pelajaranAktif === "menulis" && (
            <>
              <button
                className="toggle-list"
                onClick={kembaliKePilihanPelajaran}
              >
                <span>← Kembali ke Pilihan Pelajaran</span>
              </button>

              <section className="lesson">
                <div className="lesson-heading">
                  <div>
                    <span className="section-kicker">
                      WAKTUNYA MENULIS
                    </span>

                    <h2>{judulTopikMenulis}</h2>

                    <p>
                      Pilih latihan yang ingin kamu pelajari.
                    </p>
                  </div>
                </div>

                <div className="word-group-heading">
                  <h3>Pilih materi menulis</h3>
                  <p>
                    Mulai dari latihan garis, lalu belajar menebalkan,
                    menyalin huruf, menulis suku kata, dan menulis angka.
                  </p>
                </div>

                <div className="word-group-selector">
                  {pilihanTopikMenulis.map((topik) => (
                    <button
                      key={topik.id}
                      className={
                        topikMenulis === topik.id ? "selected" : ""
                      }
                      onClick={() => pilihTopikMenulis(topik.id)}
                      aria-pressed={topikMenulis === topik.id}
                    >
                      <span>{topik.ikon}</span>
                      {topik.judul}
                    </button>
                  ))}
                </div>

                <div className="writing-topic-description">
                  {pilihanTopikMenulis.find(
                    (topik) => topik.id === topikMenulis
                  )?.deskripsi}
                </div>

                {topikMenulis === "pra-menulis" && (
                  <LatihanPraMenulis />
                )}

                {topikMenulis === "menebalkan-huruf" && (
                  <MenebalkanHuruf />
                )}

                {topikMenulis === "menyalin-huruf" && (
                  <MenyalinHuruf />
                )}

                {topikMenulis === "menulis-suku-kata" && (
                  <MenulisSukuKata />
                )}

                {topikMenulis === "menulis-angka" && (
                  <MenulisAngka />
                )}
              </section>

              <section className="closing-note">
                <span>🌈</span>
                <div>
                  <strong>Hebat! Terus berlatih, ya!</strong>
                  <p>{deskripsiPenutupMenulis}</p>
                </div>
              </section>
            </>
          )}
      </main>

      <footer className="footer">
        <p>© Sagha Study Club</p>
        <span>Belajar membaca, tumbuh bersama. 💜</span>
      </footer>
    </div>
  );
}

export default App;
