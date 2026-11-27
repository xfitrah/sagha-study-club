
import { useState } from "react";

type SoalMenghitung = {
  jumlah: number;
  ikon: string;
  namaBenda: string;
};

const daftarSoal: SoalMenghitung[] = [
  { jumlah: 0, ikon: "🍎", namaBenda: "apel" },
  { jumlah: 1, ikon: "⭐", namaBenda: "bintang" },
  { jumlah: 2, ikon: "🐟", namaBenda: "ikan" },
  { jumlah: 3, ikon: "🍓", namaBenda: "stroberi" },
  { jumlah: 4, ikon: "⚽", namaBenda: "bola" },
  { jumlah: 5, ikon: "🌼", namaBenda: "bunga" },
  { jumlah: 6, ikon: "🦋", namaBenda: "kupu-kupu" },
  { jumlah: 7, ikon: "🍪", namaBenda: "kue" },
  { jumlah: 8, ikon: "🎈", namaBenda: "balon" },
  { jumlah: 9, ikon: "🐞", namaBenda: "kepik" },
  { jumlah: 10, ikon: "🍊", namaBenda: "jeruk" },
];

function acakPilihan(pilihan: number[]): number[] {
  const hasil = [...pilihan];

  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }

  return hasil;
}

function buatPilihan(jumlah: number): number[] {
  const pilihanSalah =
    jumlah === 0
      ? [1, 2]
      : jumlah === 10
        ? [8, 9]
        : [jumlah - 1, jumlah + 1];

  return acakPilihan([...pilihanSalah, jumlah]);
}

const daftarPilihan = daftarSoal.map((soal) =>
  buatPilihan(soal.jumlah)
);

