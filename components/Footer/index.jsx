import React, { useContext } from 'react'
import ThemeContext from '../../state/ThemeContext'

// Footer component

const Footer = () => {
  // Theme data

  const { theme, setTheme } = useContext(ThemeContext)

  // Switch page theme

  function switchTheme() {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  // Component

  return (
    <>
      <div className="footer">
        Change Theme
        <button className="switch-theme" onClick={switchTheme}>
          <img className="theme-icon" src={theme === "dark" ? "/icons/moon.svg" : "/icons/sun.svg"}></img>
        </button>

      </div>
      <style jsx>{`
                .footer {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 0.9rem;
                    padding: 0 max(calc(50vw - 500px), 20px);
                }

                .switch-theme {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--light);
                    border: 1px solid var(--background);
                    border-radius: 8px;
                    margin-left: 24px;
                }

                .switch-theme:hover {
                    border: 1px solid var(--light-dark);
                }

                .theme-icon {
                    height: 16px;
                }

                .links {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 24px;
                    margin-left: auto;
                }

                .link {
                    height: 20px;
                }

                @media only screen and (max-width: 1000px), (max-height: 900px) {
                    .footer {
                        height: 40px;
                    }

                    .switch-theme {
                        width: 28px;
                        height: 28px;
                        margin-left: 16px;
                    }

                    .theme-icon {
                        height: 14px;
                    }

                    .links {
                        gap: 16px;
                    }

                    .link {
                        height: 15px;
                    }
                }

                @media only screen and (max-width: 550px) {
                    .switch-theme {
                        width: 24px;
                        height: 24px;
                        margin-left: 12px;
                    }

                    .theme-icon {
                        height: 12px;
                    }

                    .footer {
                        padding: 0 max(calc(50vw - 145px), 10px);
                    }
                }
            `}</style>
      <style jsx>{`
                .link {
                    filter: ${theme === "dark" ? "invert(1)" : "none"};
                }
            `}</style>
    </>
  )
}


export default Footer