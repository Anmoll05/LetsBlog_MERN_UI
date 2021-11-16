import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./singlePost.css";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    //const PF = "http://localhost:5000/images/"
    const PF="https://letusblogg.herokuapp.com/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("https://letusblogg.herokuapp.com/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]);
    const handleEdit=(e)=>{
    setUpdateMode(true);
    }
    const handleUpdate=async()=>{
        try{
            await axios.put(`/posts/${post._id}`,{username:user.username , title,desc});
            setUpdateMode(false);
        }
        catch(err){

        }
    
    }
    const handledelete= async ()=>{
        try{
            await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
            window.location.replace("/");
        }
        catch(err){

        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img className="singlePostImg"

                    src={PF+post.photo}
                    alt="" />)}{
                        updateMode ? <input type="text" className="writeInput"  autoFocus value={title} onChange={(e)=>{setTitle(e.target.value)}}/> :( <h1 className="singlePostTitle">
                        {title}{
                            post.username===user?.username && (  <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit" onClick={handleEdit}></i>
                            <i className="singlePostIcon far fa-trash-alt" onClick={handledelete}></i>
                        </div>)
                        }
                      
                    </h1>)
                    }

               
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author : 
                        <Link className="link" to={`/?user=${post.username}`}>
                        <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode ? <textarea  typeof="text" value={desc}className="writeInput writeText" onChange={(e)=>{setDesc(e.target.value)}}
                    ></textarea>: <p className="singlePostDesc">{desc}</p>}
               {
                   updateMode? <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                :""
               }
          
            </div>
        </div>
    )
}
