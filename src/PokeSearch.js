import React, { useState, useEffect } from 'react';
import PokeStatsView from './PokeStatsView';
import PokeListView from './PokeListView';
import styles from './App.module.css';

function PokeSearch() {
    //For displaying PokeStatsView
    const [pokemon, setPokemon] = useState('');
    const [pokedex, setPokedex] = useState({});
    const [pokedexType, setPokedexType] = useState(''); 
    const [pokedexSprite, setPokedexSprite] = useState(''); 
    const [viewstats, setViewstats] = useState(false);

    //For PokeListView
    const [pokelist, setPokelist] = useState([]);
    const [pokebatch, setPokebatch] = useState("https://pokeapi.co/api/v2/pokemon?limit=6");
    const [nextPokebatch, setNextPokebatch] = useState();
    const [prevPokebatch, setPrevPokebatch] = useState();
    const [spriteoffset, setSpriteoffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [nofind, setNofind] = useState(false);

    //Generates a batch of 6 pokemon to be selected
    useEffect(() => {
        setLoading(true);
        async function getPokelist() {
            try {
                const response = await fetch(pokebatch);
                const apiData = await response.json();
                setLoading(false);
                setPokelist(apiData.results.map(p => p.name));
                setNextPokebatch(apiData.next);
                setPrevPokebatch(apiData.previous)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getPokelist();
    }, [pokebatch]) //renders list when the pokebatch updates
    
    //Search for a specific Pokemon
    async function getPokesearch() {
        setLoading(true);
        try { 
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const apiData = await response.json();
            setLoading(false);
            setPokedex(apiData);
            setPokedexType(apiData.types[0].type.name);
            setPokedexSprite(apiData.sprites["front_default"]);
            setViewstats(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setNofind(true);
        }  
    }

    //View the next batch of Pokemon
    function nextbatch() {
        setPokebatch(nextPokebatch);
        setSpriteoffset(spriteoffset + 6);
        setNofind(false);
    }

    //View the previous batch of Pokemon
    function prevbatch() {
        setPokebatch(prevPokebatch);
        setSpriteoffset(spriteoffset - 6);
        setNofind(false);
    }

    //Hides/shows a Pokemon's stats when selected
    function viewstatsfalse() {
        setViewstats(false);
    }

    //Searches for Pokemon
    function handleSubmit() {
        getPokesearch();
        setNofind(false);
    }

    //Listens to the text input for data
    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase());
    }

    //Displays loading text when waiting for an API function
    if (loading) return (
        <p className={styles.dexScreen}>Loading...</p>
    )

    return (
        <div className={styles.dexScreen}>
            {nofind && <div><p>CAN NOT FIND POKEMON</p></div>}

            {/* Search Form */}
            {!viewstats && <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="pokemon" >Find your Pokemon: </label>
                <input type="text" id="poke" placeholder="e.g. Squirtle, Mew" onChange={handleChange} className={styles.input}/>
                <input type="submit" value="Search" className={styles.button}/>
            </form>}
            
            {/* List a batch of 6 Pokemon */}
            {!viewstats && <PokeListView
                pokelist={pokelist}
                spriteoffset={spriteoffset}
                nextbatch={nextPokebatch ? nextbatch : null}
                prevbatch={prevPokebatch ? prevbatch: null}
            />}

            {/* Show a Pokemon's stats */}
            {viewstats && <PokeStatsView
                name={pokedex.name}
                height={pokedex.height}
                weight={pokedex.weight}
                id={pokedex.id}
                type={pokedexType}
                sprite={pokedexSprite}
                viewstatsfalse={viewstatsfalse}
            />}
        </div>
    )
}

export default PokeSearch;