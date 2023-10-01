import { useState } from "react"
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const signIn = async () => {
       try {
            await createUserWithEmailAndPassword(auth, email, password)
            setIsLogin(true)
        }catch(err){
            console.error(err)
        }
            
    }

    const signInWithGoogle = async () => {
        try {
             await signInWithPopup(auth, googleProvider)
             setIsLogin(true)
         }catch(err){
             console.error(err)
         }
             
     }
     const logoutUser= async () => {
        try {
             await signOut(auth)
             setIsLogin(false)
         }catch(err){
             console.error(err)
         }
             
     }

  return (
    <div>
        <h4>React and Firebase</h4>
        <input 
        type="email"
        placeholder="Enter Email..."
        onChange={(e) => setEmail(e.target.value)} />
        <input 
        type="password"
        placeholder="Enter Password..."
        onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logoutUser}>Logout</button>
        {isLogin ? <p>Welcome, {email}</p> : <p>Sign up now!!!</p>}
    </div>
  )
}

export default Auth