import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [values, setValues] = useState({
        id: id,
        Customer_name: '',
        Delivery_Date: '',
        Assigned: '',
        Task: ''
    });

    useEffect(() => {
        axios.get(`https://chatappbackend-xgh0.onrender.com/order/${id}`)
            .then(res => {
                if (res.data.success) {
                    setValues({
                        id: id,
                        Customer_name: res.data.result.Customer_name || '',
                        Delivery_Date: res.data.result.Delivery_Date.split('T')[0] || '', 
                        Assigned: res.data.result.Assigned || '',
                        Task: res.data.result.Task || ''
                    });
                }
            })
            .catch(err => console.log('Error fetching order data:', err));
    }, [id]);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/order/GetOrderList")
            .then(res => {
                if (res.data.success) {
                    setOrders(res.data.result);
                } else {
                    setOrders([]);
                }
            })
            .catch(err => console.log('Error fetching order list:', err));
    }, []);

    const orderOptions = [...new Set(orders.map(order => order.Assigned))];
    const customerOptions = [...new Set(orders.map(order => order.Customer_name))];
    const taskOptions = [...new Set(orders.map(order => order.Task))];

    const handleSaveChanges = () => {
        const formattedDate = values.Delivery_Date.split('-').reverse().join('-');

        const updatedValues = {
            ...values,
            Delivery_Date: formattedDate
        };
        navigate("/allOrder");


        axios.put(`https://chatappbackend-xgh0.onrender.com/order/updateOrder/${id}`, updatedValues)
            .then(res => {
                if (res.data.success) {
                    alert('Order updated successfully!');
                    navigate("/allOrder")
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        
        <div className="bg-gray-100 p-4 flex-1 ... basis-1/1 w-90 h-screen">
           
             <header className="bg-blue-100 flex overflow-y-auto text-black p-2 shadow-md">
        <h2 className="text-xl font-bold">{values.Customer_name}</h2>
        <div className="w-10 h-10 bg-blue-400  flex-4  basis-1/1 text-Black p-1 rounded-full "></div>
      </header>
            
            <div >
           
            <div className="bg-white p-3  ">
           
            <form action="POST">
            <div className="flex flex-col space-y-4">
                   
                   
                    <div className="self-start bg-white p-2 w-100 rounded-lg max-w-xs">
                    Update Status <select 
                    className="form-control rounded-0"
                    value={values.Task}
                    onChange={(e) => setValues({ ...values, Task: e.target.value })}
                >
                    <option value="">SelectTask</option>
                    {taskOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                    </div>
                    <div className="self-start bg-white p-2 w-100 rounded-lg max-w-xs">
           Update User 
            <select 
                    className="form-control rounded-0"
                    value={values.Assigned}
                    onChange={(e) => setValues({ ...values, Assigned: e.target.value })}
                >
                    <option value="">Select User</option>
                    {orderOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                </div>
                <div className="self-start bg-white p-2 rounded-lg max-w-xs">
                        <input 
                            type="date"  
                            value={values.Delivery_Date} 
                            onChange={(e) => setValues({ ...values, Delivery_Date: e.target.value })} 
                            placeholder="Delivery Date"
                        />
                    </div>
                <button onClick={handleSaveChanges} type="submit"  className="btn bg-blue-500 w-100 text-white rounded-0"> Submit </button>
                
                </div>
            </form>
        </div>
        <div className="fixed bottom-16 left-8">
                    <button  className="w-24 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center">
                        UPDATE
                    </button>
                </div>

                <div className="fixed bottom-16 right-8">
                    <button  className="w-24 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center">
                        INVOICE
                    </button>
                </div>
        </div>
        </div>
       
        
    );
}
