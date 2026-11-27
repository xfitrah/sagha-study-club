
import { useState } from "react";

type JenisPerbandingan =
  | "lebih-banyak"
  | "lebih-sedikit"
  | "sama-banyak";

type SoalPerbandingan = {
  kiri: number;
  kanan: number;
  benda: string;
};

const daftarSoal: SoalPerbandingan[] = [
  { kiri: 2, kanan: 1, benda: "🍎" },
  { kiri: 3, kanan: 5, benda: "⭐" },
  { kiri: 4, kanan: 4, benda: "🐠" },
  { kiri: 6, kanan: 2, benda: "🍊" },
  { kiri: 1, kanan: 7, benda: "🌼" },
  { kiri: 5, kanan: 5, benda: "🧸" },
  { kiri: 8, kanan: 3, benda: "🍓" },
  { kiri: 2, kanan: 6, benda: "🦋" },
  { kiri: 9, kanan: 9, benda: "⚽" },
  { kiri: 10, kanan: 4, benda: "🍇" },
  { kiri: 0, kanan: 3, benda: "🚗" },
];

const pilihanJawaban: {
  id: JenisPerbandingan;
  label: string;
  simbol: string;
}[] = [
  {
    id: "lebih-banyak",
    label: "Lebih banyak",
    simbol: ">",
  },
  {
    id: "lebih-sedikit",
    label: "Lebih sedikit",
    simbol: "<",
  },
  {
    id: "sama-banyak",
    label: "Sama banyak",
    simbol: "=",
  },
];

function tentukanJawaban(
  kiri: number,
  kanan: number
): JenisPerbandingan {
  if (kiri > kanan) return "lebih-banyak";
  if (kiri < kanan) return "lebih-sedikit";
  return "sama-banyak";
}

function MembandingkanBilangan() {
  const [indeksAktif, setIndeksAktif] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] =
    useState<JenisPerbandingan | null>(null);
  const [jumlahBenar, setJumlahBenar] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const soal = daftarSoal[indeksAktif];
  const jawabanBenar = tentukanJawaban(
    soal.kiri,
    soal.kanan
  );

  const pilihanBenar = pilihanJawaban.find(
    (pilihan) => pilihan.id === jawabanBenar
  );

  const persentase =
    ((indeksAktif + (jawabanDipilih ? 1 : 0)) /
      daftarSoal.length) *
    100;

  const pilihJawaban = (jawaban: JenisPerbandingan) => {
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
    setIndeksAktif(0);
    setJawabanDipilih(null);
    setJumlahBenar(0);
    setSelesai(false);
  };

  if (selesai) {
    return (
      <div className="comparison-lesson">
        <div className="comparison-result learning-card">
          <span className="comparison-result-icon">
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
            Kamu sudah menyelesaikan semua soal
            membandingkan bilangan.
          </p>

          <div className="comparison-score">
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
    <div className="comparison-lesson">
      <div
        className="progress-track comparison-progress"
        role="progressbar"
        aria-label="Progres membandingkan bilangan"
        aria-valuenow={indeksAktif + (jawabanDipilih ? 1 : 0)}
        aria-valuemin={0}
        aria-valuemax={daftarSoal.length}
      >
        <div
          className="progress-value"
          style={{ width: `${persentase}%` }}
        />
      </div>

      <div className="learning-card comparison-main-card">
        <div className="learning-card-top">
          <span className="learning-pill">
            🔢 AYO MEMBANDINGKAN
          </span>

          <span className="comparison-count">
            {indeksAktif + 1}/{daftarSoal.length}
          </span>
        </div>

        <h3 className="comparison-question">
          Mana yang jumlahnya lebih banyak,
          lebih sedikit, atau sama banyak?
        </h3>

        <p className="comparison-instruction">
          Hitung benda di sebelah kiri dan kanan,
          lalu pilih jawabanmu.
        </p>

        <div className="comparison-groups">
          <div className="comparison-group">
            <span className="comparison-group-label">
              KIRI
            </span>

            <div
              className="comparison-objects"
              aria-label={`${soal.kiri} benda`}
            >
              {soal.kiri === 0 ? (
                <span className="comparison-empty">
                  Kosong
                </span>
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

            <strong className="comparison-number">
              {soal.kiri}
            </strong>
          </div>

          <div className="comparison-versus" aria-hidden="true">
            VS
          </div>

          <div className="comparison-group">
            <span className="comparison-group-label">
              KANAN
            </span>

            <div
              className="comparison-objects"
              aria-label={`${soal.kanan} benda`}
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

            <strong className="comparison-number">
              {soal.kanan}
            </strong>
          </div>
        </div>

        <div className="comparison-answer-heading">
          Pilih jawaban yang tepat!
        </div>

        <div className="comparison-options">
          {pilihanJawaban.map((pilihan) => {
            const dipilih =
              jawabanDipilih === pilihan.id;
            const benar =
              jawabanBenar === pilihan.id;

            let kelas = "";

            if (jawabanDipilih !== null && benar) {
              kelas = "correct";
            } else if (dipilih && !benar) {
              kelas = "incorrect";
            }

            return (
              <button
                key={pilihan.id}
                className={`comparison-option ${kelas}`}
                onClick={() => pilihJawaban(pilihan.id)}
                disabled={jawabanDipilih !== null}
                aria-pressed={dipilih}
              >
                <strong>{pilihan.simbol}</strong>
                <span>{pilihan.label}</span>
              </button>
            );
          })}
        </div>

        {jawabanDipilih !== null && (
          <div
            className={`comparison-feedback ${
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
                : "💪 Belum tepat, yuk belajar lagi!"}
            </strong>

            <p>
              {soal.kiri} {pilihanBenar?.simbol} {soal.kanan}
              {" · "}
              {soal.kiri > soal.kanan
                ? "Jumlah di kiri lebih banyak."
                : soal.kiri < soal.kanan
                  ? "Jumlah di kiri lebih sedikit."
                  : "Jumlah di kiri dan kanan sama banyak."}
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

export default MembandingkanBilangan;
