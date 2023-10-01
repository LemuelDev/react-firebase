import { useState } from "react"
import PropTypes from 'prop-types'
import {db} from '../config/firebase'
import { deleteDoc, updateDoc, doc} from 'firebase/firestore'


const Render = ({movie, setMovieList}) => {

    const [updatedTitle, setUpdatedTitle] = useState('')
    

    const handleUpdateTitle = () => {
        updateMovieTitle(movie.id, updatedTitle)
        setUpdatedTitle('')
    }

    
  const deleteMovie = async (id) => {
    try{
        const movieDoc = doc(db, "movies", id)
        await deleteDoc(movieDoc)
        setMovieList((prevMovieList) =>
        prevMovieList.filter((movie) => movie.id !== id)
    );
    }catch(err){
        console.log(err);
    }
  }
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });
      setMovieList((prevMovieList) =>
        prevMovieList.map((movie) => {
          if (movie.id === id) {
            return { ...movie, title: updatedTitle };
          } else {
            return movie;
          }
        })
      );
      setUpdatedTitle('')
    } catch (error) {
      console.log(error);
    }
   
  };
  return (
   <>
    <div key={movie.id}>
            <h4 style={{ color: movie.rating > 7 ? 'Blue' : 'Green' }}> {movie.title}</h4>
            <p>Rating: {movie.rating}/10</p>
            <p><i>Release Date: {movie.releaseDate}</i></p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
            type="text" 
            placeholder='Enter new Title' 
            onChange={(e) => setUpdatedTitle(e.target.value)} 
            value={updatedTitle}
            id={movie.id}/>
            <button onClick={handleUpdateTitle}>Update</button>
        </div>
   </>
  )
}

export default Render

Render.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      releaseDate: PropTypes.number.isRequired,
    }).isRequired,
    setMovieList: PropTypes.func.isRequired,
  };
