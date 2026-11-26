
import "./data/materi/validasi-kata";
import { useState } from "react";

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

import "./App.css";

type KelompokKata =
  | "sederhana"
  | "awal"
  | "tambahan"
  | "lanjutan"
  | "pengayaan";

type FilterTingkat = "semua" | "1" | "2" | "3" | "4";

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

function App() {
  const [materiAktif, setMateriAktif] =
    useState<MateriId>("kata");

  const [kelompokKata, setKelompokKata] =
    useState<KelompokKata>("sederhana");

  const [hurufFilter, setHurufFilter] = useState("semua");

  const [tingkatFilter, setTingkatFilter] =
    useState<FilterTingkat>("semua");

  const [indeksAktif, setIndeksAktif] = useState(0);

  const [tampilkanDaftar, setTampilkanDaftar] = useState(false);

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

  const materiTerpilih = daftarMateri.find(
    (materi) => materi.id === materiAktif
  );

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

  return (
    <div className="app">
      <header className="header">
        <a href="/" className="brand" aria-label="Sagha Study Club, beranda">
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

      <main className="main">
        <section className="welcome">
          <div className="welcome-content">
            <span className="welcome-label">HALO, TEMAN BELAJAR! 👋</span>

            <h2>
              Yuk, belajar
              <br />
              membaca hari ini!
            </h2>

            <p>
              Sedikit demi sedikit, kita jadi semakin pintar membaca.
            </p>
          </div>

          <div className="welcome-decoration" aria-hidden="true">
            <span className="decoration-star star-one">✦</span>
            <span className="decoration-star star-two">✦</span>
            <span className="decoration-circle">📖</span>
            <span className="decoration-small">✏️</span>
          </div>
        </section>

        <section className="catalog">
          <div className="section-heading">
            <div>
              <span className="section-kicker">MULAI DARI SINI</span>
              <h2>Pilih pelajaranmu</h2>
              <p>Ada banyak hal seru yang bisa kita pelajari!</p>
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

        <section className="lesson">
          <div className="lesson-heading">
            <div>
              <span className="section-kicker">WAKTUNYA BELAJAR</span>
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
                  <p>
                    {deskripsiKelompok[kelompokKata]}
                  </p>
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
                      <option value="1">Tingkat 1 · Paling mudah</option>
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
                <span className="learning-pill">MENGENAL HURUF</span>
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
                <span className="learning-pill">MENGENAL SUKU KATA</span>
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
                <span className="learning-pill">AYO MEMBACA KATA</span>
                <span className="learning-sparkle">✦</span>
              </div>

              <div className="word-illustration" aria-hidden="true">
                {kataAktif.emoji}
              </div>

              <div className="word-letter">
                KATA DENGAN HURUF {kataAktif.huruf}
              </div>

              <h3 className="word-title">{kataAktif.kata}</h3>

              <div className="syllable-break" aria-label={`Suku kata: ${kataAktif.sukuKata.split("-").join(", ")}`}>
                {kataAktif.sukuKata.split("-").map((bagian, index) => (
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
              <p>Coba pilih tingkat atau huruf yang lain, ya.</p>
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

        <section className="closing-note">
          <span>🌈</span>
          <div>
            <strong>Terus semangat belajar!</strong>
            <p>Setiap kata yang kamu baca adalah kemajuan baru.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© Sagha Study Club</p>
        <span>Belajar membaca, tumbuh bersama. 💜</span>
      </footer>
    </div>
  );
}

export default App;
