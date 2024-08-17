import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {  
    const navigate = useNavigate();

    function addCustomer() {
        navigate("/addCustomer");
    }

    function addCustgroup() {
        navigate("/addCustgroup");
    }

    function addUser() {
        navigate("/addUser");
    }

    function addUsergroup() {
        navigate("/addUsergroup");
    }

    function addItem() {
        navigate("/addItem");
    }

    function addItemgroup() {
        navigate("/addItemgroup");
    }

    function addTask() {
        navigate("/addTask");
    }

    function addTaskgroup() {
        navigate("/addTaskgroup");
    }

    function addPriority() {
        navigate("/addPriority");
    }

    function addOrder() {
        navigate("/addOrder");
    }

    function allOrder() {
        navigate("/allOrder");
    }

    return (
        
        <div className="flex flex-col h-screen bg-gray-100">
              <header className="bg-blue-500 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">S K DIGITAL</h1>
      </header>
           {/* Main Content */}
      <main className="flex flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col w-full max-w-md mx-auto">
          {/* Chat List */}
          <div className="space-y-4">
            {/* Chat Item */}
            <div onClick={addCustomer} className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              Add Customer
                
              </div>
            </div>

            
            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              
              <button type='button' onClick={addPriority} className="">Add Priority</button>
              </div>
            </div>

           

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addTaskgroup} className="">Add Task  Group</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={allOrder} className="">All Order</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addOrder} className="">Add Order</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addTask} className="">Add Task</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addItemgroup} className="">Add Item Group</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addItem} className="">Add Item</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addUsergroup} className="">Add User Group</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addUser} className="">Add User</button>
                
              </div>
            </div>

            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              <button type='button' onClick={addCustgroup} className="">Add Customer Group</button>
                
              </div>
              
            </div>
            <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
              <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
              
                
              </div>
              
            </div>
           
           
           
            
         

          </div>
        </div>
      </main>
      
      <div className="relative">
      {/* Floating Action Button */}
      <div className="fixed bottom-16 right-4">
        <button onClick={addOrder}  className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center">
          +
        </button>
      </div>

      {/* Fixed Footer Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <div className="flex justify-around p-2">
          <button className="flex flex-col items-center">
            <span className="material-icons">home</span>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">search</span>
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">notifications</span>
            <span className="text-xs">Notifications</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">person</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
        </div>
        

        
    )
}
