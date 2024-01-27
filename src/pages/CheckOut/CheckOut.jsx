import { useParams } from 'react-router-dom';
import TitleCaption from '../../components/TitleCaption/TitleCaption';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from '../CheckOutForm/CheckOutFrom';


//trying stripe js
const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const CheckOut = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <TitleCaption title={'Check Out Form'}></TitleCaption>
            <h1>params: {id}</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom id={id}></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;