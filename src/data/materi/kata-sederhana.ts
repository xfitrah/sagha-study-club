
import type { DataKata } from "./index";

// Tingkat kesulitan untuk materi Kata Sederhana.
export type TingkatKataSederhana = 1 | 2 | 3 | 4;

// DAFTAR KOSAKATA
export const dataKataSederhana: DataKata[] = [
  // A
  { huruf: "A", kata: "aku", sukuKata: "a-ku", emoji: "🙋" },
  { huruf: "A", kata: "ada", sukuKata: "a-da", emoji: "🟢" },
  { huruf: "A", kata: "apa", sukuKata: "a-pa", emoji: "❓" },
  { huruf: "A", kata: "abu", sukuKata: "a-bu", emoji: "🌋" },

  // B
  { huruf: "B", kata: "bibi", sukuKata: "bi-bi", emoji: "👩" },
  { huruf: "B", kata: "bisa", sukuKata: "bi-sa", emoji: "👍" },
  { huruf: "B", kata: "buka", sukuKata: "bu-ka", emoji: "🚪" },
  { huruf: "B", kata: "bulu", sukuKata: "bu-lu", emoji: "🪶" },
  { huruf: "B", kata: "baca", sukuKata: "ba-ca", emoji: "📖" },
  { huruf: "B", kata: "bawa", sukuKata: "ba-wa", emoji: "👜" },
  { huruf: "B", kata: "bata", sukuKata: "ba-ta", emoji: "🧱" },
  { huruf: "B", kata: "baki", sukuKata: "ba-ki", emoji: "🍽️" },

  // C
  { huruf: "C", kata: "cari", sukuKata: "ca-ri", emoji: "🔎" },
  { huruf: "C", kata: "coba", sukuKata: "co-ba", emoji: "🤔" },
  { huruf: "C", kata: "cucu", sukuKata: "cu-cu", emoji: "👧" },
  { huruf: "C", kata: "cita", sukuKata: "ci-ta", emoji: "⭐" },
  { huruf: "C", kata: "ciri", sukuKata: "ci-ri", emoji: "🔍" },

  // D
  { huruf: "D", kata: "dada", sukuKata: "da-da", emoji: "🧍" },
  { huruf: "D", kata: "duka", sukuKata: "du-ka", emoji: "😢" },
  { huruf: "D", kata: "dari", sukuKata: "da-ri", emoji: "➡️" },
  { huruf: "D", kata: "dana", sukuKata: "da-na", emoji: "💰" },
  { huruf: "D", kata: "duri", sukuKata: "du-ri", emoji: "🌵" },

  // G
  { huruf: "G", kata: "gaya", sukuKata: "ga-ya", emoji: "💃" },
  { huruf: "G", kata: "gema", sukuKata: "ge-ma", emoji: "🔊" },

  // H
  { huruf: "H", kata: "hobi", sukuKata: "ho-bi", emoji: "🎨" },
  { huruf: "H", kata: "hari", sukuKata: "ha-ri", emoji: "☀️" },
  { huruf: "H", kata: "hawa", sukuKata: "ha-wa", emoji: "🌬️" },

  // I
  { huruf: "I", kata: "ini", sukuKata: "i-ni", emoji: "👇" },
  { huruf: "I", kata: "itu", sukuKata: "i-tu", emoji: "👉" },
  { huruf: "I", kata: "iya", sukuKata: "i-ya", emoji: "😊" },
  { huruf: "I", kata: "ide", sukuKata: "i-de", emoji: "💡" },

  // J
  { huruf: "J", kata: "jika", sukuKata: "ji-ka", emoji: "💭" },
  { huruf: "J", kata: "juga", sukuKata: "ju-ga", emoji: "➕" },
  { huruf: "J", kata: "jaga", sukuKata: "ja-ga", emoji: "🛡️" },
  { huruf: "J", kata: "jamu", sukuKata: "ja-mu", emoji: "🥤" },
  { huruf: "J", kata: "jasa", sukuKata: "ja-sa", emoji: "🤝" },
  { huruf: "J", kata: "jaya", sukuKata: "ja-ya", emoji: "🏆" },

  // K
  { huruf: "K", kata: "kaca", sukuKata: "ka-ca", emoji: "🪟" },
  { huruf: "K", kata: "kaku", sukuKata: "ka-ku", emoji: "🧍" },
  { huruf: "K", kata: "kota", sukuKata: "ko-ta", emoji: "🏙️" },
  { huruf: "K", kata: "kita", sukuKata: "ki-ta", emoji: "👨‍👩‍👧" },
  { huruf: "K", kata: "kayu", sukuKata: "ka-yu", emoji: "🪵" },
  { huruf: "K", kata: "kuku", sukuKata: "ku-ku", emoji: "💅" },
  { huruf: "K", kata: "kera", sukuKata: "ke-ra", emoji: "🐒" },
  { huruf: "K", kata: "kali", sukuKata: "ka-li", emoji: "➗" },

  // L
  { huruf: "L", kata: "lima", sukuKata: "li-ma", emoji: "5️⃣" },
  { huruf: "L", kata: "lupa", sukuKata: "lu-pa", emoji: "🤔" },
  { huruf: "L", kata: "lalu", sukuKata: "la-lu", emoji: "➡️" },
  { huruf: "L", kata: "lari", sukuKata: "la-ri", emoji: "🏃" },
  { huruf: "L", kata: "lega", sukuKata: "le-ga", emoji: "😌" },
  { huruf: "L", kata: "luka", sukuKata: "lu-ka", emoji: "🩹" },
  { huruf: "L", kata: "lusa", sukuKata: "lu-sa", emoji: "📅" },

  // M
  { huruf: "M", kata: "mama", sukuKata: "ma-ma", emoji: "👩" },
  { huruf: "M", kata: "mana", sukuKata: "ma-na", emoji: "❓" },
  { huruf: "M", kata: "muka", sukuKata: "mu-ka", emoji: "🙂" },
  { huruf: "M", kata: "muda", sukuKata: "mu-da", emoji: "🧒" },
  { huruf: "M", kata: "mula", sukuKata: "mu-la", emoji: "🌱" },
  { huruf: "M", kata: "mari", sukuKata: "ma-ri", emoji: "👋" },

  // N
  { huruf: "N", kata: "nama", sukuKata: "na-ma", emoji: "🏷️" },
  { huruf: "N", kata: "nada", sukuKata: "na-da", emoji: "🎵" },
  { huruf: "N", kata: "naga", sukuKata: "na-ga", emoji: "🐉" },
  { huruf: "N", kata: "nona", sukuKata: "no-na", emoji: "👧" },

  // P
  { huruf: "P", kata: "papa", sukuKata: "pa-pa", emoji: "👨" },
  { huruf: "P", kata: "pipi", sukuKata: "pi-pi", emoji: "😊" },
  { huruf: "P", kata: "pita", sukuKata: "pi-ta", emoji: "🎀" },
  { huruf: "P", kata: "pala", sukuKata: "pa-la", emoji: "🌰" },
  { huruf: "P", kata: "paha", sukuKata: "pa-ha", emoji: "🦵" },
  { huruf: "P", kata: "pagi", sukuKata: "pa-gi", emoji: "🌅" },
  { huruf: "P", kata: "palu", sukuKata: "pa-lu", emoji: "🔨" },
  { huruf: "P", kata: "peta", sukuKata: "pe-ta", emoji: "🗺️" },
  { huruf: "P", kata: "pola", sukuKata: "po-la", emoji: "🔷" },
  { huruf: "P", kata: "pura", sukuKata: "pu-ra", emoji: "🏛️" },

  // R
  { huruf: "R", kata: "rapi", sukuKata: "ra-pi", emoji: "✨" },
  { huruf: "R", kata: "rasa", sukuKata: "ra-sa", emoji: "👅" },
  { huruf: "R", kata: "rabu", sukuKata: "ra-bu", emoji: "📅" },
  { huruf: "R", kata: "ragu", sukuKata: "ra-gu", emoji: "🤔" },
  { huruf: "R", kata: "raya", sukuKata: "ra-ya", emoji: "🎉" },

  // S
  { huruf: "S", kata: "sama", sukuKata: "sa-ma", emoji: "🤝" },
  { huruf: "S", kata: "sisi", sukuKata: "si-si", emoji: "◀️" },
  { huruf: "S", kata: "suka", sukuKata: "su-ka", emoji: "❤️" },
  { huruf: "S", kata: "satu", sukuKata: "sa-tu", emoji: "1️⃣" },
  { huruf: "S", kata: "sana", sukuKata: "sa-na", emoji: "👉" },
  { huruf: "S", kata: "sini", sukuKata: "si-ni", emoji: "👇" },
  { huruf: "S", kata: "saku", sukuKata: "sa-ku", emoji: "👖" },
  { huruf: "S", kata: "sari", sukuKata: "sa-ri", emoji: "🥻" },
  { huruf: "S", kata: "sore", sukuKata: "so-re", emoji: "🌇" },
  { huruf: "S", kata: "soto", sukuKata: "so-to", emoji: "🍲" },

  // T
  { huruf: "T", kata: "tamu", sukuKata: "ta-mu", emoji: "🚪" },
  { huruf: "T", kata: "tari", sukuKata: "ta-ri", emoji: "💃" },
  { huruf: "T", kata: "tiga", sukuKata: "ti-ga", emoji: "3️⃣" },
  { huruf: "T", kata: "tahu", sukuKata: "ta-hu", emoji: "🍢" },
  { huruf: "T", kata: "tawa", sukuKata: "ta-wa", emoji: "😂" },
  { huruf: "T", kata: "tiba", sukuKata: "ti-ba", emoji: "🚶" },
  { huruf: "T", kata: "tiru", sukuKata: "ti-ru", emoji: "🪞" },
  { huruf: "T", kata: "toko", sukuKata: "to-ko", emoji: "🏪" },
  { huruf: "T", kata: "tuli", sukuKata: "tu-li", emoji: "🤟" },
  { huruf: "T", kata: "tua", sukuKata: "tu-a", emoji: "👴" },

  // U
  { huruf: "U", kata: "usia", sukuKata: "u-si-a", emoji: "🎂" },
  { huruf: "U", kata: "ungu", sukuKata: "u-ngu", emoji: "🟣" },

  // V
  { huruf: "V", kata: "visa", sukuKata: "vi-sa", emoji: "🛂" },

  // W
  { huruf: "W", kata: "wudu", sukuKata: "wu-du", emoji: "💧" },
];

