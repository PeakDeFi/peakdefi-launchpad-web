import classes from './AboutPage.module.scss'

const AboutPage = () => {
    return (<div className={classes.AboutPage}>
        <header>
            <h1>About PEAKDEFI Launchpad</h1>
        </header>
        <main>

            <section>
                <p>
                    We are a multichain platform to connect brand-new fundraising projects 
                    and investors looking for high quality startups and projects with outstanding 
                    ROI potential, which strives for:
                </p>
                <ul>
                    
                    <li>
                        <b>Highest quality standards:</b> Our projects go through a 5-stage due 
                        diligence before they get listed to ensure just the best projects on the market 
                        get launched on our platform.
                    </li>

                    <li>
                        <b>Fairness:</b> We provide guaranteed transparent allocation tiers for 
                        all potential investors to ensure every participating investor has an allocation spot.
                    </li>

                </ul>
            </section>

            <section>
                <h1>Our Background</h1>
                <p>
                    PEAKDEFI is a self-funded project that provides DeFi for the community. It 
                    started in 2020 and has since established itself as an ecosystem with various 
                    web3 products and different utilities for the PEAK token. It includes a 
                    Global Fund which redistributes itself automatically among the best performers 
                    through smart contracts for maximum success, as well as the most efficient 
                    multichain DeFi wallet for iOS and Android, which provides direct access to your 
                    NFT collection, a fast DApp browser and staking in one mobile app.
                </p>
            </section>

            <section>
                <h1>Why us?</h1>
                <p>
                    The crypto market is currently overloaded with new IDO and IGO launches which 
                    makes it difficult to filter out exceptional projects with high potential returns 
                    on investment. We analyse for you all aspects of potential projects including tokenomics, 
                    the team behind the project, use case, long term potential, financials as well as 
                    development steps and structure.
                </p>
                <p>
                    Our team with several years of experience in developing and launching startups in 
                    the world of crypto and decentralization will implement all necessary processes and 
                    infrastructure into every fundraising project in order to ensure a professional and 
                    smooth project execution as well as solid long term growth and development.
                </p>
            </section>
        
        </main>
    </div>);
}
 
export default AboutPage;