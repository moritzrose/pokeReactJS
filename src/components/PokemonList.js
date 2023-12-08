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
                pokemonList(pageIndex) // call the method after data is set
                //setShowData(response.data.results.slice(0,5))
            })
    }, []);

    // By using another useEffect hook that watches changes in pageIndex, we ensure that
    // pokemonList gets called whenever pageIndex changes, reflecting the updated value
    // in showData.
    useEffect(() => {
        pokemonList(pageIndex) // call pokemonList whenever pageIndex changes
    }, [pageIndex])



    function pokemonList(pageId) {
        setShowData(data.slice((pageId - 1) * 5, pageId * 5))
        //console.log(showData)
    }

    return (
        <>
            {/*Add conditional rendering to showData - otherwise on inital loading no data is shown! */}
            {/*// TODO: (side note: showData can probably be eliminated as state as it is only needed to slice the data */}

            {showData ? showData.map((pokemon, index) => (
                <Pokemon key={index} name={pokemon.name} url={pokemon.url}/>
            )) :  <p>Loading data...</p>}
            <hr/>
            <button onClick={() => {
                if (pageIndex > 1) {
                    // Here was our problem: The call to setPageIndex (useState Hook) is async - so
                    // the call to pokeMonList below can be faster (and this is the case! so I dropped that
                    // manual call and used a new useEffect instead )
                    setPageIndex(pageIndex - 1)
                    console.log(pageIndex)
                    // pokemonList(pageIndex)
                }
            }}><strong>&lt;</strong>   </button>
            <button onClick={() => {
                if (pageIndex < Math.ceil(data.length/5)) {
                    // same thing as in the first if statement - see comment above 👆
                    setPageIndex(pageIndex + 1)
                    console.log(pageIndex)
                    // pokemonList(pageIndex)
                }
            }}><strong>&gt;</strong></button>
        </>
    );
}

export default PokemonList;
