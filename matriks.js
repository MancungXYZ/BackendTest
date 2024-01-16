//studi kasus
//Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:

matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

const len = matrix.length;
  let diagonalPertama = 0;
  let diagonalKedua = 0;
  for (let i = 0; i < len; i++) {
    for (let k = 0; k < len; k++) {
      if (i === k) {
        console.log(matrix[i][k])
        diagonalPertama += matrix[i][k];
      }
      if (i + k == len - 1) {
        diagonalKedua += matrix[i][k];
      }

    }
  }

  console.log("diagonal pertama ", diagonalPertama)
  console.log("diagonal kedua", diagonalKedua)

  console.log("maka hasilnya adalah", diagonalPertama-diagonalKedua)