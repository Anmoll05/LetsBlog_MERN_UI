import "./register.css"
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
export default function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[err,setErr]=useState(false);
    const history = useHistory();
    const handleSubmit= async (e)=>{
     e.preventDefault();
     setErr(false);
     var res;
     try{
         res =await axios.post("https://letusblogg.herokuapp.com/api/auth/register",{
            username,
            email,
            password
        });
        res.data && history.push("/login");
         
     }
     catch(err){
         console.log(err);
         setErr(true);
     }
     console.log(res);
    }

    return (
        <div className="register" >
            <span className="registerTitle">Register</span>
         <form  className="registerForm" onSubmit={handleSubmit}>
             <label >Username :</label>
             <input type="text"  onChange={e=>setUsername(e.target.value)} placeholder="Enter your username"/>
             <label >Email :</label>
             <input type="text" onChange={e=>setEmail(e.target.value)} placeholder="Enter your email"/>
             <label >Password :</label>
             <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/>
             <button className="registerButton" type="submit">Register</button>
         </form>
         <button className="registerLoginButton"><Link className="link" to="/login" >Login</Link></button>
         {

             err ? <span style={{color:"red"}}>Please try with different username  & email</span>:""
         }
        </div>
    )
}
