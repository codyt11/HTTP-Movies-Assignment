import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
}

export const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push, goBack } = useHistory();

    useEffect(() =>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            console.log(res);
            setMovie(res.data);
        })
        .catch((err)=>
        console.error("moviesById failed", err.message)
        );
    }, [id]);

    const changeHandler = (e) => {
        e.persist();
        e.target.name === 'stars' ? setMovie({...movie, stars: e.target.value.split(',')}) :
       
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then((res) => {
            console.log(res);
            setMovie(res.data);
            document.querySelector("form").reset();
            push('/')
        })
        .catch(err => 
            console.error("submit failed", err.message)
            );
    };

    return(
        <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="MetaScore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />

        <button  type = "submit" className="md-button form-button">Update</button>
      </form>
    </div>
    );
}