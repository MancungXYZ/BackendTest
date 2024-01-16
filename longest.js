//studi kasus
//Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

const sentence = "Saya sangat senang mengerjakan soal algoritma"

const kataKata = sentence.split(' ');

  // Inisialisasi variabel untuk menyimpan string terpanjang
  let stringTerpanjang = '';

  // Iterasi melalui setiap kata dalam array
  for (let i = 0; i < kataKata.length; i++) {
    // Jika panjang kata saat ini lebih besar dari panjang stringTerpanjang
    if (kataKata[i].length > stringTerpanjang.length) {
      // Perbarui stringTerpanjang
      console.log(kataKata[i])
      stringTerpanjang = kataKata[i];
    }
  }

  console.log(stringTerpanjang, ":", stringTerpanjang.length, "character")