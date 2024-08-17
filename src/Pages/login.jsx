import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [User_name, setUser_Name] = useState('');
    const [Password, setPassword] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('User_name');
        if (loggedInUser) {
            navigate("/allOrder", { state: { id: loggedInUser } });
        }
    }, [navigate]);

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("https://chatappbackend-xgh0.onrender.com/user/login", {
                User_name,
                Password
            })
            .then(res => {
                if (res.data === "exist") {
                    localStorage.setItem('User_name', User_name);
                    navigate("/allOrder", { state: { id: User_name } });
                } else if (res.data === "notexist") {
                    alert("User has not signed up");
                }
            })
            .catch(e => {
                alert("Wrong details");
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="Username"><strong>User Name</strong></label>
                        <input
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setUser_Name(e.target.value)}
                            placeholder="User Name"
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password"><strong>Password</strong></label>
                        <input
                            type="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Submit</button>
                </form>
            </div>
        </div>
    );
}
