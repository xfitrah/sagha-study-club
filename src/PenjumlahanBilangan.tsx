
import { useState } from "react";

type SoalPenjumlahan = {
  kiri: number;
  kanan: number;
  benda: string;
};

const soalDasar: SoalPenjumlahan[] = [
  { kiri: 1, kanan: 1, benda: "🍎" },
  { kiri: 2, kanan: 1, benda: "⭐" },
  { kiri: 2, kanan: 3, benda: "🐠" },
  { kiri: 4, kanan: 1, benda: "🍊" },
  { kiri: 3, kanan: 3, benda: "🌼" },
  { kiri: 5, kanan: 2, benda: "🧸" },
  { kiri: 4, kanan: 4, benda: "🍓" },
  { kiri: 6, kanan: 3, benda: "🦋" },
  { kiri: 0, kanan: 5, benda: "🚗" },
  { kiri: 5, kanan: 5, benda: "⚽" },
];

const acak = <T,>(daftar: T[]): T[] => {
  const hasil = [...daftar];

  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }

  return hasil;
};

const buatPilihan = (jawaban: number): number[] => {
  const kandidat = new Set<number>([jawaban]);

  while (kandidat.size < 3) {
    const selisih = Math.floor(Math.random() * 5) + 1;
    const angka =
      Math.random() < 0.5
        ? jawaban - selisih
        : jawaban + selisih;

    if (angka >= 0 && angka <= 10 && angka !== jawaban) {
      kandidat.add(angka);
    }
  }

  return acak([...kandidat]);
};

const buatLatihan = () =>
  acak(soalDasar).map((soal) => ({
    ...soal,
    pilihan: buatPilihan(soal.kiri + soal.kanan),
  }));

type SoalLatihan = SoalPenjumlahan & {
  pilihan: number[];
};

