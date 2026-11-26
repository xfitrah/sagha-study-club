
import { dataKata } from "./index";
import { dataKataSederhana } from "./kata-sederhana";
import { dataKataTambahan } from "./kata-tambahan";
import { dataKataLanjutan } from "./kata-lanjutan";
import { dataKataPengayaan } from "./kata-pengayaan";

const semuaKelompok = [
  {
    nama: "Kata Sederhana",
    data: dataKataSederhana,
  },
  {
    nama: "Kata A-Z",
    data: dataKata,
  },
  {
    nama: "Kata Tambahan",
    data: dataKataTambahan,
  },
  {
    nama: "Kata Lanjutan",
    data: dataKataLanjutan,
  },
  {
    nama: "Kata Pengayaan",
    data: dataKataPengayaan,
  },
];

type KataDitemukan = {
  kata: string;
  kelompok: string[];
};

export function periksaDuplikasiKata(): KataDitemukan[] {
  const daftarKata = new Map<string, string[]>();

  for (const kelompok of semuaKelompok) {
    for (const item of kelompok.data) {
      const kataNormal = item.kata.trim().toLowerCase();

      const kelompokSebelumnya =
        daftarKata.get(kataNormal) ?? [];

      kelompokSebelumnya.push(kelompok.nama);

      daftarKata.set(kataNormal, kelompokSebelumnya);
    }
  }

  return Array.from(daftarKata.entries())
    .filter(([, kelompok]) => kelompok.length > 1)
    .map(([kata, kelompok]) => ({
      kata,
      kelompok,
    }));
}

// Pemeriksaan otomatis saat development.
if (import.meta.env.DEV) {
  const duplikasi = periksaDuplikasiKata();

  if (duplikasi.length > 0) {
    console.group("Pemeriksaan Kosakata Sagha Study Club");

    console.warn(
      `Ditemukan ${duplikasi.length} kata yang digunakan lebih dari sekali:`
    );

    console.table(
      duplikasi.map((item) => ({
        Kata: item.kata,
        Kelompok: item.kelompok.join(", "),
      }))
    );

    console.groupEnd();
  } else {
    console.info(
      "Pemeriksaan Kosakata Sagha Study Club: Tidak ditemukan duplikasi."
    );
  }
}
