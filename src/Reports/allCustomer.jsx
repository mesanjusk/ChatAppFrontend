import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AllCustomer() {
    const [orders, setOrders] = useState([]);
    const [searchOrder, setSearchOrder] = useState("");
    const [filter, setFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/order/GetOrderList")
            .then(res => {
                if (res.data.success) {
                    setOrders(res.data.result);
                } else {
                    setOrders([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const orderOptions = [...new Set(orders.map(order => order.Assigned))];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.Customer_name.toLowerCase().includes(searchOrder.toLowerCase());
        const matchesFilter =
            (filter === "" || filter === order.Assigned);

        return matchesSearch && matchesFilter;
    });

    const handleEditClick = (order) => {
        setCurrentOrder(order);
        setShowModal(true);
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:8000/order/updateOrder/${currentOrder._id}`, currentOrder)
            .then(res => {
                if (res.data.success) {
                    setOrders(orders.map(order => order._id === currentOrder._id ? currentOrder : order));
                    setShowModal(false);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container my-5">
            <h3 className="text-center mb-4">All Orders</h3>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by customer name"
                    className="form-control mb-3"
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                />

                <div className="d-flex flex-wrap mb-3">
                    {orderOptions.map((order, index) => (
                        <button
                            key={index}
                            onClick={() => setFilter(order)}
                            className={`btn ${filter === order ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                        >
                            {order}
                        </button>
                    ))}
                    <button
                        onClick={() => setFilter("")}
                        className={`btn ${filter === "" ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                    >
                        All
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <div key={index} className="border p-3 mb-3 rounded" style={{ width: "75%" }}>
                            <div><strong>Customer Name:</strong> {order.Customer_name}</div>
                            <div><strong>Delivery Date:</strong> {order.Delivery_Date}</div>
                            <div><strong>Priority:</strong> {order.Priority}</div>
                            <div><strong>Item:</strong> {order.Item}</div>
                            <div><strong>Assigned:</strong> {order.Assigned}</div>
                            <div><strong>Remark:</strong> {order.Remark}</div>
                            <button className="btn btn-warning mt-2" onClick={() => handleEditClick(order)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <div>No orders found</div>
                )}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentOrder && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Customer_name}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Customer_name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Delivery Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Delivery_Date}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Delivery_Date: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Priority}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Priority: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Item</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Item}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Item: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Assigned</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Assigned}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Assigned: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Remark</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentOrder.Remark}
                                    onChange={(e) => setCurrentOrder({ ...currentOrder, Remark: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
