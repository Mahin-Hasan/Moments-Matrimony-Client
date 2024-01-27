import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";


const CheckOutFrom = ({ id }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(id);


    const amoutPerRequest = 500;

    //use effect for connecting to server side
    useEffect(() => {
        if (amoutPerRequest > 0) {
            axiosSecure.post('/create-payment-intent', { price: amoutPerRequest })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, amoutPerRequest])


    const handleSubmit = async (e) => {
        e.preventDefault();


        //stripe setup from docs
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'not mention',
                    name: user?.displayName || 'not mention'
                }
            }
        })

        if (confirmError) {
            console.log('Inside error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const invoice = {
                    date: new Date(),
                    email: user.email,
                    requesterName: user.displayName,
                    price: amoutPerRequest,
                    requestedID: id,
                    transactionId: paymentIntent.id,
                    order: 'pending'
                }

                const res = await axiosSecure.post('/invoice', invoice);
                console.log('Invoice details', res.data);
                // refetch();
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Contact Information requested successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/contactRequest')
                }

            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-evenly my-7 text-lg">
                <h1>Requseted BioData Id {id}</h1>
                <h1>Requester Name: {user.displayName}</h1>
                <h1>Requester Email: {user.email}</h1>
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <span className="flex justify-center">
                <button className="flex items-center px-6 py-3 font-semibold rounded-full bg-gray-800 text-gray-100 mt-10" type="submit" disabled={!stripe || !clientSecret}>
                    Make Payment
                    <FaDollarSign className="ml-3" />
                </button>
            </span>
            <p className="text-red-600 mt-5 font-semibold">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutFrom;