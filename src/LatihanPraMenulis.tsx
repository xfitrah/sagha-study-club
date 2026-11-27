
import { useRef, useState } from "react";

type PolaLatihan = {
  nama: string;
  deskripsi: string;
  ikon: string;
  jenis: "garis" | "lengkung" | "gelombang" | "zigzag" | "lingkaran";
  jalur: string;
};

const daftarPola: PolaLatihan[] = [
  {
    nama: "Garis Lurus",
    deskripsi: "Ikuti garis dari kiri ke kanan.",
    ikon: "➖",
    jenis: "garis",
    jalur: "M 80 150 L 720 150",
  },
  {
    nama: "Garis Miring",
    deskripsi: "Ikuti garis miring sampai ke ujung.",
    ikon: "／",
    jenis: "garis",
    jalur: "M 100 230 L 700 70",
  },
  {
    nama: "Garis Lengkung",
    deskripsi: "Ikuti garis melengkung dengan perlahan.",
    ikon: "⌒",
    jenis: "lengkung",
    jalur: "M 80 190 Q 400 0 720 190",
  },
  {
    nama: "Garis Bergelombang",
    deskripsi: "Ikuti gelombang dari awal sampai akhir.",
    ikon: "〰️",
    jenis: "gelombang",
    jalur: "M 70 150 C 150 30 230 30 310 150 S 470 270 550 150 S 670 30 730 150",
  },
  {
    nama: "Garis Zig-zag",
    deskripsi: "Ikuti garis naik dan turun.",
    ikon: "⚡",
    jenis: "zigzag",
    jalur: "M 70 190 L 200 70 L 330 190 L 460 70 L 590 190 L 730 70",
  },
  {
    nama: "Lingkaran",
    deskripsi: "Ikuti garis sampai membentuk lingkaran.",
    ikon: "⭕",
    jenis: "lingkaran",
    jalur: "M 400 45 A 115 105 0 1 1 399.9 45",
  },
];

type Titik = {
  x: number;
  y: number;
};

