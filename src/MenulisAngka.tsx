
import { useState } from "react";
import type { PointerEvent } from "react";

const daftarAngka = Array.from({ length: 10 }, (_, index) => index + 1);

const jalurAngka: Record<number, string> = {
  1: "M 48 18 L 28 38 M 48 18 L 48 122",
  2: "M 16 38 C 16 12 72 8 80 34 C 86 54 58 76 20 118 L 84 118",
  3: "M 18 28 C 38 8 78 14 78 40 C 78 58 58 62 40 62 C 62 62 82 68 82 90 C 82 122 38 128 16 104",
  4: "M 62 122 L 62 18 L 12 82 L 88 82",
  5: "M 78 18 L 26 18 L 22 58 C 58 40 84 58 82 88 C 80 126 36 128 14 104",
  6: "M 72 22 C 30 8 14 54 18 88 C 22 126 78 130 84 94 C 90 58 48 48 20 70",
  7: "M 14 18 L 88 18 L 42 122",
  8: "M 50 64 C 12 52 20 14 50 14 C 82 14 88 52 50 64 C 8 76 16 122 50 122 C 86 122 92 76 50 64",
  9: "M 78 68 C 48 92 14 70 20 38 C 26 8 74 8 82 40 C 94 84 64 116 28 122",

  // Angka 10: angka 1 di kiri dan angka 0 di kanan.
  10: [
    "M 25 18 L 12 32 M 25 18 L 25 122",
    "M 68 18 C 48 18 48 122 68 122 C 88 122 88 18 68 18",
  ].join(" "),
};

type Titik = {
  x: number;
  y: number;
};

type Coretan = Titik[];

