// About page

const About = () => (
    <>
        <div className="content">
            <h1 className="title">About Easy Swap</h1>
            <p className="paragraph">Investments, including cryptocurrencies, inherently entail the risk of potential capital loss. It is crucial to exercise caution and only allocate funds that you can afford to lose. CryptoCoin Easy Swap operates as a decentralized exchange aggregator and does not retain or exert control over users' assets. It's important to note that transactions conducted on the blockchain are irreversible.</p>
    
        </div>
        <style jsx>{`
            .content {
                width: 100%;
                height: calc(100vh - 140px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0 calc(50% - 300px) 20px calc(50% - 300px);
            }

            .title {
                font-size: 2rem;
                margin-bottom: 32px;
            }

            .paragraph {
                font-size: 1.1rem;
                margin-bottom: 16px;
            }

            .attribution {
                color: var(--gray);
                font-size: 0.9rem;
                white-space: pre;
                margin-bottom: 4px;
            }

            .first {
                margin-top: 16px;
            }

            .link {
                color: inherit;
                text-decoration: underline;
            }

            @media only screen and (max-width: 1000px), (max-height: 900px) {
                .content {
                    height: calc(100vh - 100px);
                }
            }

            @media only screen and (max-width: 550px) {
                .content {
                    padding-bottom: 0;
                }
                
                .title {
                    margin-bottom: 24px;
                }

                .paragraph {
                    margin-bottom: 12px;
                }

                .first { 
                    margin-top: 12px;
                }
            }
        `}</style>
    </>
)

// Exports

export async function getStaticProps() {
    return {
        props: {
            page: "About"
        }
    }
}

export default About