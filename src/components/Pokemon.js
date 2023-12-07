import React, {useEffect, useState} from 'react';
import axios from "axios";

function Pokemon(props) {

    const [pokeImg, setPokeImg] = useState()

    useEffect(() => {
        axios.get(props.url)
            .then(response => {
                setPokeImg(response.data.sprites.front_default)
            })
    }, [props.url]);

    return (
        <>
            <h1>{props.name}</h1>
            <img src={pokeImg} alt=""/>
        </>
    );
}

export default Pokemon;