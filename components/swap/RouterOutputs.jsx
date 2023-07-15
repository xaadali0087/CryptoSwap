// Files and modules

import ThemeContext from "../../state/ThemeContext.js"
import WindowSizeContext from "../../state/WindowSizeContext.js"
import EthereumContext from "../../state/EthereumContext.js"
import PriceContext from "../../state/PriceContext.js"
import { parse, format, formatNumber } from "../../helpers/number.js"
import { useContext } from "react"

// Router outputs component

const RouterOutputs = () => {
    // Swap data

    const { theme } = useContext(ThemeContext)
    const { chain } = useContext(EthereumContext)
    const prices = useContext(PriceContext)
    const { width } = useContext(WindowSizeContext)
    const swap = chain.swap

    // Get token value

    function getTokenValue(token, amount) {
        if (!prices[token.symbol]) return 0
        return +parse(amount, token.decimals) * prices[token.symbol]
    }

    // Replace token image with default unknown

    function defaultImage(event) {
        if (event.currentTarget.src.endsWith("unknown.svg") || event.currentTarget.src.endsWith("unknown-white.svg")) return
        event.currentTarget.src = theme === "dark" ? "/tokens/unknown-white.svg" : "/tokens/unknown.svg"
    }

    // Component

    return (
        <>
           
            <style jsx>{`
                .routers {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    border-top: 0.5px solid var(--gray);
                    padding-top: 32px;
                }

                .title {
                    font-size: 1.2rem;
                    margin-bottom: 16px;
                }

                .router {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 4fr 11fr 5fr;
                    gap: 8px 16px;
                    padding: 22px 0;
                }

                .section {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.1rem;
                }

                .icon {
                    width: 1.1rem;
                    height: 1.1rem;
                    object-fit: contain;
                }

                .arrow {
                    margin: 0 12px;
                }

                @media only screen and (max-width: 1000px), (max-height: 900px) {
                    .routers {
                        padding-top: 24px;
                    }

                    .title {
                        margin-bottom: 12px;
                    }

                    .router {
                        padding: 16px 0;
                    }
                }

                @media only screen and (max-width: 800px), (max-height: 800px) {
                    .routers {
                        padding-top: 20px;
                    }

                    .title {
                        margin-bottom: 10px;
                    }

                    .router {
                        padding: 12px 0;
                    }
                }

                @media only screen and (max-width: 700px) {
                    .routers {
                        padding-top: 0;
                        border-top: none;
                    }

                    .section {
                        gap: 10px;
                    }

                    .arrow {
                        margin: 0 12px;
                    }
                }

                @media only screen and (max-width: 550px) {
                    .router {
                        grid-template-columns: calc(1.2rem + 4px) 5fr 2fr;
                        gap: 12px;
                    }

                    .section {
                        gap: 8px;
                        font-size: 1rem;
                    }

                    .arrow {
                        margin: 0;
                    }

                    .router-name {
                        display: none;
                    }
                }
            `}</style>
            <style jsx>{`
                .icon[src="/routers/0x.svg"] {
                    filter: ${theme === "dark" ? "invert(1)" : "none"};
                }
            `}</style>
        </>
    )
}

// Exports

export default RouterOutputs