export default function MenulisAngka() {
  const [angkaAktif, setAngkaAktif] = useState(1);
  const [coretan, setCoretan] = useState<Coretan[]>([]);
  const [coretanAktif, setCoretanAktif] = useState<Coretan | null>(null);
  const [modePanduan, setModePanduan] = useState(true);

  function posisi(event: PointerEvent<SVGSVGElement>): Titik {
    const svg = event.currentTarget;
    const titik = svg.createSVGPoint();

    titik.x = event.clientX;
    titik.y = event.clientY;

    const matriks = svg.getScreenCTM();

    if (!matriks) {
      return { x: 0, y: 0 };
    }

    const koordinat = titik.matrixTransform(matriks.inverse());

    return {
      x: Math.max(0, Math.min(100, koordinat.x)),
      y: Math.max(0, Math.min(135, koordinat.y)),
    };
  }

  function mulai(event: PointerEvent<SVGSVGElement>) {
    event.preventDefault();

    const titikAwal = posisi(event);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture tidak tersedia, gambar tetap dapat dilanjutkan.
    }

    setCoretanAktif([titikAwal]);
  }

  function gambar(event: PointerEvent<SVGSVGElement>) {
    if (coretanAktif === null) return;

    event.preventDefault();

    // Hitung koordinat saat event masih aktif.
    // Jangan memanggil posisi(event) di dalam updater state.
    const titikBaru = posisi(event);

    setCoretanAktif((sebelumnya) => {
      if (sebelumnya === null) return null;

      return [...sebelumnya, titikBaru];
    });
  }

  function selesai(event: PointerEvent<SVGSVGElement>) {
    if (coretanAktif === null) return;

    event.preventDefault();

    setCoretan((sebelumnya) => [
      ...sebelumnya,
      coretanAktif,
    ]);

    setCoretanAktif(null);

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Abaikan jika pointer capture sudah dilepas.
    }
  }

  function batalkanGambar() {
    setCoretanAktif(null);
  }

  function hapusTulisan() {
    setCoretan([]);
    setCoretanAktif(null);
  }

  function pilihAngka(nilai: number) {
    setAngkaAktif(nilai);
    hapusTulisan();
  }

  function angkaBerikutnya() {
    pilihAngka(angkaAktif === 10 ? 1 : angkaAktif + 1);
  }

  function buatPath(titik: Coretan) {
    if (titik.length === 0) return "";

    return titik
      .map((p, index) =>
        `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`
      )
      .join(" ");
  }

  return (
    <section className="writing-number">
      <style>{`
        .writing-number {
          max-width: 920px;
          margin: 0 auto;
          padding: clamp(16px, 3vw, 28px);
          color: #24324b;
        }

        .writing-number__intro {
          text-align: center;
          margin-bottom: 22px;
        }

        .writing-number__intro h2 {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          margin: 0 0 8px;
          color: #3857a6;
        }

        .writing-number__intro p {
          margin: 0;
          color: #667085;
        }

        .writing-number__choices {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 9px;
          margin: 18px 0 22px;
        }

        .writing-number__choice {
          width: 44px;
          height: 44px;
          border: 2px solid #dce5f5;
          border-radius: 14px;
          background: #fff;
          color: #3857a6;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .writing-number__choice[aria-pressed="true"] {
          background: #4568c5;
          border-color: #4568c5;
          color: #fff;
          box-shadow: 0 4px 0 #2f4b9b;
        }

        .writing-number__card {
          background: linear-gradient(145deg, #f4f8ff, #fff9ed);
          border: 1px solid #e3eaf7;
          border-radius: 26px;
          padding: clamp(14px, 3vw, 24px);
          box-shadow: 0 8px 24px rgba(43, 69, 120, .08);
        }

        .writing-number__label {
          text-align: center;
          font-weight: 800;
          color: #6a7894;
          margin: 0 0 12px;
        }

        .writing-number__board {
          position: relative;
          width: min(100%, 340px);
          aspect-ratio: 100 / 135;
          margin: 0 auto;
          background: #fff;
          border: 3px dashed #d9e3f3;
          border-radius: 22px;
          overflow: hidden;
        }

        .writing-number__board svg {
          width: 100%;
          height: 100%;
          display: block;
          touch-action: none;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
        }

        .writing-number__guide {
          fill: none;
          stroke: #d8e3f5;
          stroke-width: 0.8;
          stroke-dasharray: 2 2;
          pointer-events: none;
        }

        .writing-number__trace {
          fill: none;
          stroke: #f3b94f;
          stroke-width: 2.2;
          stroke-dasharray: 2.5 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
        }

        .writing-number__ink {
          fill: none;
          stroke: #4568c5;
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
        }

        .writing-number__controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 18px;
        }

        .writing-number__btn {
          border: 0;
          border-radius: 14px;
          padding: 12px 20px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
        }

        .writing-number__btn--secondary {
          background: #eaf0fc;
          color: #3857a6;
        }

        .writing-number__btn--primary {
          background: #f5bd4f;
          color: #513b0b;
          box-shadow: 0 4px 0 #d99c2b;
        }

        .writing-number__toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 14px;
          color: #667085;
          font-size: .95rem;
        }

        .writing-number__toggle input {
          width: 18px;
          height: 18px;
          accent-color: #4568c5;
        }

        .writing-number__hint {
          text-align: center;
          color: #7b879c;
          font-size: .9rem;
          margin: 14px 0 0;
        }

        @media (max-width: 480px) {
          .writing-number__board {
            width: min(100%, 280px);
          }

          .writing-number__controls {
            flex-direction: column;
          }

          .writing-number__btn {
            width: 100%;
          }
        }
      `}</style>

      <header className="writing-number__intro">
        <h2>Yuk, Menulis Angka!</h2>
        <p>
          Latihan menulis angka 1 sampai 10 dengan rapi.
        </p>
      </header>

      <nav
        className="writing-number__choices"
        aria-label="Pilih angka latihan"
      >
        {daftarAngka.map((nilai) => (
          <button
            key={nilai}
            type="button"
            className="writing-number__choice"
            aria-pressed={angkaAktif === nilai}
            onClick={() => pilihAngka(nilai)}
          >
            {nilai}
          </button>
        ))}
      </nav>

      <div className="writing-number__card">
        <p className="writing-number__label">
          Angka latihan: <strong>{angkaAktif}</strong>
        </p>

        <div className="writing-number__board">
          <svg
            viewBox="0 0 100 135"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Area latihan menulis angka ${angkaAktif}`}
            onPointerDown={mulai}
            onPointerMove={gambar}
            onPointerUp={selesai}
            onPointerCancel={batalkanGambar}
            onLostPointerCapture={batalkanGambar}
          >
            <path
              className="writing-number__guide"
              d="M 5 45 H 95 M 5 90 H 95"
            />

            {modePanduan && (
              <path
                className="writing-number__trace"
                d={jalurAngka[angkaAktif]}
              />
            )}

            {coretan.map((garis, index) => (
              <path
                key={index}
                className="writing-number__ink"
                d={buatPath(garis)}
              />
            ))}

            {coretanAktif && (
              <path
                className="writing-number__ink"
                d={buatPath(coretanAktif)}
              />
            )}
          </svg>
        </div>

        <label className="writing-number__toggle">
          <input
            type="checkbox"
            checked={modePanduan}
            onChange={(event) =>
              setModePanduan(event.target.checked)
            }
          />
          Tampilkan garis panduan angka
        </label>

        <div className="writing-number__controls">
          <button
            type="button"
            className="writing-number__btn writing-number__btn--secondary"
            onClick={hapusTulisan}
          >
            Hapus tulisan
          </button>

          <button
            type="button"
            className="writing-number__btn writing-number__btn--primary"
            onClick={angkaBerikutnya}
          >
            Angka Berikutnya →
          </button>
        </div>

        <p className="writing-number__hint">
          Ikuti garis angka, lalu coba tulis sendiri di area putih.
        </p>
      </div>
    </section>
  );
}
