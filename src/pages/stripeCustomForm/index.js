
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout";

const promise = loadStripe("pk_test_wdZBTp31ZdeWJZfKqTtzZwEH007HPGU8Og");

export default function Home() {
    return <div>
        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>
    </div>
}