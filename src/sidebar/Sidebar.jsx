import React, { useEffect, useState } from 'react'
import  "./sidebar.css"
import axios from "axios";
import { Link } from 'react-router-dom';
export default function Sidebar() {
    const [cat,setCat]=useState([]);
    useEffect(()=>{
        const getCat = async () => {
            const res = await axios.get("/categories" );
            setCat(res.data);
        }
        getCat();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <br></br>
                    <img src="https://i2.wp.com/allpicts.in/wp-content/uploads/2016/05/3d-nature-images-hd-300x188.jpg"
                    alt=""
                    />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, ratione consequatur! Nihil iure facilis nam quisquam porro aut consequuntur odit quidem maiores suscipit.</p>
                
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cat.map((c)=>(
                            <Link className="link" to={`/?cat=${c.name}`}>
                            <li className="sidebarListItem">{c.name}</li>
                            </Link>
                        ))
                    }
                    {/* <li className="sidebarListItem">Life</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Style</li>
                    <li className="sidebarListItem">Sport</li>
                    <li className="sidebarListItem">Tech</li>
                    <li className="sidebarListItem">Cinema</li> */}
                    

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-facebook-square"></i>
                </div>
                </div>
        </div>
    )
}
