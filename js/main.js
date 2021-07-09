// Import files
const fs = require('fs')
const path = require('path')
const basePath = './assets/'

// Reading one file
/*
console.log('Begin')
const content = fs.readFileSync(path.resolve(basePath, 's1.txt'))
console.log(content.toString())
console.log('End')
*/
// Reading multiple files
/*
console.log('Begin')
const files = fs.readdirSync(path.resolve(basePath))
const sentences = files.filter((file) => /s[1-4].txt/gi.test(file))

for (const sentence of sentences){
    const text = fs.readFileSync(path.resolve(basePath, sentence)).toString()
    console.log(text)
}
console.log('End')
*/

// Creating a callback function
function cb(err, data) {
    if (err) throw err
    console.log(data)
}

// Reading one file with cb function
/*
console.log('Begin')
fs.readFile(path.resolve(basePath, 'lyr.txt'), {encoding: 'utf-8'}, cb)
console.log('End')
*/

// Reading multiple files with cb function
/*
console.log('Begin')
const files = fs.readdirSync(path.resolve(basePath))
const sentences = files.filter((file) => /s[1-4].txt/gi.test(file))

for (const file of sentences){
    fs.readFile(path.resolve(basePath, file), {encoding: 'utf-8'}, cb)
}
console.log('End')
*/

// Fazendo as chamadas sem criar um 'callback hell', sem promises
/*
console.log('Begin')
start(1, 4)

function cb2(err, data, index, max) {
    if (err) throw err
    console.log(data)
    return start(index+1, max)
}

function start(index, max){
    if (index > max) return console.log('End')
    fs.readFile(
        path.resolve(basePath, `s${index}.txt`),
        {encoding: 'utf-8'},
        (err,data) => cb2(err,data,index,max)
    )
}
*/

// Criando promises
/*
const promise = new Promise((resolve, reject) =>{
    setTimeout(()=> resolve('End'),2000)
})

console.log('Begin')

promise.then((data) => console.log(data))
promise.then(console.log)
*/

// Fazendo a leitura de arquivos com promises
/*
function readFileAsync (path, options) {
    return new Promise((resolve, reject) =>{
        fs.readFile(path, options, (err, data) =>{
            if (err) return reject(err)
            return resolve(data)
        })
    })
}

console.log('Begin')
readFileAsync(path.resolve(basePath, 'lyr.txt'), {encoding: 'utf-8'})
    .then(console.log)
    .catch(console.error)
console.log('End')
*/
// Fazendo a leitura de arquivos com promises, de outra maneira
/*const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)

console.log('Begin')
readFileAsync(path.resolve(basePath, 'lyr.txt'), {encoding: 'utf-8'})
    .then(console.log)
    .catch(console.error)
console.log('End')
*/

// Encadeamento de promises
/*
const coinFlip = new Promise((resolve, reject) => Math.random()> 0.5 ? resolve('Resolvido') : reject('Rejeitado'))

coinFlip.then((data) => console.log(data,'1'))
        .then(() => console.log('End 1'))
        .catch((err) => console.log('Erro 1'))
*/

// Locks
/*const coinFlip2 = new Promise((resolve, reject) => setTimeout(()=> Math.random()> 0.5 ? resolve('Resolvido') : reject('Rejeitado'), 2000))

const p = Promise.resolve('resolve').then(coinFlip2)

p.then(console.log).catch(()=> console.log('error'))
*/


// Garantindo a execuçao de uma parte do código depois da promise (com finally)
/*const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)

console.log('Begin')
readFileAsync(path.resolve(basePath, 'lyr.txt'), {encoding: 'utf-8'})
.then(console.log)
.catch(console.error)
.finally(()=> console.log('End'))
*/

// Executando todas as promises de uma vez (com all)
const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)

console.log('Begin')
function read(index){
    return readFileAsync(path.resolve(basePath, `s${index}.txt`), {encoding: 'utf-8'})
}

function start(index, max){
    if (index > max) return
    read(index).then((data) =>{
        console.log(data, '\n')
        start(index+1, max)
    })
}
/*
start(1,4)
*/
// Executando várias promises de outra forma

const promiseArray = []
for (let i = 1;i <= 4;i++) promiseArray[i-1] = read(i)

Promise.all(promiseArray).then((arr) => console.log(arr.join('\n')))