function MenghitungBenda() {
  const [indeksSoal, setIndeksSoal] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState<number | null>(null);

  const soalAktif = daftarSoal[indeksSoal];
  const pilihanJawaban = daftarPilihan[indeksSoal];

  const sudahBenar = jawabanDipilih === soalAktif.jumlah;
  const jawabanSalah =
    jawabanDipilih !== null && !sudahBenar;

  const persentase =
    ((indeksSoal + 1) / daftarSoal.length) * 100;

  const pilihJawaban = (jawaban: number) => {
    if (sudahBenar) return;
    setJawabanDipilih(jawaban);
  };

  const soalSebelumnya = () => {
    setIndeksSoal((sebelumnya) => Math.max(0, sebelumnya - 1));
    setJawabanDipilih(null);
  };

  const soalBerikutnya = () => {
    if (!sudahBenar) return;

    if (indeksSoal === daftarSoal.length - 1) {
      setIndeksSoal(0);
    } else {
      setIndeksSoal((sebelumnya) => sebelumnya + 1);
    }

    setJawabanDipilih(null);
  };

  return (
    <div className="counting-lesson">

      {/* BAR PROGRES DI LUAR KARTU */}
      <div
        className="progress-track counting-progress"
        role="progressbar"
        aria-label="Kemajuan latihan menghitung"
        aria-valuemin={0}
        aria-valuemax={daftarSoal.length}
        aria-valuenow={indeksSoal + 1}
      >
        <div
          className="progress-value"
          style={{ width: `${persentase}%` }}
        />
      </div>

      {/* KARTU UTAMA */}
      <div className="learning-card number-card counting-main-card">

        <div className="learning-card-top">
          <span className="learning-pill">
            🍎 AYO MENGHITUNG
          </span>

          <div
            className="lesson-count"
            aria-label={`Soal ${indeksSoal + 1} dari ${daftarSoal.length}`}
          >
            <span>{indeksSoal + 1}</span>
            <span className="count-divider">/</span>
            <span>{daftarSoal.length}</span>
          </div>
        </div>

        <h3 className="number-description">
          Ada berapa {soalAktif.namaBenda}?
        </h3>

        <div
          className="number-illustration"
          aria-label={
            soalAktif.jumlah === 0
              ? "Tidak ada benda"
              : `${soalAktif.jumlah} ${soalAktif.namaBenda}`
          }
        >
          {soalAktif.jumlah === 0 ? (
            <span className="zero-illustration" aria-hidden="true">
              🧺
            </span>
          ) : (
            <span className="counting-objects" aria-hidden="true">
              {Array.from(
                { length: soalAktif.jumlah },
                () => soalAktif.ikon
              ).join(" ")}
            </span>
          )}
        </div>

        {soalAktif.jumlah === 0 && (
          <p className="number-description">
            Keranjang masih kosong.
          </p>
        )}

        <div className="word-group-heading">
          <div>
            <h3>Pilih jawabanmu</h3>
            <p>Ketuk angka yang sesuai dengan jumlah benda.</p>
          </div>
        </div>

        <div
          className="counting-answer-grid"
          role="group"
          aria-label="Pilihan jawaban"
        >
          {pilihanJawaban.map((pilihan) => {
            const dipilih = jawabanDipilih === pilihan;
            const pilihanBenar = dipilih && sudahBenar;
            const pilihanSalah = dipilih && jawabanSalah;

            return (
              <button
                key={pilihan}
                type="button"
                className={[
                  "counting-answer-button",
                  pilihanBenar ? "answer-correct" : "",
                  pilihanSalah ? "answer-wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => pilihJawaban(pilihan)}
                disabled={sudahBenar}
                aria-pressed={dipilih}
                aria-label={`Jawab ${pilihan}`}
              >
                <strong>{pilihan}</strong>

                {pilihanBenar && (
                  <span className="answer-icon" aria-hidden="true">
                    ✓
                  </span>
                )}

                {pilihanSalah && (
                  <span className="answer-icon" aria-hidden="true">
                    ✕
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {sudahBenar && (
          <div
            className="answer-feedback feedback-correct"
            role="status"
            aria-live="polite"
          >
            <span className="feedback-icon" aria-hidden="true">
              🎉
            </span>

            <div>
              <strong>Hebat! Jawabanmu benar!</strong>
              <p>
                Ada {soalAktif.jumlah} {soalAktif.namaBenda}.
                Kamu berhasil menghitungnya!
              </p>
            </div>
          </div>
        )}

        {jawabanSalah && (
          <div
            className="answer-feedback feedback-wrong"
            role="alert"
            aria-live="assertive"
          >
            <span className="feedback-icon" aria-hidden="true">
              💪
            </span>

            <div>
              <strong>Belum tepat. Ayo coba lagi!</strong>
              <p>
                Tidak apa-apa. Hitung bendanya satu per satu,
                lalu pilih angka yang menurutmu benar.
              </p>
            </div>
          </div>
        )}

        {jawabanDipilih === null && (
          <div className="answer-feedback feedback-hint">
            <span className="feedback-icon" aria-hidden="true">
              💡
            </span>

            <div>
              <strong>Hitung dengan teliti, ya!</strong>
              <p>
                Sentuh atau tunjuk setiap benda sambil menghitung.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGASI */}
      <div className="lesson-navigation">
        <button
          type="button"
          className="nav-button secondary"
          onClick={soalSebelumnya}
          disabled={indeksSoal === 0}
        >
          <span>←</span>
          Sebelumnya
        </button>

        <button
          type="button"
          className="nav-button primary"
          onClick={soalBerikutnya}
          disabled={!sudahBenar}
        >
          {indeksSoal === daftarSoal.length - 1
            ? "Ulangi dari awal"
            : "Berikutnya"}
          <span>→</span>
        </button>
      </div>

      <p className="counting-navigation-note">
        {sudahBenar
          ? "Bagus! Sekarang lanjut ke soal berikutnya."
          : "Jawab dengan benar untuk melanjutkan."}
      </p>
    </div>
  );
}

export default MenghitungBenda;
