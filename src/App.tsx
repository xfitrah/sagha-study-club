
import "./data/materi/validasi-kata";
import { useState } from "react";

import {
  daftarMateri,
  dataHuruf,
  dataKata,
  dataSukuKata,
  type MateriId,
} from "./data/materi";

import { dataKataSederhana, tingkatKataSederhana } from "./data/materi/kata-sederhana";
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

function App() {
  const [materiAktif, setMateriAktif] =
    useState<MateriId>("kata");

  const [kelompokKata, setKelompokKata] =
    useState<KelompokKata>("sederhana");

  const [hurufFilter, setHurufFilter] =
    useState("semua");

  const [tingkatFilter, setTingkatFilter] =
    useState<FilterTingkat>("semua");

  const [indeksAktif, setIndeksAktif] =
    useState(0);

  const [tampilkanDaftar, setTampilkanDaftar] =
    useState(false);

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
    kelompokKata !== "sederhana" ||
    tingkatFilter === "semua"
      ? kataUntukMateri
      : kataUntukMateri.filter(
          (item) =>
            String(tingkatKataSederhana[item.kata]) ===
            tingkatFilter
        );

  const daftarHurufTersedia = Array.from(
    new Set(
      kataDenganTingkat.map((item) => item.huruf)
    )
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

  const pilihMateri = (id: MateriId) => {
    setMateriAktif(id);
    setIndeksAktif(0);
    setTampilkanDaftar(false);
  };

  const pilihKelompokKata = (
    kelompok: KelompokKata
  ) => {
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
    setIndeksAktif((sebelumnya) => {
      return jumlahMateri > 0
        ? (sebelumnya + 1) % jumlahMateri
        : 0;
    });
  };

  const materiSebelumnya = () => {
    setIndeksAktif((sebelumnya) => {
      return jumlahMateri > 0
        ? (sebelumnya - 1 + jumlahMateri) % jumlahMateri
        : 0;
    });
  };

  const daftarPilihan =
    materiAktif === "huruf"
      ? dataHuruf
      : materiAktif === "suku-kata"
        ? dataSukuKata
        : kataTerfilter.map((item) => item.kata);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="brand">
          <img
            src="/sagha-logo.svg"
            alt="Logo Sagha Study Club"
            className="brand-logo"
          />

          <div className="brand-text">
            <h1>Sagha Study Club</h1>
            <p>Belajar membaca, tumbuh bersama.</p>
          </div>
        </div>

        <div className="grade-badge">
          Kelas 1 SD
        </div>
      </header>

      <main className="main">
        {/* SAMBUTAN */}
        <section className="welcome">
          <p className="eyebrow">
            SELAMAT BELAJAR
          </p>

          <h2>Yuk, belajar membaca!</h2>

          <p>
            Pilih materi dan mulai belajar hari ini.
          </p>
        </section>

        {/* KATALOG MATERI */}
        <section className="catalog">
          <div className="section-heading">
            <div>
              <h2>Daftar Materi</h2>
              <p>
                Pilih pelajaran yang ingin dipelajari.
              </p>
            </div>
          </div>

          <div className="materi-list">
            {daftarMateri.map((materi) => (
              <button
                key={materi.id}
                className={`materi-item ${
                  materiAktif === materi.id
                    ? "active"
                    : ""
                }`}
                onClick={() => pilihMateri(materi.id)}
              >
                <span className="materi-number">
                  {String(materi.urutan).padStart(2, "0")}
                </span>

                <span className="materi-info">
                  <strong>{materi.judul}</strong>
                  <small>{materi.deskripsi}</small>
                </span>

                <span className="materi-arrow">
                  ›
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* AREA MATERI */}
        <section className="lesson">
          <div className="lesson-heading">
            <div>
              <p className="eyebrow">
                MATERI PILIHAN
              </p>

              <h2>
                {
                  daftarMateri.find(
                    (materi) =>
                      materi.id === materiAktif
                  )?.judul
                }
              </h2>
            </div>

            <span className="lesson-count">
              {jumlahMateri > 0
                ? `${indeksAktif + 1} / ${jumlahMateri}`
                : "0 / 0"}
            </span>
          </div>

          {/* PILIH KELOMPOK KATA */}
          {materiAktif === "kata" && (
            <>
              <div className="word-group-selector">
                <button
                  className={
                    kelompokKata === "sederhana"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    pilihKelompokKata("sederhana")
                  }
                >
                  Kata Sederhana
                </button>

                <button
                  className={
                    kelompokKata === "awal"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    pilihKelompokKata("awal")
                  }
                >
                  Kata A-Z
                </button>

                <button
                  className={
                    kelompokKata === "tambahan"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    pilihKelompokKata("tambahan")
                  }
                >
                  Kata Tambahan
                </button>

                <button
                  className={
                    kelompokKata === "lanjutan"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    pilihKelompokKata("lanjutan")
                  }
                >
                  Kata Lanjutan
                </button>

                <button
                  className={
                    kelompokKata === "pengayaan"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    pilihKelompokKata("pengayaan")
                  }
                >
                  Kata Pengayaan
                </button>
              </div>

              {/* FILTER TINGKAT */}
              {kelompokKata === "sederhana" && (
                <div className="word-filter">
                  <label htmlFor="word-level-filter">
                    Tingkat kesulitan:
                  </label>

                  <select
                    id="word-level-filter"
                    className="word-filter-select"
                    value={tingkatFilter}
                    onChange={(event) =>
                      pilihTingkat(
                        event.target.value as FilterTingkat
                      )
                    }
                  >
                    <option value="semua">
                      Semua tingkat
                    </option>
                    <option value="1">
                      Tingkat 1 - Paling Mudah
                    </option>
                    <option value="2">
                      Tingkat 2 - Mudah
                    </option>
                    <option value="3">
                      Tingkat 3 - Menengah
                    </option>
                    <option value="4">
                      Tingkat 4 - Pengayaan
                    </option>
                  </select>
                </div>
              )}

              {/* FILTER HURUF */}
              <div className="word-filter">
                <label htmlFor="word-letter-filter">
                  Tampilkan kata berdasarkan huruf:
                </label>

                <select
                  id="word-letter-filter"
                  className="word-filter-select"
                  value={hurufFilter}
                  onChange={(event) =>
                    pilihHuruf(event.target.value)
                  }
                >
                  <option value="semua">
                    Semua huruf
                  </option>

                  {daftarHurufTersedia.map((huruf) => (
                    <option key={huruf} value={huruf}>
                      Huruf {huruf}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* MATERI HURUF */}
          {materiAktif === "huruf" && (
            <div className="learning-card">
              <div className="letter-display">
                <span className="uppercase-letter">
                  {dataHuruf[indeksAktif]}
                </span>

                <span className="lowercase-letter">
                  {dataHuruf[indeksAktif].toLowerCase()}
                </span>
              </div>

              <p className="instruction">
                Perhatikan bentuk huruf besar dan huruf kecilnya.
              </p>
            </div>
          )}

          {/* MATERI SUKU KATA */}
          {materiAktif === "suku-kata" && (
            <div className="learning-card">
              <div className="syllable-display">
                {dataSukuKata[indeksAktif]}
              </div>

              <p className="instruction">
                Bacalah suku kata ini bersama pengajar.
              </p>
            </div>
          )}

          {/* MATERI KATA */}
          {materiAktif === "kata" && kataAktif && (
            <div className="learning-card">
              <div className="word-illustration">
                {kataAktif.emoji}
              </div>

              <div className="word-letter">
                Huruf {kataAktif.huruf}
              </div>

              <h3 className="word-title">
                {kataAktif.kata}
              </h3>

              <div className="syllable-break">
                {kataAktif.sukuKata
                  .split("-")
                  .map((bagian, index) => (
                    <span key={`${bagian}-${index}`}>
                      {bagian}
                    </span>
                  ))}
              </div>

              <p className="instruction">
                Bacalah kata ini, lalu perhatikan suku katanya.
              </p>
            </div>
          )}

          {/* JIKA TIDAK ADA KATA */}
          {materiAktif === "kata" && !kataAktif && (
            <div className="learning-card">
              <p className="instruction">
                Belum ada kosakata untuk pilihan ini.
              </p>
            </div>
          )}

          {/* NAVIGASI */}
          <div className="lesson-navigation">
            <button
              className="nav-button secondary"
              onClick={materiSebelumnya}
              disabled={jumlahMateri === 0}
            >
              ‹ Sebelumnya
            </button>

            <button
              className="nav-button primary"
              onClick={materiBerikutnya}
              disabled={jumlahMateri === 0}
            >
              Berikutnya ›
            </button>
          </div>

          {/* DAFTAR PILIHAN */}
          <button
            className="toggle-list"
            onClick={() =>
              setTampilkanDaftar(!tampilkanDaftar)
            }
          >
            {tampilkanDaftar
              ? "Tutup daftar materi"
              : "Lihat semua materi"}
          </button>

          {tampilkanDaftar && (
            <div className="letter-grid">
              {daftarPilihan.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  className={`grid-item ${
                    indeksAktif === index
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setIndeksAktif(index)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© Sagha Study Club</p>
        <span>
          Belajar membaca, tumbuh bersama.
        </span>
      </footer>
    </div>
  );
}

export default App;
