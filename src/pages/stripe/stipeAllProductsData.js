import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "1px 10px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
  cursor:"pointer",
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



export default function StipeAllProductsData() {

  const [loading, setLoading] = useState(false)
  const redirectToCheckout = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: `${id}`, quantity: 1 }],
      successUrl: `http://localhost:8000/stripe/payment-success`,
      cancelUrl: `http://localhost:8000/stripe/payment-error`,
    })
    if (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const PRODUCT_DATA=graphql`
  query MyQuery {
    allStripePrice {
      edges {
        node {
          product {
            id
            images
            name
            created
            description
          }
          unit_amount
          id
        }
      }
    }
  }
  `;
  const data = useStaticQuery(PRODUCT_DATA, {
      variables: {loading, },
      pollInterval: 500,
    })
  console.log(data.allStripePrice.edges)

  return (
    <div>

      {data.allStripePrice.edges.map(({ node }) => {
        return <div key={node.id}>
          {/* <p>{JSON.stringify(node)}</p> */}
          <h3>{node.product.name}</h3>
          <img
            src={node.product.images[0]}
            width={180}
            height={150}
            alt="product"
          />
          <p>{node.product.description}</p>
          <button
            disabled={loading}
            style={loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles}
            onClick={(e) => redirectToCheckout(e, node.id)}
          >
            CheckOut {(node.unit_amount).substring(0, (node.unit_amount).length - 1)}$
          </button>
          <br/>
          <br/>
        </div>
      })}

    </div>
  )
}
