import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function AddCustomer() {
    const navigate = useNavigate();

    const [Customer_name,setCustomer_Name]=useState('')
    const [Mobile_number,setMobile_Number]=useState('')
    const [Customer_group,setCustomer_Group]=useState('')
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/customergroup/GetCustomergroupList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.Customer_group);
                    setGroupOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching gender options:", err);
            });
    }, []);

    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("https://chatappbackend-xgh0.onrender.com/customer/addCustomer",{
                Customer_name, Mobile_number, Customer_group
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("Customer already exists")
                }
                else if(res.data=="notexist"){
                    alert("Customer added successfully")
                    navigate("/home")
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
            <h2>Add Customer</h2>

            <form action="POST">
                <div className="mb-3">
                    <label htmlFor="customername"><strong>Customer Name</strong></label>
                <input type="customername" autoComplete="off" onChange={(e) => { setCustomer_Name(e.target.value) }} placeholder="Customer Name" className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                <label htmlFor="mobilenumber"><strong>Mobile Number</strong></label>
                <input type="mobilenumber" autoComplete="off" onChange={(e) => { setMobile_Number(e.target.value) }} placeholder="Mobile Number" className="form-control rounded-0" />
                </div>                
                <div className="mb-3">
                <label htmlFor="customergroup"><strong>Customer Group</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setCustomer_Group(e.target.value)} value={Customer_group}>
                            <option value="">Select Group</option>
                           
                               { groupOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>
                <button type="submit" onClick={submit} className="btn btn-success w-100 rounded-0"> Submit </button>

            </form>
            </div>
        </div>
    );
}

