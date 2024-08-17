import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function AddOrder() {
    const navigate = useNavigate();

    const [Customer_name,setCustomer_Name]=useState('')
    const [Delivery_Date,setDelivery_Date]=useState('')
    const [Priority,setPriority]=useState('')
    const [Item,setItem]=useState('')
    const [Task, setTask] = useState('');
    const [Assigned, setAssigned] = useState('');
    const [Remark, setRemark] = useState();
    const [customerOptions,setCustomerOptions]=useState([])
    const [taskOptions,setTaskOptions]=useState([])
    const [priorityOptions,setPriorityOptions]=useState([])
    const [itemOptions,setItemOptions]=useState([])
    const [userOptions,setUserOptions]=useState([])

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/customer/GetCustomersList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.Customer_name);
                    setCustomerOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching group options:", err);
            });
    }, []);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/taskgroup/GetTaskgroupList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.Task_group);
                    setTaskOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching group options:", err);
            });
    }, []);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/priority/GetPriorityList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.Priority_name);
                    setPriorityOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching group options:", err);
            });
    }, []);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/item/GetItemList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.Item_name);
                    setItemOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching group options:", err);
            });
    }, []);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/user/GetUserList")
            .then(res => {
                if (res.data.success) {
                    const options = res.data.result.map(item => item.User_name);
                    setUserOptions(options); 
                }
            })
            .catch(err => {
                console.error("Error fetching group options:", err);
            });
    }, []);

    async function submit(e){
        e.preventDefault();
        try{
            const response = await axios.post("https://chatappbackend-xgh0.onrender.com/order/addOrder",{
                Customer_name, Delivery_Date, Priority, Item, Task, Assigned, Remark
            });
            
            if (response.data.success) {
                alert(response.data.message);
                navigate("/home");
            } else {
                alert("Failed to add order");
            }
        
        }
        catch(e){
            console.log(e);

        }
    }


    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
           
            <div className="bg-white p-3 rounded w-25">
            <h2>Add Order</h2>

            <form action="POST">    
                <div className="mb-3">
                <label htmlFor="name"><strong>Customer Name</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setCustomer_Name(e.target.value)} value={Customer_name}>
                            <option value="">Select Customer</option>
                           
                               { customerOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="deliverydate"><strong>Delivery Date</strong></label>
                <input type="date" autoComplete="off" onChange={(e) => { setDelivery_Date(e.target.value) }} placeholder="Delivery Date" className="form-control rounded-0" />
                </div>

                <div className="mb-3">
                <label htmlFor="priority"><strong>Priority Name</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setPriority(e.target.value)} value={Priority}>
                            <option value="">Select Priority</option>
                           
                               { priorityOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>

                <div className="mb-3">
                <label htmlFor="item"><strong>Item Name</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setItem(e.target.value)} value={Item}>
                            <option value="">Select Item</option>
                           
                               { itemOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>

                <div className="mb-3">
                <label htmlFor="task"><strong>Task Name</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setTask(e.target.value)} value={Task}>
                            <option value="">Select Task</option>
                           
                               { taskOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>

                <div className="mb-3">
                <label htmlFor="assigned"><strong>Assigned</strong></label>
                <select className="form-control rounded-0" onChange={(e) => setAssigned(e.target.value)} value={Assigned}>
                            <option value="">Select User</option>
                           
                               { userOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))
                            }
                        </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="remark"><strong>Remark</strong></label>
                <input type="remark" autoComplete="off" onChange={(e) => { setRemark(e.target.value) }} placeholder="Remark" className="form-control rounded-0" />
                </div>


                <button type="submit" onClick={submit} className="btn btn-success w-100 rounded-0"> Submit </button>

            </form>
            </div>
        </div>
    );
}