export default function LatihanPraMenulis() {
  const [indeksAktif, setIndeksAktif] = useState(0);
  const [hasilGambar, setHasilGambar] = useState<string[]>([]);
  const [goresanAktif, setGoresanAktif] = useState<Titik[]>([]);
  const [sedangMenggambar, setSedangMenggambar] = useState(false);
  const [pesan, setPesan] = useState(
    "Yuk, ikuti garis putus-putus dengan jari atau mouse!"
  );

  const areaGambar = useRef<SVGSVGElement>(null);

  const polaAktif = daftarPola[indeksAktif];

  function ambilPosisi(
    event: React.PointerEvent<SVGSVGElement>
  ): Titik | null {
    const svg = areaGambar.current;

    if (!svg) return null;

    const rect = svg.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 800,
      y: ((event.clientY - rect.top) / rect.height) * 300,
    };
  }

  function mulaiMenggambar(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    event.preventDefault();

    const posisi = ambilPosisi(event);

    if (!posisi) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    setSedangMenggambar(true);
    setGoresanAktif([posisi]);
    setPesan("Bagus! Terus ikuti garisnya!");
  }

  function lanjutMenggambar(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (!sedangMenggambar) return;

    event.preventDefault();

    const posisi = ambilPosisi(event);

    if (!posisi) return;

    setGoresanAktif((sebelumnya) => [
      ...sebelumnya,
      posisi,
    ]);
  }

  function selesaiMenggambar() {
    if (!sedangMenggambar) return;

    setSedangMenggambar(false);

    if (goresanAktif.length > 1) {
      const path = goresanAktif
        .map((titik, index) => {
          return `${index === 0 ? "M" : "L"} ${titik.x} ${titik.y}`;
        })
        .join(" ");

      setHasilGambar((sebelumnya) => [
        ...sebelumnya,
        path,
      ]);

      setPesan("Hebat! Kamu sudah mencoba menulis. 🌟");
    }

    setGoresanAktif([]);
  }

  function hapusLatihan() {
    setHasilGambar([]);
    setGoresanAktif([]);
    setSedangMenggambar(false);
    setPesan("Yuk, coba lagi dari awal!");
  }

  function pilihPola(indeks: number) {
    setIndeksAktif(indeks);
    setHasilGambar([]);
    setGoresanAktif([]);
    setSedangMenggambar(false);
    setPesan(
      "Yuk, ikuti garis putus-putus dengan jari atau mouse!"
    );
  }

  function polaBerikutnya() {
    pilihPola((indeksAktif + 1) % daftarPola.length);
  }

  function polaSebelumnya() {
    pilihPola(
      (indeksAktif - 1 + daftarPola.length) %
        daftarPola.length
    );
  }

  const buatPath = (titik: Titik[]) =>
    titik
      .map((titik, index) => {
        return `${index === 0 ? "M" : "L"} ${titik.x} ${titik.y}`;
      })
      .join(" ");

  return (
    <section className="prewriting">
      <div className="prewriting-intro">
        <span className="prewriting-label">
          ✏️ Ayo Berlatih Menulis
        </span>

        <h2>Latihan Pra-Menulis</h2>

        <p>
          Sebelum belajar menulis huruf, yuk latih tangan
          kita mengikuti berbagai macam garis!
        </p>
      </div>

      <div className="prewriting-progress">
        <div className="prewriting-progress-info">
          <span>Latihan {indeksAktif + 1} dari {daftarPola.length}</span>
          <strong>{Math.round(((indeksAktif + 1) / daftarPola.length) * 100)}%</strong>
        </div>

        <div className="prewriting-progress-track">
          <div
            className="prewriting-progress-fill"
            style={{
              width: `${((indeksAktif + 1) / daftarPola.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="prewriting-card">
        <div className="prewriting-activity-heading">
          <div className="prewriting-activity-icon">
            {polaAktif.ikon}
          </div>

          <div>
            <h3>{polaAktif.nama}</h3>
            <p>{polaAktif.deskripsi}</p>
          </div>
        </div>

        <div className="prewriting-instruction">
          <span>👆</span>
          Sentuh dan tarik mengikuti garis putus-putus.
        </div>

        <div className="prewriting-drawing-area">
          <svg
            ref={areaGambar}
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
            className="prewriting-canvas"
            onPointerDown={mulaiMenggambar}
            onPointerMove={lanjutMenggambar}
            onPointerUp={selesaiMenggambar}
            onPointerCancel={selesaiMenggambar}
            style={{
              touchAction: "none",
              cursor: "crosshair",
            }}
          >
            <path
              d={polaAktif.jalur}
              fill="none"
              stroke="#b8c5d6"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="3 17"
            />

            <path
              d={polaAktif.jalur}
              fill="none"
              stroke="#e5eaf1"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {hasilGambar.map((path, index) => (
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

          <div className="prewriting-start-marker">
            Mulai
          </div>
        </div>

        <div className="prewriting-message" aria-live="polite">
          {pesan}
        </div>

        <div className="prewriting-actions">
          <button
            type="button"
            className="prewriting-button prewriting-button-reset"
            onClick={hapusLatihan}
          >
            ↻ Ulangi
          </button>

          <button
            type="button"
            className="prewriting-button prewriting-button-next"
            onClick={polaBerikutnya}
          >
            Latihan Berikutnya →
          </button>
        </div>
      </div>

      <div className="prewriting-topic-section">
        <h3>Pilih Latihan</h3>

        <div className="prewriting-topic-list">
          {daftarPola.map((pola, index) => (
            <button
              key={pola.nama}
              type="button"
              className={`prewriting-topic ${
                indeksAktif === index ? "active" : ""
              }`}
              onClick={() => pilihPola(index)}
              aria-pressed={indeksAktif === index}
            >
              <span>{pola.ikon}</span>
              <small>{pola.nama}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="prewriting-navigation">
        <button
          type="button"
          onClick={polaSebelumnya}
          className="prewriting-navigation-button"
        >
          ← Sebelumnya
        </button>

        <button
          type="button"
          onClick={polaBerikutnya}
          className="prewriting-navigation-button"
        >
          Selanjutnya →
        </button>
      </div>
    </section>
  );
}
