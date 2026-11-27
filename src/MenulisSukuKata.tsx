
import { useState } from "react";
import type { PointerEvent } from "react";

type Goresan = {
  id: number;
  titik: string;
};

type KelompokSukuKata = {
  nama: string;
  sukuKata: string[];
};

const kelompokSukuKata: KelompokSukuKata[] = [
  {
    nama: "Huruf B",
    sukuKata: ["ba", "bi", "bu", "be", "bo"],
  },
  {
    nama: "Huruf C",
    sukuKata: ["ca", "ci", "cu", "ce", "co"],
  },
  {
    nama: "Huruf D",
    sukuKata: ["da", "di", "du", "de", "do"],
  },
  {
    nama: "Huruf M",
    sukuKata: ["ma", "mi", "mu", "me", "mo"],
  },
  {
    nama: "Huruf P",
    sukuKata: ["pa", "pi", "pu", "pe", "po"],
  },
  {
    nama: "Huruf S",
    sukuKata: ["sa", "si", "su", "se", "so"],
  },
  {
    nama: "Huruf T",
    sukuKata: ["ta", "ti", "tu", "te", "to"],
  },
  {
    nama: "Huruf K",
    sukuKata: ["ka", "ki", "ku", "ke", "ko"],
  },
];

export default function MenulisSukuKata() {
  const [kelompokAktif, setKelompokAktif] = useState(0);
  const [sukuKataAktif, setSukuKataAktif] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [goresanAktif, setGoresanAktif] = useState<number | null>(null);

  const kelompok = kelompokSukuKata[kelompokAktif];
  const sukuKata = kelompok.sukuKata[sukuKataAktif];

  function hapusTulisan() {
    setGoresan([]);
    setGoresanAktif(null);
  }

  function pilihKelompok(index: number) {
    setKelompokAktif(index);
    setSukuKataAktif(0);
    hapusTulisan();
  }

  function pilihSukuKata(index: number) {
    setSukuKataAktif(index);
    hapusTulisan();
  }

  function sukuKataBerikutnya() {
    if (sukuKataAktif < kelompok.sukuKata.length - 1) {
      setSukuKataAktif((sekarang) => sekarang + 1);
    } else if (kelompokAktif < kelompokSukuKata.length - 1) {
      setKelompokAktif((sekarang) => sekarang + 1);
      setSukuKataAktif(0);
    } else {
      setKelompokAktif(0);
      setSukuKataAktif(0);
    }

    hapusTulisan();
  }

  function sukuKataSebelumnya() {
    if (sukuKataAktif > 0) {
      setSukuKataAktif((sekarang) => sekarang - 1);
    } else if (kelompokAktif > 0) {
      const kelompokSebelumnya = kelompokAktif - 1;

      setKelompokAktif(kelompokSebelumnya);
      setSukuKataAktif(
        kelompokSukuKata[kelompokSebelumnya].sukuKata.length - 1,
      );
    } else {
      const kelompokTerakhir = kelompokSukuKata.length - 1;

      setKelompokAktif(kelompokTerakhir);
      setSukuKataAktif(
        kelompokSukuKata[kelompokTerakhir].sukuKata.length - 1,
      );
    }

    hapusTulisan();
  }

  function ambilPosisi(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 800;
    const y = ((event.clientY - rect.top) / rect.height) * 300;

    return `${x},${y}`;
  }

  function mulaiMenulis(event: PointerEvent<SVGSVGElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const id = Date.now();
    const titikAwal = ambilPosisi(event);

    setGoresan((sekarang) => [...sekarang, { id, titik: titikAwal }]);
    setGoresanAktif(id);
  }

  function lanjutMenulis(event: PointerEvent<SVGSVGElement>) {
    if (goresanAktif === null) return;

    event.preventDefault();

    const titikBaru = ambilPosisi(event);

    setGoresan((sekarang) =>
      sekarang.map((item) =>
        item.id === goresanAktif
          ? { ...item, titik: `${item.titik} ${titikBaru}` }
          : item,
      ),
    );
  }

  function selesaiMenulis() {
    setGoresanAktif(null);
  }

  return (
    <section className="syllable-writing">
      <header className="syllable-writing-header">
        <span className="syllable-writing-badge">Materi 4</span>

        <h2>Menulis Suku Kata</h2>

        <p>
          Ayo belajar menulis suku kata. Perhatikan contoh, lalu tuliskan
          kembali dengan tanganmu!
        </p>
      </header>

      <div className="syllable-writing-groups">
        <h3>Pilih Kelompok Huruf</h3>

        <div className="syllable-writing-group-list">
          {kelompokSukuKata.map((item, index) => (
            <button
              key={item.nama}
              type="button"
              className={kelompokAktif === index ? "active" : ""}
              aria-pressed={kelompokAktif === index}
              onClick={() => pilihKelompok(index)}
            >
              {item.nama}
            </button>
          ))}
        </div>
      </div>

      <div className="syllable-writing-layout">
        <article className="syllable-writing-example">
          <h3>Contoh Suku Kata</h3>

          <div className="syllable-writing-big" aria-label={`Contoh ${sukuKata}`}>
            {sukuKata}
          </div>

          <p>
            Baca perlahan: <strong>{sukuKata}</strong>
          </p>

          <div className="syllable-writing-progress">
            Latihan {sukuKataAktif + 1} dari {kelompok.sukuKata.length}
          </div>
        </article>

        <article className="syllable-writing-practice">
          <div className="syllable-writing-practice-heading">
            <h3>Giliranku Menulis</h3>

            <button type="button" onClick={hapusTulisan}>
              Hapus
            </button>
          </div>

          <svg
            className="syllable-writing-canvas"
            viewBox="0 0 800 300"
            role="img"
            aria-label="Area latihan menulis suku kata. Gunakan mouse atau sentuhan."
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
              className="syllable-writing-paper"
            />

            <line
              x1="0"
              y1="75"
              x2="800"
              y2="75"
              className="syllable-writing-line"
            />

            <line
              x1="0"
              y1="150"
              x2="800"
              y2="150"
              className="syllable-writing-line syllable-writing-middle"
            />

            <line
              x1="0"
              y1="225"
              x2="800"
              y2="225"
              className="syllable-writing-line"
            />

            <text
              x="400"
              y="205"
              textAnchor="middle"
              className="syllable-writing-guide-text"
            >
              {sukuKata}
            </text>

            {goresan.map((item) => (
              <polyline
                key={item.id}
                points={item.titik}
                className="syllable-writing-stroke"
              />
            ))}
          </svg>

          <p className="syllable-writing-tip">
            Gunakan jari, stylus, atau mouse untuk menulis.
          </p>
        </article>
      </div>

      <div className="syllable-writing-choice">
        <h3>Pilih Suku Kata</h3>

        <div className="syllable-writing-choice-grid">
          {kelompok.sukuKata.map((item, index) => (
            <button
              key={item}
              type="button"
              className={sukuKataAktif === index ? "active" : ""}
              aria-pressed={sukuKataAktif === index}
              onClick={() => pilihSukuKata(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <nav className="syllable-writing-navigation" aria-label="Navigasi latihan">
        <button type="button" onClick={sukuKataSebelumnya}>
          ← Sebelumnya
        </button>

        <span>
          {sukuKata} · {sukuKataAktif + 1}/{kelompok.sukuKata.length}
        </span>

        <button type="button" onClick={sukuKataBerikutnya}>
          Berikutnya →
        </button>
      </nav>
    </section>
  );
}
