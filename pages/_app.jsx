// Files and modules

import Layout from "../components/Layout.jsx"
import ThemeContext, { ThemeContextProvider } from "../state/ThemeContext.js"
import { WindowSizeContextProvider } from "../state/WindowSizeContext.js"
import { EthereumContextProvider } from "../state/EthereumContext.js"
import { PriceContextProvider } from "../state/PriceContext.js"
import Head from "next/head"
import Error from "next/error"
import "../components/Navbar/navbar.css"
import "../index.scss"
import { useContext } from "react"
import { Toaster } from "react-hot-toast";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '9f1004e719cc812fc74d8c310d3fe8a2'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

// Site metadata

const Metadata = ({ page }) => {
    const title = `Crypto Coin${page ? ` - ${page}` : ""}`
    return (
        <Head>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width"></meta>
            <meta name="description" content="A privacy-centered DEX aggregator, bringing you a fast, lightweight swap experience with the best rates on Ethereum, Polygon, Fantom, Avalanche, and BNB Chain"></meta>
            <meta property="og:title" content="CryptoSwap.is"></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:image" content="/ecoswap.png"></meta>
            <meta property="og:description" content="A privacy-centered DEX aggregator, bringing you a fast, lightweight swap experience with the best rates on Ethereum, Polygon, Fantom, Avalanche, and BNB Chain"></meta>
            <title>{title}</title>
            <link rel="icon" href="/logo.png"></link>
        </Head>
    )
}

// Site content

const App = ({ Component, pageProps }) => {
    // Page data

    const { theme } = useContext(ThemeContext)
    if (pageProps.statusCode) {
        return <Error statusCode={pageProps.statusCode}></Error>
    }

    // Component

    return (
        <>

            <Metadata page={pageProps.page}></Metadata>
            <WindowSizeContextProvider>
                <EthereumContextProvider>
                    <PriceContextProvider>
                        <WagmiConfig config={wagmiConfig}>
                            <Layout>
                                <Toaster
                                    position={"top-center"}
                                    toastOptions={{
                                        className: "react-hot-toast",
                                        style: {
                                            zIndex: 1300,
                                        },
                                    }}
                                />
                                <Component {...pageProps}></Component>
                            </Layout>
                        </WagmiConfig>
                    </PriceContextProvider>
                </EthereumContextProvider>
            </WindowSizeContextProvider>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <style jsx global>{`
                :root {
                    --background: ${theme === "light" ? "#FFFFFF" : "#16191E"};
                    --input-background: ${theme === "light" ? "#F8FBFF" : "#191B1F"};
                    /* base accent #48BF53 */
                    --light-dark: ${theme === "light" ? "#C8EBCB" : "#6DCC75"};
                    --light: ${theme === "light" ? "#ECF8ED" : "#B6E5BA"};
                    --base-black: #16191E;
                    --black: ${theme === "light" ? "#16191E" : "#E6E9EE"};
                    --dark-gray: ${theme === "light" ? "#56595E" : "#C6C9CE"};
                    --gray: ${theme === "light" ? "#96999E" : "#A6A9AE"};
                    --light-gray: ${theme === "light" ? "#C6C9CE" : "#76797E"};
                }
            `}</style>
            <style jsx global>{`
                * {
                    font-family: "Gilroy";
                    color: var(--black);
                    box-sizing: border-box;
                }

                body {
                    background-color: var(--background);
                    margin: 0;
                }

                ::-webkit-scrollbar {
                    width: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background-color: #96999E;
                }

                @media only screen and (max-width: 1000px), (max-height: 900px) {
                    html {
                        font-size: 14px;
                    }
                }

                @media only screen and (max-width: 800px), (max-height: 800px) {
                    html {
                        font-size: 12px;
                    }
                }
            `}</style>
            <style jsx global>{`
                ::-webkit-scrollbar-track {
                    background-color: ${theme === "dark" ? "#36393E" : "#E6E9EE"};
                }
            `}</style>
            <style>{`
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #76797E;
                }
            `}</style>
        </>
    )
}

// Theme wrapper

const ThemedApp = ({ Component, pageProps }) => (
    <>
        <ThemeContextProvider>
            <App Component={Component} pageProps={pageProps}></App>
        </ThemeContextProvider>
        <style jsx global>{`
            @font-face {
                font-family: "Gilroy";
                src: url("/fonts/Gilroy-Medium.woff2") format("woff2");
            }

            h1 {
                font-size: initial;
                margin: 0;
            }

            h2 {
                font-size: initial;
                margin: 0;
            }

            p {
                margin: 0;
            }

            a {
                color: initial;
                text-decoration: initial;
                cursor: pointer;
            }

            button {
                cursor: pointer;
                background-color: transparent;
                border: none;
                padding: 0;
            }
        `}</style>
    </>
)

// Exports

export default ThemedApp