// PEMBAGIAN TINGKAT KESULITAN
export const tingkatKataSederhana: Record<
  string,
  TingkatKataSederhana
> = {
  // Tingkat 1: kata sangat pendek dan akrab
  aku: 1,
  ada: 1,
  apa: 1,
  bibi: 1,
  dada: 1,
  ini: 1,
  itu: 1,
  iya: 1,
  mama: 1,
  nama: 1,
  papa: 1,
  pipi: 1,
  sama: 1,
  satu: 1,
  sana: 1,
  sini: 1,
  suka: 1,

  // Tingkat 2: kata konkret dan aktivitas sehari-hari
  abu: 2,
  baca: 2,
  baki: 2,
  bata: 2,
  bawa: 2,
  bisa: 2,
  buka: 2,
  bulu: 2,
  cari: 2,
  coba: 2,
  cucu: 2,
  duri: 2,
  kaca: 2,
  kayu: 2,
  kuku: 2,
  lima: 2,
  lari: 2,
  luka: 2,
  muka: 2,
  pala: 2,
  paha: 2,
  pagi: 2,
  palu: 2,
  pita: 2,
  rapi: 2,
  rasa: 2,
  saku: 2,
  tari: 2,
  tahu: 2,
  tamu: 2,
  tiga: 2,
  toko: 2,

  // Tingkat 3: variasi bunyi dan makna lebih beragam
  dari: 3,
  hari: 3,
  hobi: 3,
  jaga: 3,
  jamu: 3,
  jika: 3,
  juga: 3,
  kali: 3,
  kaku: 3,
  kera: 3,
  kita: 3,
  kota: 3,
  lalu: 3,
  lega: 3,
  lupa: 3,
  lusa: 3,
  mari: 3,
  mana: 3,
  muda: 3,
  mula: 3,
  nada: 3,
  naga: 3,
  nona: 3,
  peta: 3,
  pola: 3,
  pura: 3,
  rabu: 3,
  raya: 3,
  sari: 3,
  sisi: 3,
  sore: 3,
  soto: 3,
  tawa: 3,
  tiba: 3,
  tiru: 3,
  tuli: 3,
  tua: 3,
  wudu: 3,

  // Tingkat 4: kata lebih abstrak atau kurang umum
  cita: 4,
  ciri: 4,
  duka: 4,
  dana: 4,
  gaya: 4,
  gema: 4,
  hawa: 4,
  ide: 4,
  jasa: 4,
  jaya: 4,
  ragu: 4,
  usia: 4,
  ungu: 4,
  visa: 4,
};

