// Encontrando o menor e o maior número
// em uma série
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

// E se os números estivessem dentro de um vetor?
let nums = [2, -7, 8, 4, 0]

// Passando o vetor para Math.min() e Math.max()
//minimo = Math.min(nums)   // NÃO FUNCIONA
//maximo = Math.max(nums)   // NÃO FUNCIONA

// A sintaxe de espalhamento ou spreading (representada 
// por ...antes da variável) é capaz de "desempacotar"
// um vetor em uma série de valores avulsos
minimo = Math.min(...nums)
maximo = Math.max(...nums)

console.log({minimo, maximo})

console.log('Vetor "empacotado":', nums)
console.log('Vetor "desempacotado":', ...nums)

/****************************************************/

let carro1 = {
  modelo: 'Fiorino',
  marca: 'Fiat',
  ano: 1984,
  cor: 'bege'
}

// Copiando carro1 para carro2
// let carro2 = carro1   // NÃO FUNCIONA

// Usando o espalhamento para duplicar corretamente um objeto
let carro2 = {...carro1}

// Mudando o valor das propriedades de carro2
carro2.marca = 'Chevrolet'
carro2.modelo = 'Opala'
carro2.cor = 'preto'
carro2.ano = 1979

console.log({carro1, carro2})

/****************************************************************/

// Problema: juntar dois ou mais vetores em um só
let frutas = ['maçã', 'banana', 'laranja']
let verduras = ['alface', 'couve', 'rúcula']

// Produzindo um vetor que contém tanto frutas quanto verduras
// let hortifruti = frutas + verduras  // NÃO FUNCIONA

// Método que funciona 1: JS Clássico
// let hortifruti = frutas.concat(verduras)

// Método que funciona 2: usando espalhamento
let hortifruti = [...frutas, ...verduras]

console.log({hortifruti})

/****************************************************/

// Problema: como declarar uma função capaz de receber
// um número arbitrário de argumentos?

console.log('Soma 7 números:', soma(1, 2, 3, 4, 5, 6, 7))
console.log('Soma 12 números:', soma(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12))

// O espalhamento também resolve esse tipo de problema.
// Quando usado em parâmetros de função, passa a ser chamado
// de PARÂMETRO DE RESTO.
function soma(...valores) {
  // Dentro da função, o parâmetro de resto se comporta
  // como um vetor
  let res = 0
  for(let valor of valores) res += valor
  return res
}  