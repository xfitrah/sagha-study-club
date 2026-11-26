
export type MateriId = "huruf" | "suku-kata" | "kata";

export interface Materi {
  id: MateriId;
  judul: string;
  deskripsi: string;
  urutan: number;
}

export const daftarMateri: Materi[] = [
  {
    id: "huruf",
    judul: "Mengenal Huruf",
    deskripsi: "Belajar mengenal huruf besar dan huruf kecil A-Z.",
    urutan: 1,
  },
  {
    id: "suku-kata",
    judul: "Mengenal Suku Kata",
    deskripsi: "Belajar membaca suku kata sederhana.",
    urutan: 2,
  },
  {
    id: "kata",
    judul: "Mengenal Kata",
    deskripsi: "Belajar membaca kata dari huruf A sampai Z.",
    urutan: 3,
  },
];

export interface DataKata {
  huruf: string;
  kata: string;
  sukuKata: string;
  emoji: string;
}

export const dataKata: DataKata[] = [
  { huruf: "A", kata: "apel", sukuKata: "a-pel", emoji: "🍎" },
  { huruf: "B", kata: "bebek", sukuKata: "be-bek", emoji: "🦆" },
  { huruf: "C", kata: "cabai", sukuKata: "ca-bai", emoji: "🌶️" },
  { huruf: "D", kata: "dadu", sukuKata: "da-du", emoji: "🎲" },
  { huruf: "E", kata: "ember", sukuKata: "em-ber", emoji: "🪣" },
  { huruf: "F", kata: "foto", sukuKata: "fo-to", emoji: "🖼️" },
  { huruf: "G", kata: "gajah", sukuKata: "ga-jah", emoji: "🐘" },
  { huruf: "H", kata: "handuk", sukuKata: "han-duk", emoji: "🧺" },
  { huruf: "I", kata: "ikan", sukuKata: "i-kan", emoji: "🐟" },
  { huruf: "J", kata: "jagung", sukuKata: "ja-gung", emoji: "🌽" },
  { huruf: "K", kata: "kuda", sukuKata: "ku-da", emoji: "🐴" },
  { huruf: "L", kata: "lampu", sukuKata: "lam-pu", emoji: "💡" },
  { huruf: "M", kata: "mangga", sukuKata: "mang-ga", emoji: "🥭" },
  { huruf: "N", kata: "nasi", sukuKata: "na-si", emoji: "🍚" },
  { huruf: "O", kata: "obat", sukuKata: "o-bat", emoji: "💊" },
  { huruf: "P", kata: "pensil", sukuKata: "pen-sil", emoji: "✏️" },
  { huruf: "Q", kata: "Quran", sukuKata: "Qur-an", emoji: "📖" },
  { huruf: "R", kata: "roti", sukuKata: "ro-ti", emoji: "🍞" },
  { huruf: "S", kata: "sepatu", sukuKata: "se-pa-tu", emoji: "👟" },
  { huruf: "T", kata: "topi", sukuKata: "to-pi", emoji: "🧢" },
  { huruf: "U", kata: "ubi", sukuKata: "u-bi", emoji: "🍠" },
  { huruf: "V", kata: "vas", sukuKata: "vas", emoji: "🏺" },
  { huruf: "W", kata: "wortel", sukuKata: "wor-tel", emoji: "🥕" },
  { huruf: "X", kata: "xilofon", sukuKata: "xi-lo-fon", emoji: "🎼" },
  { huruf: "Y", kata: "yoyo", sukuKata: "yo-yo", emoji: "🪀" },
  { huruf: "Z", kata: "zebra", sukuKata: "ze-bra", emoji: "🦓" },
];

export const dataHuruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const dataSukuKata = [
  "ba", "bi", "bu", "be", "bo",
  "ca", "ci", "cu", "ce", "co",
  "da", "di", "du", "de", "do",
  "fa", "fi", "fu", "fe", "fo",
  "ga", "gi", "gu", "ge", "go",
  "ha", "hi", "hu", "he", "ho",
  "ja", "ji", "ju", "je", "jo",
  "ka", "ki", "ku", "ke", "ko",
  "la", "li", "lu", "le", "lo",
  "ma", "mi", "mu", "me", "mo",
  "na", "ni", "nu", "ne", "no",
  "pa", "pi", "pu", "pe", "po",
  "ra", "ri", "ru", "re", "ro",
  "sa", "si", "su", "se", "so",
  "ta", "ti", "tu", "te", "to",
  "wa", "wi", "wu", "we", "wo",
  "ya", "yi", "yu", "ye", "yo",
  "za", "zi", "zu", "ze", "zo",
];
