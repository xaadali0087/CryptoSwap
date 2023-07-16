/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef } from "react";
import styles from "./mobileMenu.module.scss";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
// ** Next Imports
import Image from "next/image";
import EthereumContext, { chains } from "../../../state/EthereumContext";
import ThemeContext from "../../../state/ThemeContext";
import WindowSizeContext from "../../../state/WindowSizeContext";
import { Web3Button } from "@web3modal/react";


const MobileMenu = (props) => {
  const chainIds = Object.keys(chains)
  const { theme } = useContext(ThemeContext)
  const { mobileMenuHandler } = props;
  const dropRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showMenu, setshowMenu] = useState(false);

  // Navigation link component

  const NavLink = ({ name, href }) => (
    <>
      <Link href={href}>
        <a className="link">{name}</a>
      </Link>
      <style jsx>{`
            .link {
                font-size: 1.1rem;
                color: var(--black);
                margin-left: 48px;
                display:block !important;
                @media screen and (max-width:786px){
                  display:none !important;
                }
            }

            .link:hover {
                text-decoration: underline;
            }

            @media only screen and (max-width: 1000px), (max-height: 900px) {
                .link {
                    margin-left: 32px;
                }
            }

            @media only screen and (max-width: 550px) {
                .link {
                    margin-left: 16px;
                }
            }
        `}</style>
    </>
  )


  // Wallet manager component

  const WalletManager = () => {
    // Wallet data

    const { enabled, chain, account, setChain } = useContext(EthereumContext)
    const { width } = useContext(WindowSizeContext)
    const [chainSelectActive, setChainSelectActive] = useState(false)

    // Connect to MetaMask

    async function requestConnect() {
      if (!enabled) return
      await ethereum.request({ method: "eth_requestAccounts" })
    }

    // Switch wallet to chain ID

    async function requestSwitch(chainId) {
      setChainSelectActive(false)
      if (!enabled) {
        setChain(chains[chainId])
        return
      }
      try {
        // Switch to chain

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }]
        })
      } catch {
        // Add chain in wallet

        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId,
            chainName: chains[chainId].fullName,
            nativeCurrency: {
              name: chains[chainId].token,
              symbol: chains[chainId].token,
              decimals: 18
            },
            rpcUrls: [chains[chainId].rpc],
            blockExplorerUrls: [chains[chainId].explorer]
          }]
        })
      }
    }

    // Detect click off chain select
    function handleClick(data) {
      if (data !== "chain-select" && data !== "select-chain") {
        setChainSelectActive(false)
      }
    }


    // Component

    return (
      <>
        <div className="wallet">
          <button id="select-chain" className="chain" onClick={() => setChainSelectActive(!chainSelectActive)}>
            <img className="chain-icon" src={`/chains/${chain.id}.svg`}></img>
            <div className="chain-name">{chain.name}</div>
          </button>
          <button className="connect" onClick={requestConnect}>
            <div className="connect-content">
              <img className="connect-icon" src="/icons/metamask.svg"></img>
              {width > 550 ? enabled ? account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Metamask Wallet" : "Enable Metamask" :
                enabled ? account ? `${account.slice(0, 6)}...` : "Connect" : "Enable"}
            </div>
          </button>



          {chainSelectActive ? (
            <div id="chain-select" className="chain-select" onClick={() => handleClick("chain-select")}>
              {chainIds.slice(0, chainIds.indexOf(chain.id)).concat(chainIds.slice(chainIds.indexOf(chain.id) + 1)).map(chainId => (
                <button className="switch-chain" onClick={() => requestSwitch(chainId)} key={chainId}>
                  <img className="switch-icon" src={`/chains/${chainId}.svg`}></img>
                  {chains[chainId].name}
                </button>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='WalletConnect'>
          <Web3Button />
        </div>


        <style jsx>{`
        .WalletConnect{
          margin-top:10px;
        }
       
                .wallet {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    row-gap:20px;
                    padding-right: 8px;
                    margin-top:20px
                    
                }

                .chain {
                    display: flex;
                    weight: 62px;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.1rem;
                    border: 1px solid var(--light-dark);
                    border-radius: 8px;
                    padding: 8px 36px;
                    margin-right: 16px;
                }

                .chain:hover {
                    background-color: var(--light);
                }

                .chain:hover .chain-name {
                    color: var(--base-black);
                }

                .chain-icon {
                    height: 1rem;
                }

                .chain-select {
                    position: absolute;
                    top: calc(16px + 1.1rem + 16px);
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    z-index: 2;
                    border: 1px solid var(--light-dark);
                    border-radius: 8px;
                }

                .switch-chain {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: var(--background);
                    padding: 8px 16px;
                }

                .switch-chain:first-child {
                    border-radius: 8px 8px 0 0;
                }

                .switch-chain:last-child {
                    border-radius: 0 0 8px 8px;
                }

                .switch-chain:hover {
                    background-color: var(--light);
                }

                .switch-icon {
                    width: 0.7rem;
                    height: 0.7rem;
                    object-fit: contain;
                    margin-right: 10px;
                }

                .connect {
                    font-size: 1.1rem;
                    height: 42px;
                    weight:70;
                    background-color: var(--light);
                    border: 1px solid var(--background);
                    border-radius: 12px;
                    padding: 8px 36px;
                }

                .connect:hover {
                    border: 1px solid var(--light-dark);
                }

                .connect-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    color: var(--base-black);
                }

                .connect-icon {
                    height: 1.2rem;
                }

                @media only screen and (max-width: 1000px), (max-height: 900px) {
                    .chain {
                        padding: 6px 24px;
                    }

                    .connect {
                        padding: 6px 24px;
                    }
                }

                @media only screen and (max-width: 800px), (max-height: 800px) {
                    .chain {
                        gap: 8px;
                    }

                    .connect-content {
                        gap: 8px;
                    }
                }

                @media only screen and (max-width: 550px) {
                    .chain {
                        padding: 8px;
                        margin-left: 8px;
                    }
                    .connect {
                        padding: 8px;
                        margin-right: 12px;
                    }

                    .chain-icon {
                        width: 0.9rem;
                        object-fit: contain;
                    }
                    .connect-icon {
                        width: 0.9rem;
                        object-fit: contain;
                    }

                    .connect {
                        padding: 6px 16px;
                        margin-right: -1px;
                    }
                }
            `}</style>
      </>
    )
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showMenu &&
        dropRef.current &&
        !dropRef?.current?.contains(e.target)
      ) {
        setshowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);
  return (
    <>
      <div className={theme === "dark" ? styles.wrapperLight : styles.wrapperDark}>
        <div className={styles.closeRow} onClick={mobileMenuHandler}>
          <CgClose className={styles.closeIcon} />
        </div>
        <div className={styles.linksContainer}>
          <Link href="/" className='header-wrapper'>
            <a className="header">
              <img className="icon" src={theme === "dark" ? "/logo.png" : "/logo.png"}></img>
              <div className="title">Easy Swap</div>
            </a>
          </Link>
          <NavLink name="About" href="/about" />
          <WalletManager />
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
