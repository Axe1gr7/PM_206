

console.log("Hola mundo js desde el servidor")

// operaciones

//variable 
let edad1 = 11
//variable que se comporta como constante 
const edad2 = 42

//imprimimos el promedio de las edades 
console.log("edad promedio")
console.log((edad1+edad2)/2)

//medir tiempo de un proceso 
//aqui declaramos la variable y se inicialZa el tiempo 
console .time('miproceso')
//este ciclo es el que se tiene que contar
    for(let i=0; i < 1000000; i++)
    {

    }
//aqui se determina la culminacion del tiempo 
console.timeEnd('miproceso')


// objetos tipo tabla 
let usuarios= [
    {nombre: "axelgr", edad:21},
    {nombre: "chabela", edad:20}
]
console.table(usuarios)