// PEMERIKSAAN OTOMATIS SAAT DEVELOPMENT
if (import.meta.env.DEV) {
  const daftarKata = dataKataSederhana.map(
    (item) => item.kata.trim().toLowerCase()
  );

  const kataUnik = new Set(daftarKata);

  const kataDuplikat = daftarKata.filter(
    (kata, index) => daftarKata.indexOf(kata) !== index
  );

  const kataBelumMemilikiTingkat =
    dataKataSederhana
      .filter(
        (item) =>
          tingkatKataSederhana[item.kata] === undefined
      )
      .map((item) => item.kata);

  const tingkatTanpaKata = Object.keys(
    tingkatKataSederhana
  ).filter(
    (kata) =>
      !kataUnik.has(kata.trim().toLowerCase())
  );

  if (
    kataDuplikat.length > 0 ||
    kataBelumMemilikiTingkat.length > 0 ||
    tingkatTanpaKata.length > 0
  ) {
    console.group("Pemeriksaan Kata Sederhana");

    if (kataDuplikat.length > 0) {
      console.error("Kata duplikat:", [
        ...new Set(kataDuplikat),
      ]);
    }

    if (kataBelumMemilikiTingkat.length > 0) {
      console.error(
        "Kata belum memiliki tingkat:",
        kataBelumMemilikiTingkat
      );
    }

    if (tingkatTanpaKata.length > 0) {
      console.error(
        "Tingkat mengacu pada kata yang tidak terdaftar:",
        tingkatTanpaKata
      );
    }

    console.groupEnd();
  } else {
    console.info(
      `Pemeriksaan Kata Sederhana berhasil: ${dataKataSederhana.length} kata, tanpa duplikasi, dan seluruh kata memiliki tingkat kesulitan.`
    );
  }
}
