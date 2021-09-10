import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './stripeCustomForm';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const res = await fetch('/.netlify/functions/payment');
    const data = await res.json();

    console.log(data);
    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log(result.paymentIntent)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}






// import React, { useState, useEffect } from "react";
// import { CardElement,  useStripe,  useElements } from "@stripe/react-stripe-js";

// export default function CheckoutForm() {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState('');
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//         fetch("/.netlify/functions/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
//       })
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         setClientSecret(data.clientSecret);
//       });
//   }, []);

//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     }
//   };

//   const handleChange = async (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   const handleSubmit = async ev => {
//     ev.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement)
//       }
//     });

//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
//       <button
//         disabled={processing || disabled || succeeded}
//         id="submit"
//       >
//         <span id="button-text">
//           {processing ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Pay now"
//           )}
//         </span>
//       </button>
//       {/* Show any error that happens when processing the payment */}
//       {error && (
//         <div className="card-error" role="alert">
//           {error}
//         </div>
//       )}
//       {/* Show a success message upon completion */}
//       <p className={succeeded ? "result-message" : "result-message hidden"}>
//         Payment succeeded, see the result in your
//         <a
//           href={`https://dashboard.stripe.com/test/payments`}
//         >
//           {" "}
//           Stripe dashboard.
//         </a> Refresh the page to pay again.
//       </p>
//     </form>
//   );
// }