function PenjumlahanBilangan() {
  const [daftarSoal, setDaftarSoal] =
    useState<SoalLatihan[]>(buatLatihan);

  const [indeksAktif, setIndeksAktif] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] =
    useState<number | null>(null);
  const [jumlahBenar, setJumlahBenar] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const soal = daftarSoal[indeksAktif];
  const jawabanBenar = soal.kiri + soal.kanan;

  const persentase =
    ((indeksAktif + (jawabanDipilih !== null ? 1 : 0)) /
      daftarSoal.length) *
    100;

  const pilihJawaban = (jawaban: number) => {
    if (jawabanDipilih !== null) return;

    setJawabanDipilih(jawaban);

    if (jawaban === jawabanBenar) {
      setJumlahBenar((jumlah) => jumlah + 1);
    }
  };

  const lanjutSoal = () => {
    if (indeksAktif === daftarSoal.length - 1) {
      setSelesai(true);
      return;
    }

    setIndeksAktif((indeks) => indeks + 1);
    setJawabanDipilih(null);
  };

  const ulangiBelajar = () => {
    setDaftarSoal(buatLatihan());
    setIndeksAktif(0);
    setJawabanDipilih(null);
    setJumlahBenar(0);
    setSelesai(false);
  };

  if (selesai) {
    return (
      <div className="addition-lesson">
        <div className="addition-result learning-card">
          <span className="addition-result-icon">
            {jumlahBenar >= 8 ? "🏆" : "🌟"}
          </span>

          <span className="learning-pill">
            LATIHAN SELESAI
          </span>

          <h3>
            {jumlahBenar >= 8
              ? "Hebat sekali!"
              : "Bagus! Terus berlatih, ya!"}
          </h3>

          <p>
            Kamu sudah menyelesaikan semua soal penjumlahan.
          </p>

          <div className="addition-score">
            <strong>
              {jumlahBenar} / {daftarSoal.length}
            </strong>
            <span>Jawaban benar</span>
          </div>

          <button
            className="nav-button primary"
            onClick={ulangiBelajar}
          >
            <span>↻</span>
            Ulangi Latihan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="addition-lesson">
      <div
        className="progress-track addition-progress"
        role="progressbar"
        aria-label="Progres latihan penjumlahan"
        aria-valuenow={
          indeksAktif + (jawabanDipilih !== null ? 1 : 0)
        }
        aria-valuemin={0}
        aria-valuemax={daftarSoal.length}
      >
        <div
          className="progress-value"
          style={{ width: `${persentase}%` }}
        />
      </div>

      <div className="learning-card addition-main-card">
        <div className="learning-card-top">
          <span className="learning-pill">
            ➕ AYO MENJUMLAHKAN
          </span>

          <span className="addition-count">
            {indeksAktif + 1}/{daftarSoal.length}
          </span>
        </div>

        <h3 className="addition-question">
          Berapa jumlah semuanya?
        </h3>

        <p className="addition-instruction">
          Hitung benda di kedua kelompok, lalu pilih jawabannya.
        </p>

        <div className="addition-groups">
          <div className="addition-group">
            <span className="addition-group-label">
              KELOMPOK PERTAMA
            </span>

            <div
              className="addition-objects"
              role="img"
              aria-label={`${soal.kiri} benda ${soal.benda}`}
            >
              {soal.kiri === 0 ? (
                <span className="addition-empty">Kosong</span>
              ) : (
                Array.from(
                  { length: soal.kiri },
                  (_, index) => (
                    <span key={index} aria-hidden="true">
                      {soal.benda}
                    </span>
                  )
                )
              )}
            </div>

            <strong className="addition-number">
              {soal.kiri}
            </strong>
          </div>

          <div className="addition-symbol" aria-label="ditambah">
            +
          </div>

          <div className="addition-group">
            <span className="addition-group-label">
              KELOMPOK KEDUA
            </span>

            <div
              className="addition-objects"
              role="img"
              aria-label={`${soal.kanan} benda ${soal.benda}`}
            >
              {Array.from(
                { length: soal.kanan },
                (_, index) => (
                  <span key={index} aria-hidden="true">
                    {soal.benda}
                  </span>
                )
              )}
            </div>

            <strong className="addition-number">
              {soal.kanan}
            </strong>
          </div>
        </div>

        <div className="addition-equation" aria-label="Soal penjumlahan">
          <strong>{soal.kiri}</strong>
          <span>+</span>
          <strong>{soal.kanan}</strong>
          <span>=</span>
          <strong>?</strong>
        </div>

        <div className="addition-answer-heading">
          Pilih jawaban yang tepat!
        </div>

        <div className="addition-options">
          {soal.pilihan.map((pilihan) => {
            const dipilih = jawabanDipilih === pilihan;
            const benar = pilihan === jawabanBenar;

            let kelas = "";

            if (jawabanDipilih !== null && benar) {
              kelas = "correct";
            } else if (dipilih && !benar) {
              kelas = "incorrect";
            }

            return (
              <button
                key={pilihan}
                className={`addition-option ${kelas}`}
                onClick={() => pilihJawaban(pilihan)}
                disabled={jawabanDipilih !== null}
                aria-pressed={dipilih}
              >
                {pilihan}
              </button>
            );
          })}
        </div>

        {jawabanDipilih !== null && (
          <div
            className={`addition-feedback ${
              jawabanDipilih === jawabanBenar
                ? "success"
                : "error"
            }`}
            role="status"
            aria-live="polite"
          >
            <strong>
              {jawabanDipilih === jawabanBenar
                ? "🎉 Jawabanmu benar!"
                : "💪 Belum tepat, yuk coba lagi!"}
            </strong>

            <p>
              {soal.kiri} + {soal.kanan} = {jawabanBenar}.
              {" "}
              Jadi, jumlah semuanya adalah {jawabanBenar}.
            </p>

            <button
              className="nav-button primary"
              onClick={lanjutSoal}
            >
              {indeksAktif === daftarSoal.length - 1
                ? "Lihat Hasil"
                : "Soal Berikutnya"}
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PenjumlahanBilangan;
