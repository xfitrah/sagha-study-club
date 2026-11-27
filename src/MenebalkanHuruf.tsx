
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

type Titik = {
  x: number;
  y: number;
};

const daftarHuruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const jalurHuruf: Record<string, string> = {
  // Huruf kapital
  A: "M 10 130 L 50 10 L 90 130 M 25 85 L 75 85",

  B: "M 20 10 L 20 130 M 20 10 C 85 10 95 65 20 65 M 20 65 C 100 65 100 130 20 130",

  C: "M 90 25 Q 70 10 50 10 Q 10 10 10 70 Q 10 130 50 130 Q 75 130 90 115",
  D: "M 20 130 L 20 10 L 50 10 Q 90 10 90 70 Q 90 130 50 130 Z",
  E: "M 90 10 L 20 10 L 20 130 L 90 130 M 20 65 L 75 65",
  F: "M 20 130 L 20 10 L 90 10 M 20 65 L 75 65",
  G: "M 90 30 Q 70 10 50 10 Q 10 10 10 70 Q 10 130 50 130 Q 90 130 90 90 L 90 70 L 55 70",
  H: "M 20 10 L 20 130 M 90 10 L 90 130 M 20 65 L 90 65",
  I: "M 50 10 L 50 130 M 20 10 L 80 10 M 20 130 L 80 130",
  J: "M 80 10 L 80 100 Q 80 130 50 130 Q 20 130 10 105",
  K: "M 20 10 L 20 130 M 90 10 L 20 70 L 90 130",
  L: "M 20 10 L 20 130 L 90 130",
  M: "M 10 130 L 10 10 L 50 75 L 90 10 L 90 130",
  N: "M 15 130 L 15 10 L 85 130 L 85 10",
  O: "M 50 10 C 15 10 10 40 10 70 C 10 100 15 130 50 130 C 85 130 90 100 90 70 C 90 40 85 10 50 10 Z",
  P: "M 20 130 L 20 10 L 60 10 Q 90 10 90 40 Q 90 70 60 70 L 20 70",
  Q: "M 50 10 C 15 10 10 40 10 70 C 10 100 15 130 50 130 C 85 130 90 100 90 70 C 90 40 85 10 50 10 Z M 65 105 L 100 140",
  R: "M 20 130 L 20 10 L 60 10 Q 90 10 90 40 Q 90 70 60 70 L 20 70 M 55 70 L 95 130",
  S: "M 85 25 Q 65 10 45 10 Q 10 10 10 40 Q 10 60 50 70 Q 90 80 90 105 Q 90 130 50 130 Q 25 130 10 115",
  T: "M 10 10 L 90 10 M 50 10 L 50 130",
  U: "M 15 10 L 15 95 Q 15 130 50 130 Q 85 130 85 95 L 85 10",
  V: "M 10 10 L 50 130 L 90 10",
  W: "M 5 10 L 25 130 L 50 65 L 75 130 L 95 10",
  X: "M 15 10 L 85 130 M 85 10 L 15 130",
  Y: "M 10 10 L 50 65 L 90 10 M 50 65 L 50 130",
  Z: "M 10 10 L 90 10 L 10 130 L 90 130",

  // Huruf kecil
  // a: lingkaran tertutup dan batang di sisi kanan
  a: "M 65 90 C 65 70 55 55 42 55 C 25 55 18 70 18 90 C 18 110 28 125 43 125 C 58 125 65 110 65 90 M 65 55 L 65 125",

  b: "M 20 10 L 20 120 M 20 75 Q 35 45 60 55 Q 85 65 75 95 Q 65 125 35 110",
  c: "M 75 60 Q 55 40 35 60 Q 15 80 35 105 Q 55 125 75 105",
  d: "M 75 10 L 75 120 M 75 75 Q 55 45 35 60 Q 15 75 35 105 Q 55 125 75 105",
  e: "M 20 85 L 75 85 Q 75 55 50 55 Q 20 55 20 85 Q 20 115 50 115 Q 65 115 75 105",
  f: "M 65 10 Q 40 10 40 40 L 40 120 M 20 55 L 70 55",

  g: "M 75 55 L 75 115 Q 75 145 45 145 Q 25 145 20 130 M 75 75 Q 55 45 35 60 Q 15 75 35 105 Q 55 125 75 105",

  h: "M 20 10 L 20 120 M 20 75 Q 40 45 60 60 Q 75 70 75 90 L 75 120",
  i: "M 40 55 L 40 120 M 40 25 L 40 26",
  j: "M 60 55 L 60 130 Q 60 150 35 140 M 60 25 L 60 26",
  k: "M 20 10 L 20 120 M 75 55 L 20 85 L 75 120",
  l: "M 45 10 L 45 120",
  m: "M 15 55 L 15 120 M 15 75 Q 30 45 45 65 L 45 120 M 45 75 Q 65 45 75 65 L 75 120",
  n: "M 20 55 L 20 120 M 20 75 Q 40 45 60 60 Q 75 70 75 90 L 75 120",
  o: "M 50 55 C 25 55 20 75 20 90 C 20 110 30 120 50 120 C 70 120 80 110 80 90 C 80 75 75 55 50 55 Z",
  p: "M 20 55 L 20 145 M 20 75 Q 40 45 60 60 Q 80 75 65 100 Q 50 120 20 100",
  q: "M 75 55 L 75 145 M 75 75 Q 55 45 35 60 Q 15 75 35 105 Q 55 125 75 105",
  r: "M 25 55 L 25 120 M 25 75 Q 45 45 70 60",
  s: "M 75 65 Q 60 50 40 55 Q 20 60 30 80 Q 40 90 60 95 Q 80 105 65 115 Q 45 125 20 110",
  t: "M 45 25 L 45 105 Q 45 120 65 115 M 20 55 L 70 55",
  u: "M 20 55 L 20 95 Q 20 120 45 120 Q 75 120 75 95 L 75 55 M 75 55 L 75 120",
  v: "M 15 55 L 45 120 L 75 55",
  w: "M 10 55 L 25 120 L 45 80 L 65 120 L 80 55",
  x: "M 20 55 L 75 120 M 75 55 L 20 120",
  y: "M 15 55 L 45 120 L 75 55 M 45 120 L 30 145",
  z: "M 20 55 L 75 55 L 20 120 L 75 120",
};

