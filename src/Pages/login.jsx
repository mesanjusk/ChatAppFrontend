import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function login() {
    const navigate = useNavigate();

    const [User_name,setUser_Name]=useState('')
    const [Password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/user/login",{
                User_name,Password
            })
            .then(res=>{
                if(res.data=="exist"){
                    navigate("/allOrder",{state:{id:User_name}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
       <h1>Login</h1>

<form action="POST">
                <div className="mb-3">
                    <label htmlFor="Username"><strong>User Name</strong></label>
                <input type="Username" autoComplete="off" onChange={(e) => { setUser_Name(e.target.value) }} placeholder="User Name" className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" autoComplete="off" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="form-control rounded-0" />
                </div>
 
    <button type="submit" onClick={submit} className="btn btn-success w-100 rounded-0">Submit</button>

</form>
</div>
    </div>
  )
}
