export const ordenarPokes = (pokemons, [propiedad, criterio]) => {
  if(propiedad=== "sin Orden") return pokemons
  pokemons.sort((primerPoke, SegundoPoke) =>
    primerPoke[propiedad] > SegundoPoke[propiedad] ? 1 :
    primerPoke[propiedad] < SegundoPoke[propiedad] ? -1
    : 0
  )
  return criterio === 'mayorAMenor' ?  pokemons.reverse() : pokemons
}

export const filtrarPokes = (pokemons, tipoDePoke) => {
  return tipoDePoke ?
   pokemons.filter((pokemon) => {for(let type of pokemon.types){
    if(type.name === tipoDePoke) return true}}) :
   pokemons
}

export const PokesPorOrigen = (pokemons, propiedad) => { 
  return propiedad ?
   pokemons.filter((pokemon) => pokemon[propiedad]) :
   pokemons ? pokemons : []
}

