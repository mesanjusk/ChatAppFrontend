import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Pages/footer";
import TopNavbar from "../Pages/topNavbar";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export default function AllOrder() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [searchOrder, setSearchOrder] = useState("");
    const [filter, setFilter] = useState("");
    const [tasks, setTasks] = useState([]);

    function addOrder() {
        navigate("/addOrder");
    }
    
    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/order/GetOrderList")
            .then(res => {
                if (res.data.success) {
                    setOrders(res.data.result);
                } else {
                    setOrders([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("https://chatappbackend-xgh0.onrender.com/taskgroup/GetTaskgroupList")
            .then(res => {
                if (res.data.success) {
                    setTasks(res.data.result);
                } else {
                    setTasks([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const taskOptions = [...new Set(tasks.map(task => task.Task_group))];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.Customer_name.toLowerCase().includes(searchOrder.toLowerCase());
        const matchesFilter = filter === "" || tasks.some(task => task.Task_group === filter && task.Task_group === order.Task);
    
        return matchesSearch && matchesFilter;
    });
    

    const handleEditClick = (order) => {
        navigate(`/orderUpdate/${order._id}`);
    };

    return (
        <>
            <div>
                <TopNavbar />
                <div className="flex flex-col w-90 max-w-md p-2 mx-auto">
                    <input
                        type="text"
                        placeholder="Search by Customer Name"
                        className="form-control mb-3"
                        value={searchOrder}
                        onChange={(e) => setSearchOrder(e.target.value)}
                    />

                    <div className="d-flex flex-wrap mb-3">
                        <button
                            onClick={() => setFilter("")}
                            className={`btn ${filter === "" ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                        >
                            All
                        </button>
                        {taskOptions.map((taskGroup, index) => (
                            <button
                                key={index}
                                onClick={() => setFilter(taskGroup)}
                                className={`btn ${filter === taskGroup ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                            >
                                {taskGroup}
                            </button>
                        ))}
                    </div>
                </div>
                <main className="flex flex-1 p-1 overflow-y-auto"> 
                    <div className="flex flex-col w-100 space-y-2 max-w-md mx-auto"> 
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <div key={index}>
                                    <div onClick={() => handleEditClick(order)} className="flex items-center  p-1 bg-white rounded-lg shadow-md">
                                        <div className="w-10 h-10 bg-blue-100 text-Black rounded-full shadow-lg flex items-center justify-center"> {order.Order_Number}</div>
                                        <div className="p-2 w-70 basis-1/2">
                                            <strong className="text-xl-blue-900">{order.Customer_name}</strong>
                                            <br />{order.Remark}
                                        </div>
                                        <div className="w-20 h-10 bg-blue-100 flex-1 ... basis-1/6 text-Black p-2 rounded flex items-center justify-center">{order.Assigned}</div>
                                        <div className="w-10 h-10 bg-blue-400  text-Black p-1 rounded-full flex items-center justify-center"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No orders found</div>
                        )}
                    </div>
                </main>
                <div className="fixed bottom-16 right-4">
                    <button onClick={addOrder} className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center">
                        +
                    </button>
                </div>
            </div>

        </>
    );
}
