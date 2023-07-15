// Files and modules

import ThemeContext from "../state/ThemeContext.js"
import WindowSizeContext from "../state/WindowSizeContext.js"
import EthereumContext, { chains } from "../state/EthereumContext.js"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { Web3Button } from '@web3modal/react'
import NavBar from "./Navbar/index.jsx"
import Footer from "./Footer/index.jsx"








// Layout component

const Layout = ({ children }) => (
    <>
        <NavBar />
        <div className="content">
            {/* {children} */}
        </div>
        <Footer />
        <style jsx>{`
            .content {
                width: 100%;
                padding: 0 max(calc(50vw - 500px), 20px);
                min-height:80vh;
            }

            @media only screen and (max-width: 550px) {
                .content {
                    padding: 0 max(calc(50vw - 155px), 10px);
                }
            }
        `}</style>
    </>
)

// Exports

export default Layout
