import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../../context/context';
import './Checkout.scss'
const stripePromise = loadStripe('pk_test_51PX1pPGDSXLezO5fzuy3Z4QirvxjfqUYCUWOLlMGOd2JtZb68ufOEbf9UZPm4sRjh4qhucQLM5ZJhKXmD4IVqBbQ00pu9eaPNw');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [basket, setBasket] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { UserData, setUserData } = useContext(MainContext);

    useEffect(() => {
        const basketData = JSON.parse(localStorage.getItem('reservations')) || [];
        setBasket(basketData);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/payment/create-payment-intent', { amount: basket.reduce((total, item) => total + item.price * item.count, 0) * 100 });

            const { clientSecret } = response.data;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (paymentResult.error) {
                console.error('Payment error:', paymentResult.error);
                setError(paymentResult.error.message);
                setSuccess(false);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    const order = await createOrder();
                    if (order && UserData && UserData._id) {
                        await updateUserOrders(UserData, order);
                    }
                    setSuccess(true);
                    setError(null);
                    localStorage.removeItem('reservations');
                    navigate('/client/orderHistory');
                }
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            setError('Payment failed. Please try again.');
            setSuccess(false);
        }

        setLoading(false);
    };

    const createOrder = async () => {
        const orderData = {
            name: name,
            email: email,
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            total: basket.reduce((total, item) => total + item.price * item.count, 0),
            items: basket.map(item => ({
                roomId: item.roomId,
                quantity: item.count,
                price: item.price
            })),
            status: "Reserved",
            paymentStatus: "Completed",
            orderDate: new Date().toISOString(),
            paymentDate: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:8080/api/Order', orderData);
            console.log('Order created successfully:', response.data);
            return response.data; 
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    };

    const updateUserOrders = async (UserData, orders) => {
        console.log(orders);
        try {
            const updatedOrders = [...UserData.orders, orders[orders.length - 1]._id]; 
            const response = await axios.put(`http://localhost:8080/api/Users/${UserData._id}`, {
                orders: updatedOrders
            });

            if (response.data) {
                setUserData({
                    ...UserData,
                    orders: updatedOrders
                });
            }

            console.log('User orders updated successfully');
        } catch (error) {
            console.error('Error updating user orders:', error);
        }
    };

    return (
       <div className="container Checkout mt-5">
        <div className="row">
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='mb-5 mt-5'>
                <h3>Basket Items</h3>
                {basket.length > 0 ? (
                    basket.map((item, index) => (
                        <div key={index} className='basket-item mb-3'>
                            <h4>{item.hotelName}</h4>
                            <p>Room Type: {item.roomType}</p>
                            <p>Price: {item.formattedPrice}</p>
                            <p>Rating: {item.rating}</p>
                            <p>Count: {item.count}</p>
                        </div>
                    ))
                ) : (
                    <p>No items in the basket.</p>
                )}
            </div>

            <CardElement />
            <button className='btn btn-primary mt-3' type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Payment successful!</div>}
        </form>
        </div>
       </div>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
