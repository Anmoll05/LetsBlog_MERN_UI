import "./login.css"
import { useContext, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
export default function Login() {
    const userRef=useRef();
    const passwordRef= useRef();
    const{user , dispatch , isFetching} = useContext(Context);
    //const[err,setErr]=useState(false);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(userRef);
       dispatch({type:"LOGIN_START"});
        var res;
        try{
            res =await axios.post("/auth/login",{
              
               username:userRef.current.value,
               password:passwordRef.current.value
           });
           dispatch({type:"LOGIN_SUCCESS", payload:res.data});
            
        }
        catch(err){
            console.log(err);
            dispatch({type:"LOGIN_FAILURE"});
        } 
       
       
    }
    console.log(isFetching);
    return (
        <div className="login" >
            <span className="loginTitle">Login</span>
         <form  className="loginForm" onSubmit={handleSubmit}>
             <label >Username :</label>
             <input type="text" ref={userRef} placeholder="Enter your username"/>
             <label >Password :</label>
             <input type="password" ref={passwordRef} placeholder="Enter your password"/>
             <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
         </form>
         <button className="loginRegisterButton"><Link className="link" to="/register" >Register</Link></button>
        </div>
    )

}