export default function MenebalkanHuruf() {
  const [jenisHuruf, setJenisHuruf] = useState<"kapital" | "kecil">(
    "kapital"
  );
  const [indeksAktif, setIndeksAktif] = useState(0);
  const [goresan, setGoresan] = useState<string[]>([]);
  const [goresanAktif, setGoresanAktif] = useState<Titik[]>([]);
  const [sedangMenggambar, setSedangMenggambar] = useState(false);
  const [pesan, setPesan] = useState(
    "Yuk, tebalkan garis huruf dengan perlahan!"
  );

  const areaGambar = useRef<SVGSVGElement>(null);

  const hurufKapital = daftarHuruf[indeksAktif];
  const hurufAktif =
    jenisHuruf === "kapital"
      ? hurufKapital
      : hurufKapital.toLowerCase();

  const persentase = Math.round(
    ((indeksAktif + 1) / daftarHuruf.length) * 100
  );

  function ambilPosisi(
    event: PointerEvent<SVGSVGElement>
  ): Titik | null {
    const svg = areaGambar.current;
    if (!svg) return null;

    const rect = svg.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 800,
      y: ((event.clientY - rect.top) / rect.height) * 300,
    };
  }

  function buatPath(titik: Titik[]) {
    return titik
      .map(
        (posisi, index) =>
          `${index === 0 ? "M" : "L"} ${posisi.x} ${posisi.y}`
      )
      .join(" ");
  }

  function mulaiMenggambar(event: PointerEvent<SVGSVGElement>) {
    event.preventDefault();

    const posisi = ambilPosisi(event);
    if (!posisi) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    setSedangMenggambar(true);
    setGoresanAktif([posisi]);
    setPesan("Bagus! Terus ikuti jalur hurufnya!");
  }

  function lanjutMenggambar(event: PointerEvent<SVGSVGElement>) {
    if (!sedangMenggambar) return;

    event.preventDefault();

    const posisi = ambilPosisi(event);
    if (!posisi) return;

    setGoresanAktif((sebelumnya) => [...sebelumnya, posisi]);
  }

  function selesaiMenggambar() {
    if (!sedangMenggambar) return;

    setSedangMenggambar(false);

    if (goresanAktif.length > 1) {
      setGoresan((sebelumnya) => [
        ...sebelumnya,
        buatPath(goresanAktif),
      ]);

      setPesan("Hebat! Kamu sudah mencoba menebalkan huruf!");
    }

    setGoresanAktif([]);
  }

  function ulangiLatihan() {
    setGoresan([]);
    setGoresanAktif([]);
    setSedangMenggambar(false);
    setPesan("Yuk, coba lagi mengikuti garis huruf!");
  }

  function pilihHuruf(indeks: number) {
    setIndeksAktif(indeks);
    setGoresan([]);
    setGoresanAktif([]);
    setSedangMenggambar(false);
    setPesan("Yuk, tebalkan garis huruf dengan perlahan!");
  }

  function pilihJenisHuruf(jenis: "kapital" | "kecil") {
    setJenisHuruf(jenis);
    setGoresan([]);
    setGoresanAktif([]);
    setSedangMenggambar(false);
    setPesan("Yuk, tebalkan garis huruf dengan perlahan!");
  }

  function hurufSebelumnya() {
    pilihHuruf(
      (indeksAktif - 1 + daftarHuruf.length) %
        daftarHuruf.length
    );
  }

  function hurufBerikutnya() {
    pilihHuruf((indeksAktif + 1) % daftarHuruf.length);
  }

  return (
    <section className="tracing-letters">
      <div className="tracing-letters-intro">
        <span className="tracing-letters-label">
          ✏️ Ayo Belajar Menulis
        </span>

        <h2>Menebalkan Huruf A–Z</h2>

        <p>
          Ikuti garis tunggal pada huruf dengan jari, mouse, atau stylus.
        </p>
      </div>

      <div className="tracing-letter-type">
        <button
          type="button"
          className={jenisHuruf === "kapital" ? "active" : ""}
          onClick={() => pilihJenisHuruf("kapital")}
          aria-pressed={jenisHuruf === "kapital"}
        >
          Huruf Kapital
          <strong>ABC</strong>
        </button>

        <button
          type="button"
          className={jenisHuruf === "kecil" ? "active" : ""}
          onClick={() => pilihJenisHuruf("kecil")}
          aria-pressed={jenisHuruf === "kecil"}
        >
          Huruf Kecil
          <strong>abc</strong>
        </button>
      </div>

      <div className="tracing-letter-progress">
        <div className="tracing-letter-progress-info">
          <span>
            Huruf {indeksAktif + 1} dari {daftarHuruf.length}
          </span>
          <strong>{persentase}%</strong>
        </div>

        <div className="tracing-letter-progress-track">
          <div
            className="tracing-letter-progress-fill"
            style={{ width: `${persentase}%` }}
          />
        </div>
      </div>

      <div className="tracing-letter-card">
        <div className="tracing-letter-heading">
          <div className="tracing-letter-big">
            {hurufAktif}
          </div>

          <div>
            <h3>Huruf {hurufAktif}</h3>
            <p>
              {jenisHuruf === "kapital"
                ? "Huruf kapital"
                : "Huruf kecil"}
            </p>
          </div>
        </div>

        <div className="tracing-letter-instruction">
          <span>👆</span>
          Sentuh dan tarik mengikuti satu garis pada huruf.
        </div>

        <div className="tracing-letter-drawing-area">
          <svg
            ref={areaGambar}
            viewBox="0 0 800 300"
            preserveAspectRatio="xMidYMid meet"
            className="tracing-letter-canvas"
            onPointerDown={mulaiMenggambar}
            onPointerMove={lanjutMenggambar}
            onPointerUp={selesaiMenggambar}
            onPointerCancel={selesaiMenggambar}
            style={{
              touchAction: "none",
              cursor: "crosshair",
            }}
          >
            <line
              x1="40"
              y1="150"
              x2="760"
              y2="150"
              stroke="#e8edf3"
              strokeWidth="2"
              strokeDasharray="8 10"
            />

            <g transform="translate(310 15) scale(1.7)">
              <path
                d={jalurHuruf[hurufAktif]}
                fill="none"
                stroke="#b8c9dc"
                strokeWidth="3"
                strokeDasharray="3 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {goresan.map((path, index) => (
              <path
                key={index}
                d={path}
                fill="none"
                stroke="#3986e8"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {goresanAktif.length > 1 && (
              <path
                d={buatPath(goresanAktif)}
                fill="none"
                stroke="#3986e8"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>

        <div className="tracing-letter-message" aria-live="polite">
          {pesan}
        </div>

        <div className="tracing-letter-actions">
          <button
            type="button"
            className="tracing-letter-reset"
            onClick={ulangiLatihan}
          >
            ↻ Ulangi
          </button>

          <button
            type="button"
            className="tracing-letter-next"
            onClick={hurufBerikutnya}
          >
            Huruf Berikutnya →
          </button>
        </div>
      </div>

      <div className="tracing-letter-selector">
        <h3>Pilih Huruf</h3>

        <div className="tracing-letter-grid">
          {daftarHuruf.map((huruf, indeks) => {
            const hurufTampil =
              jenisHuruf === "kapital"
                ? huruf
                : huruf.toLowerCase();

            return (
              <button
                key={huruf}
                type="button"
                className={indeksAktif === indeks ? "active" : ""}
                onClick={() => pilihHuruf(indeks)}
                aria-label={`Pilih huruf ${hurufTampil}`}
                aria-pressed={indeksAktif === indeks}
              >
                {hurufTampil}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tracing-letter-navigation">
        <button type="button" onClick={hurufSebelumnya}>
          ← Huruf Sebelumnya
        </button>

        <button type="button" onClick={hurufBerikutnya}>
          Huruf Selanjutnya →
        </button>
      </div>
    </section>
  );
}
