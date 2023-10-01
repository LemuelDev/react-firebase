
import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import {auth, db, storage} from './config/firebase'
import {getDocs, collection, addDoc,} from 'firebase/firestore'
import Render from './components/Render'
import {ref, uploadBytes} from 'firebase/storage'


function App() {
  const [movieList, setMovieList] = useState([])
  const movieCollectionRef= collection(db, "movies")

  // creating movies
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newMovieRating, setNewMovieRating] = useState(0)
  const [newMovieReleaseDate, setnewMovieReleaseDate] = useState(0)

  // upload file
  const [fileUpload, setFileUpload] = useState(null)


  const getMovieList = async() => {
    try{
      const data = await getDocs(movieCollectionRef)
      const finalData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMovieList(finalData)
    }catch(err){
      console.log(err);
      }
  }

  useEffect(() => {
     getMovieList();
  }, [])


  const addMovie = async () => {
    try{
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        rating: newMovieRating,
        userId: auth?.currentUser?.uid,
        })
        getMovieList();
        clearInputs()
    }catch(err){
      console.log(err);
    }
  }


  const clearInputs = () => {
    setNewMovieTitle('')
    setNewMovieRating('')
    setnewMovieReleaseDate('')
  }

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }
    try {
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
      await uploadBytes(filesFolderRef, fileUpload)
    }catch(err) {
      console.log(err);
    }
  }


  return (
    <>
     <Auth/>

     <div className='create-movie'>

      <h4>Creating and Adding a movie...</h4>
      <input
       type="text" 
       placeholder='Enter title..'
       onChange={(e) => setNewMovieTitle(e.target.value)}
       value={newMovieTitle}
       />
      <input 
      type="number" 
      placeholder='Rating'
      min={1}
      max={10}
      onChange={(e) => setNewMovieRating(Number(e.target.value))}
      value={newMovieRating}/>
      
      <input 
      type="number" 
      placeholder='Enter Release Date...'
      pattern='[0-9]{4}'
      onChange={(e) => setnewMovieReleaseDate(Number(e.target.value))}
      value={newMovieReleaseDate}/>
      <button onClick={addMovie}>Submit</button>
     </div>

     <br />
     <br />

     <div className='render-movie'>
      <h4>Render The Data using Map</h4>
      {movieList.map((movie) => (
        <Render 
        key={movie.id}
        movie={movie}
        setMovieList={setMovieList}
        />
        ))}
      </div>

      <br />
      <br />

      <div>
        <h4>Upload File using Firebase Cloud Storage...</h4>
        <div>
          <input 
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])} />
          <button onClick={uploadFile}>Submit</button>
        </div>
      </div>
 
    </>
  )
}

export default App
