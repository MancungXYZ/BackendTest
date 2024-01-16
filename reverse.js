//studi kasus
//Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

const inputString = "NEGIE1"

const alphabets = inputString.replace(/[^a-zA-Z]/g, '');
const numbers = inputString.replace(/[^0-9]/g, '');

// Reverse alfabet
const reversedAlphabets = alphabets.split('').reverse().join('');

// Gabungkan alfabet yang sudah di-reverse dengan angka
const result = reversedAlphabets + numbers;

console.log(result)