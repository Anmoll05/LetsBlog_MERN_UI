import { useContext, useState } from "react"
import Sidebar from "../../sidebar/Sidebar"
import "./setting.css"
import {Context} from "../.././context/Context"
import axios from "axios";

export default function Settings() {
    const {user , dispatch} = useContext(Context);
    const[file,setFile]=useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    //const PF="http://localhost:5000/images/";
    const PF="https://letusblogg.herokuapp.com/images/";
    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser={
            userId: user._id,
            username,
            email,
            password
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() +file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic=filename;
        
     try{
        await  axios.post("/upload",data);
     }
     catch(err){

     }
    }
    try{
      const res =  await axios.put("/users/"+user._id,updatedUser);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data});
      alert("Profile has been updated");
      window.location.replace("/");
      
    }
    catch(err){
   dispatch({type:"UPDATE_FAILURE"});
    }
};
    return (
       <div className="settings">
           <div className="settingsWrapper">
               <div className="settingsTitle">
                   <span className="settingsUpdateTitle">Update your account</span>
                   <span className="settingsDeleteTitle">Delete your account</span>
                   
               </div>
               <form  className="settingsForm" onSubmit={handleSubmit}>
                   <label >Profile Picture</label>
                   <div className="settingsPP">
                       <img className=""
                        src={file ? URL.createObjectURL(file) :PF+user.profilePic}
 
                       alt="" />
                       <label htmlFor="fileInput">
                       <i className="settingsPPIcon far fa-user-circle"></i>
                       </label>
                       <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>

                   </div>
                   <label >Username</label>
                   <span style={{color:"red"}}>Can't be changed</span>
                   <input type="text" value={user.username}  onChange={e=>{setUsername(e.target.value)}}/>
                   <label >Email</label>
                   <span style={{color:"red"}}>Can't be changed</span>
                   <input type="email" value={user.email} onChange={e=>{setEmail(e.target.value)}}/>
                   <label >Password</label>
                   <input type="password"  onChange={e=>{setPassword(e.target.value)}} />
                   <button className="settingsSubmit" type="submit">Update</button>
               </form>
           </div>
           <Sidebar/>
       </div>
    )
}
