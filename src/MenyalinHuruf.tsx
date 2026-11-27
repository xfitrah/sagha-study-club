
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

type Titik = {
  x: number;
  y: number;
};

const daftarHuruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function MenyalinHuruf() {
  const [indeksHuruf, setIndeksHuruf] = useState(0);
  const [jenisHuruf, setJenisHuruf] = useState<"kapital" | "kecil">(
    "kapital"
  );
  const [goresan, setGoresan] = useState<Titik[][]>([]);
  const [goresanAktif, setGoresanAktif] = useState<Titik[]>([]);

  const areaGambar = useRef<SVGSVGElement | null>(null);

  const hurufKapital = daftarHuruf[indeksHuruf];
  const hurufKecil = hurufKapital.toLowerCase();

  const hurufContoh =
    jenisHuruf === "kapital" ? hurufKapital : hurufKecil;

  const ambilPosisi = (
    event: PointerEvent<SVGSVGElement>
  ): Titik | null => {
    const svg = areaGambar.current;

    if (!svg) {
      return null;
    }

    const posisi = svg.getBoundingClientRect();

    return {
      x: ((event.clientX - posisi.left) / posisi.width) * 800,
      y: ((event.clientY - posisi.top) / posisi.height) * 300,
    };
  };

  const mulaiMenulis = (event: PointerEvent<SVGSVGElement>) => {
    event.preventDefault();

    const posisi = ambilPosisi(event);

    if (!posisi) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    setGoresanAktif([posisi]);
  };

  const lanjutMenulis = (event: PointerEvent<SVGSVGElement>) => {
    if (goresanAktif.length === 0) {
      return;
    }

    const posisi = ambilPosisi(event);

    if (!posisi) {
      return;
    }

    setGoresanAktif((sebelumnya) => [...sebelumnya, posisi]);
  };

  const selesaiMenulis = () => {
    if (goresanAktif.length > 0) {
      setGoresan((sebelumnya) => [...sebelumnya, goresanAktif]);
      setGoresanAktif([]);
    }
  };

  const ubahHuruf = (indeks: number) => {
    setIndeksHuruf(indeks);
    setGoresan([]);
    setGoresanAktif([]);
  };

  const hapusTulisan = () => {
    setGoresan([]);
    setGoresanAktif([]);
  };

  const hurufBerikutnya = () => {
    ubahHuruf((indeksHuruf + 1) % daftarHuruf.length);
  };

  const hurufSebelumnya = () => {
    ubahHuruf(
      (indeksHuruf - 1 + daftarHuruf.length) % daftarHuruf.length
    );
  };

  const ubahJenisHuruf = (jenis: "kapital" | "kecil") => {
    setJenisHuruf(jenis);
    setGoresan([]);
    setGoresanAktif([]);
  };

  const buatPath = (titik: Titik[]) => {
    if (titik.length === 0) {
      return "";
    }

    return titik
      .map((posisi, indeks) =>
        `${indeks === 0 ? "M" : "L"} ${posisi.x} ${posisi.y}`
      )
      .join(" ");
  };

  return (
    <div className="copy-letters">
      <div className="copy-letter-example">
        <span className="copy-letter-label">CONTOH HURUF</span>

        <div className="copy-letter-display" aria-label={`Contoh huruf ${hurufContoh}`}>
          {hurufContoh}
        </div>

        <p>
          Perhatikan bentuk hurufnya, lalu coba tulis sendiri di bawah.
        </p>
      </div>

      <div className="copy-letter-controls">
        <button
          type="button"
          className={jenisHuruf === "kapital" ? "selected" : ""}
          onClick={() => ubahJenisHuruf("kapital")}
          aria-pressed={jenisHuruf === "kapital"}
        >
          Huruf Kapital
        </button>

        <button
          type="button"
          className={jenisHuruf === "kecil" ? "selected" : ""}
          onClick={() => ubahJenisHuruf("kecil")}
          aria-pressed={jenisHuruf === "kecil"}
        >
          Huruf Kecil
        </button>
      </div>

      <div className="copy-writing-area">
        <div className="copy-writing-heading">
          <strong>Area Menulis</strong>
          <span>Gunakan jari atau mouse untuk menulis.</span>
        </div>

        <svg
          ref={areaGambar}
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid meet"
          className="copy-writing-svg"
          role="img"
          aria-label="Area kosong untuk latihan menyalin huruf"
          onPointerDown={mulaiMenulis}
          onPointerMove={lanjutMenulis}
          onPointerUp={selesaiMenulis}
          onPointerCancel={selesaiMenulis}
        >
          <rect
            x="0"
            y="0"
            width="800"
            height="300"
            rx="18"
            fill="#fffdf8"
          />

          <line
            x1="30"
            y1="75"
            x2="770"
            y2="75"
            stroke="#d9e3f0"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          <line
            x1="30"
            y1="150"
            x2="770"
            y2="150"
            stroke="#e9a6b8"
            strokeWidth="3"
          />

          <line
            x1="30"
            y1="225"
            x2="770"
            y2="225"
            stroke="#d9e3f0"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {goresan.map((garis, indeks) => (
            <path
              key={indeks}
              d={buatPath(garis)}
              fill="none"
              stroke="#6558c7"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {goresanAktif.length > 0 && (
            <path
              d={buatPath(goresanAktif)}
              fill="none"
              stroke="#6558c7"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      <div className="copy-writing-actions">
        <button
          type="button"
          className="nav-button secondary"
          onClick={hapusTulisan}
        >
          Hapus Tulisan
        </button>
      </div>

      <div className="copy-letter-navigation">
        <button
          type="button"
          className="nav-button secondary"
          onClick={hurufSebelumnya}
        >
          ← Huruf Sebelumnya
        </button>

        <button
          type="button"
          className="nav-button primary"
          onClick={hurufBerikutnya}
        >
          Huruf Berikutnya →
        </button>
      </div>

      <div className="copy-letter-grid">
        {daftarHuruf.map((huruf, indeks) => {
          const hurufPilihan =
            jenisHuruf === "kapital" ? huruf : huruf.toLowerCase();

          return (
            <button
              type="button"
              key={huruf}
              className={
                indeksHuruf === indeks ? "selected" : ""
              }
              onClick={() => ubahHuruf(indeks)}
              aria-pressed={indeksHuruf === indeks}
              aria-label={`Pilih huruf ${hurufPilihan}`}
            >
              {hurufPilihan}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MenyalinHuruf;
