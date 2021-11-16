import { useState , useEffect} from "react"
import Header from "../../Header/Header"
import Posts from "../../posts/Posts"
import Sidebar from "../../sidebar/Sidebar"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router"

export default function Home() {
    const[posts,setPosts]=useState([]);
    const {search} = useLocation();
    useEffect(()=>{
    const fetchPosts=async ()=>{
     const res = await axios.get("/posts"+search).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
    
      });
     setPosts(res.data);
     
    }
    fetchPosts();
    },[search])
    return (<>
    <Header/>
        <div className="home">
           
           <Posts posts={posts}/>
           <Sidebar/>
        </div>
        </>
    )
}
