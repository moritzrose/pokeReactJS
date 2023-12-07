import React, {useEffect, useState} from 'react';
import Pokemon from "./Pokemon";
import axios from "axios";

function PokemonList() {

    const [data, setData] = useState([])
    const [showData, setShowData] = useState([])
    const [pageIndex, setPageIndex] = useState(1)


    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then(response => {
                setData(response.data.results)
                pokemonList(pageIndex)
                //setShowData(response.data.results.slice(0,5))
            })
    }, []);

    function pokemonList(pageId) {
        setShowData(data.slice((pageId - 1) * 5, pageId * 5))
        //console.log(showData)
    }

    return (
        <>
            {showData.map((pokemon, index) => (
                <Pokemon key={index} name={pokemon.name} url={pokemon.url}/>
            ))}
            <hr/>
            <button onClick={() => {
                if (pageIndex > 1) {
                    setPageIndex(pageIndex - 1)
                    console.log(pageIndex)
                    pokemonList(pageIndex)
                }
            }}><strong>&lt;</strong>   </button>
            <button onClick={() => {
                if (pageIndex < Math.ceil(data.length/5)) {
                    setPageIndex(pageIndex + 1)
                    console.log(pageIndex)
                    pokemonList(pageIndex)
                }
            }}><strong>&gt;</strong></button>
        </>
    );
}

export default PokemonList;