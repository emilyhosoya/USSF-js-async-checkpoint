const fs = require('fs')
const fetch = require('node-fetch')

const pokeApi = 'https://pokeapi.co/api/v2/pokemon/'
let pokemon = []

fs.readFile('pokemon.txt', 'utf8', (err, data) => {
    if (err) throw err;
    pokemon = data.split('\n')
    console.log(pokemon)
})


fetch(pokeApi)
    .then(response => response.json())
    .then(data => {
        for (i = 0; i <= pokemon.length - 1; i++) {
            let url = pokeApi + pokemon[i]
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let name = data.name
                    name = name.charAt(0).toUpperCase() + name.slice(1)
                    let types = data.types
                    let fullPoke = []
                    types.forEach(type => {
                        fullPoke.push(type.type.name)
                    })
                    fullPoke = fullPoke.join(', ')
                    console.log(`${name}: ${fullPoke}`)
                })
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))