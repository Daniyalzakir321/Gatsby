import React from 'react'
import { Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"

import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function about() {
    return (
        <div>
            <Header siteTitle={'About'} />
            <Seo title="About" />
            <StaticImage
                src="../images/gatsby-astronaut.png"
                width={200}
                height={200}
                quality={95}
                formats={["auto", "webp", "avif"]}
                alt="A Gatsby astronaut"
                style={{ marginBottom: `1.45rem` }}
            /><br />
            <Link to="/home">Home</Link><br />
            <Link to="/about">About</Link><br />
            <Footer />
        </div>
    )
}