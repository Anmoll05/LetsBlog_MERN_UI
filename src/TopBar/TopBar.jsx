import React from 'react'
import { Link } from 'react-router-dom';
import "./topbar.css"
import { useContext ,useEffect} from "react";
import { Context } from "../context/Context";
import { useHistory } from 'react-router-dom';
export default function TopBar() {
    const {user,dispatch}=useContext(Context);
    const history = useHistory();
   // const PF="http://localhost:5000/images/";
    const PF="https://letusblogg.herokuapp.com/images/";
    const handlelogout=()=>{
        dispatch({type:"LOGOUT_USER"});
       history.push("/login");
    }
    useEffect(() => {
        
        return () => {
            console.log(user);
        }
    }, [user]);
    
    
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/" >HOME</Link>
                    </li>
                    {user && <li className="topListItem"><Link className="link" to={`/?user=${user.username}`} >MY POSTS</Link></li> }
                    {/* <li className="topListItem"><Link className="link" to="/" >CONTACT</Link></li> */}
                    <li className="topListItem"><Link className="link" to="/write" >WRITE</Link></li>
                    <li className="topListItem" onClick={handlelogout}>{user && "LOGOUT"}</li>
                </ul>
            </div>
            <div className="topRight">
                <Link className="link" to="/settings">
                {user ? (<img
                    className="topImg"
                    src={PF+user.profilePic }
                    onError={(e)=>{e.target.onerror = null; e.target.src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}}
                   
                    alt="" />) : (<ul className="topList">
                        <li className="topListItem">
                        <Link className="link" to="/login" >LOGIN</Link></li>
                        <li className="topListItem"><Link className="link" to="/register" >REGISTER</Link>
                        </li>
                        </ul>)
                }
                </Link>
                

                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
