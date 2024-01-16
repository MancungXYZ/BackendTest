//studi kasus
//Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']

const output = []
const intersection = QUERY.forEach(element => {
    output[element] = INPUT.filter(value => value == element).length
});

console.log(output)