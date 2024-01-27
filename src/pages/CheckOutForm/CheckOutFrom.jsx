import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";


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

    }
    return (
        <form onSubmit={handleSubmit}>

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
            <button className="flex items-center px-6 py-3 font-semibold rounded-full bg-gray-800 text-gray-100 mt-10" type="submit" disabled={!stripe || !clientSecret}>
                Make Payment
                <FaDollarSign className="ml-3" />
            </button>
            <p className="text-red-600 mt-5 font-semibold">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutFrom;