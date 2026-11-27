
import { useState } from "react";

type SoalPengurangan = {
  angkaAwal: number;
  dikurangi: number;
  ilustrasi: string;
};

const daftarSoal: SoalPengurangan[] = [
  { angkaAwal: 2, dikurangi: 1, ilustrasi: "🍎" },
  { angkaAwal: 3, dikurangi: 1, ilustrasi: "🍊" },
  { angkaAwal: 4, dikurangi: 2, ilustrasi: "⭐" },
  { angkaAwal: 5, dikurangi: 1, ilustrasi: "🐟" },
  { angkaAwal: 5, dikurangi: 2, ilustrasi: "🍓" },
  { angkaAwal: 6, dikurangi: 3, ilustrasi: "🌼" },
  { angkaAwal: 7, dikurangi: 2, ilustrasi: "🧸" },
  { angkaAwal: 8, dikurangi: 4, ilustrasi: "🚗" },
  { angkaAwal: 9, dikurangi: 3, ilustrasi: "🦋" },
  { angkaAwal: 10, dikurangi: 5, ilustrasi: "🍬" },
];

function acak<T>(daftar: T[]): T[] {
  const hasil = [...daftar];

  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }

  return hasil;
}

function buatPilihan(jawaban: number): number[] {
  const pilihan = new Set<number>([jawaban]);

  while (pilihan.size < 4) {
    const variasi = Math.max(
      0,
      Math.min(10, jawaban + Math.floor(Math.random() * 7) - 3)
    );

    pilihan.add(variasi);
  }

  return acak([...pilihan]);
}

function buatLatihan() {
  return acak(daftarSoal).map((soal) => ({
    ...soal,
    pilihan: buatPilihan(soal.angkaAwal - soal.dikurangi),
  }));
}

export default function PenguranganBilangan() {
  const [latihan, setLatihan] = useState(buatLatihan);
  const [nomorSoal, setNomorSoal] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState<number | null>(null);
  const [jumlahBenar, setJumlahBenar] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const soal = latihan[nomorSoal];
  const jawabanBenar = soal.angkaAwal - soal.dikurangi;
  const sudahMenjawab = jawabanDipilih !== null;
  const persentase =
    ((nomorSoal + (selesai ? 1 : 0)) / latihan.length) * 100;

  function pilihJawaban(jawaban: number) {
    if (sudahMenjawab) return;

    setJawabanDipilih(jawaban);

    if (jawaban === jawabanBenar) {
      setJumlahBenar((nilai) => nilai + 1);
    }
  }

  function lanjutSoal() {
    if (nomorSoal === latihan.length - 1) {
      setSelesai(true);
      return;
    }

    setNomorSoal((nomor) => nomor + 1);
    setJawabanDipilih(null);
  }

  function ulangiLatihan() {
    setLatihan(buatLatihan());
    setNomorSoal(0);
    setJawabanDipilih(null);
    setJumlahBenar(0);
    setSelesai(false);
  }

  if (selesai) {
    const nilai = Math.round((jumlahBenar / latihan.length) * 100);

    return (
      <div className="addition-lesson">
        <div className="learning-card number-card addition-result-card">
          <div className="addition-result-icon">
            {nilai >= 80 ? "🏆" : nilai >= 60 ? "🌟" : "💪"}
          </div>

          <span className="learning-pill">LATIHAN SELESAI</span>

          <h3>
            {nilai >= 80
              ? "Hebat sekali!"
              : nilai >= 60
                ? "Bagus! Terus berlatih!"
                : "Tetap semangat belajar!"}
          </h3>

          <div className="addition-score">{nilai}</div>

          <p>
            Kamu menjawab benar {jumlahBenar} dari {latihan.length} soal.
          </p>

          <button
            className="nav-button primary"
            onClick={ulangiLatihan}
          >
            Ulangi Latihan
            <span>↻</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="addition-lesson">
      <div
        className="progress-track counting-progress"
        role="progressbar"
        aria-label="Progres latihan pengurangan"
        aria-valuenow={nomorSoal + 1}
        aria-valuemin={1}
        aria-valuemax={latihan.length}
      >
        <div
          className="progress-value"
          style={{ width: `${persentase}%` }}
        />
      </div>

      <div className="learning-card number-card addition-main-card">
        <div className="learning-card-top">
          <span className="learning-pill">
            ➖ AYO MENGURANGI
          </span>

          <div className="lesson-count">
            {nomorSoal + 1}/{latihan.length}
          </div>
        </div>

        <h3 className="addition-question">
          Berapa hasil pengurangan ini?
        </h3>

        <div className="addition-equation">
          <span>{soal.angkaAwal}</span>
          <span className="addition-operator">−</span>
          <span>{soal.dikurangi}</span>
          <span className="addition-operator">=</span>
          <span className="addition-question-mark">?</span>
        </div>

        <div
          className="subtraction-visual"
          aria-label={`Ada ${soal.angkaAwal} benda, kemudian ${soal.dikurangi} benda diambil`}
        >
          {Array.from({ length: soal.angkaAwal }, (_, index) => {
            const diambil =
              index >= soal.angkaAwal - soal.dikurangi;

            return (
              <span
                key={index}
                className={
                  diambil
                    ? "subtraction-object removed"
                    : "subtraction-object"
                }
                aria-hidden="true"
              >
                {soal.ilustrasi}
              </span>
            );
          })}
        </div>

        <p className="addition-instruction">
          Ada {soal.angkaAwal} benda. Diambil {soal.dikurangi} benda.
          Berapa yang tersisa?
        </p>

        <div className="addition-options">
          {soal.pilihan.map((pilihan) => {
            const benar = pilihan === jawabanBenar;
            const dipilih = pilihan === jawabanDipilih;

            let kelas = "addition-option";

            if (sudahMenjawab && benar) {
              kelas += " correct";
            } else if (dipilih && !benar) {
              kelas += " incorrect";
            }

            return (
              <button
                key={pilihan}
                className={kelas}
                onClick={() => pilihJawaban(pilihan)}
                disabled={sudahMenjawab}
                aria-pressed={dipilih}
              >
                {pilihan}
              </button>
            );
          })}
        </div>

        {sudahMenjawab && (
          <div
            className={`addition-feedback ${
              jawabanDipilih === jawabanBenar
                ? "correct"
                : "incorrect"
            }`}
            role="status"
            aria-live="polite"
          >
            {jawabanDipilih === jawabanBenar ? (
              <>
                <strong>🎉 Pintar! Jawabanmu benar.</strong>
                <span>
                  {soal.angkaAwal} dikurangi {soal.dikurangi} sama dengan{" "}
                  {jawabanBenar}.
                </span>
              </>
            ) : (
              <>
                <strong>🌱 Yuk, coba pahami lagi!</strong>
                <span>
                  Jawaban yang benar adalah {jawabanBenar}.
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <div
        className="lesson-navigation"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          boxSizing: "border-box",
          margin: "16px auto 0",
          padding: 0,
        }}
      >
        <button
          className="nav-button primary"
          onClick={lanjutSoal}
          disabled={!sudahMenjawab}
        >
          {nomorSoal === latihan.length - 1
            ? "Lihat Hasil"
            : "Soal Berikutnya"}
          <span>→</span>
        </button>
      </div>

      <p className="counting-navigation-note">
        Jawab soal ini untuk melanjutkan ke soal berikutnya.
      </p>
    </div>
  );
}
