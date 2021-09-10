
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../../components/layout";
import StipeAllProductsData from './stipeAllProductsData'

const buttonStyles = {
    fontSize: "13px",
    textAlign: "center",
    color: "#000",
    padding: "12px 60px",
    boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 178, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
}

const buttonDisabledStyles = {
    opacity: "0.5",
    cursor: "not-allowed",
}

let stripePromise
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_wdZBTp31ZdeWJZfKqTtzZwEH007HPGU8Og")
    }
    return stripePromise
}

const Payment = () => {

    const [loading, setLoading] = useState(false)
    const redirectToCheckout = async (e) => {
        e.preventDefault()
        setLoading(true)
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [{ price: "price_1JY42YAZdf6DzuCPuzVSmQom", quantity: 1 }],
            successUrl: `http://localhost:8000/stripe/payment-success`,
            cancelUrl: `http://localhost:8000/stripe/payment-error`,
        })
        if (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Layout>

            <h1>STRIPE</h1>

            <h2>Single Product Checkout</h2>
            <button
                disabled={loading}
                style={
                    loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
                }
                onClick={redirectToCheckout}
            >
                CheckOut
            </button>


            <br />
            <br />
            <h2>Get all Products Links through graphql from stripe</h2>
            <StipeAllProductsData />


            <br />
            <h1>Get Stripe</h1>

        </Layout>
    )
}

export default Payment