import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/home';
import AddCustomer from "./Pages/addCustomer";
import AddCustGroup from "./Pages/addCustomergroup";
import 'bootstrap/dist//css/bootstrap.min.css'
import AddUser from "./Pages/addUser";
import AddUserGroup from "./Pages/addUsergroup"; 
import AddItem from "./Pages/addItem";
import AddItemGroup from "./Pages/addItemgroup"; 
import AddTask from "./Pages/addTask";
import AddTaskGroup from "./Pages/addTaskgroup"; 
import AddPriority from "./Pages/addPriority";
import AddOrder from "./Pages/addOrder";
import AllOrder from "./Reports/allOrder";
import Login from "./Pages/login";
import OrderUpdate from "./Reports/orderUpdate";
import Footer from "./Pages/footer";
import TopNavbar from "./Pages/topNavbar";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/addCustomer" element={<AddCustomer />} />
                    <Route path="/addCustgroup" element={<AddCustGroup />} />
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/addUsergroup" element={<AddUserGroup />} />
                    <Route path="/addItem" element={<AddItem />} />
                    <Route path="/addItemgroup" element={<AddItemGroup />} />
                    <Route path="/addTask" element={<AddTask />} />
                    <Route path="/addTaskgroup" element={<AddTaskGroup />} />
                    <Route path="/addPriority" element={<AddPriority />} />
                    <Route path="/addOrder" element={<AddOrder />} />
                    <Route path="/allOrder" element={<AllOrder />} />
                    <Route path="/orderUpdate/:id" element={<OrderUpdate />} />
                    <Route path="/footer" element={< Footer /> } />
                    <Route path="/header" element={< TopNavbar />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
