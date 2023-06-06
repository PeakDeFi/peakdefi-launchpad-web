import classes from './TermsAndConditions.module.scss'
import './style.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShort } from '../../features/bgSlice';
import { textAlign } from '@mui/system';

const TermsAndConditions = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setShort(true));

        return ()=>{
            dispatch(setShort(false));
        }
    }, [])

    return (<div className={classes.TermsAndConditions}>
        <header>
            <h1>Terms and conditions</h1>
        </header>
        <main>
            <div className="calibre" id="calibre_link-0">
               <p style={{textAlign: "center"}}><strong>PEAKDEFI LAUNCHPAD</strong></p>
<p style={{textAlign: "center"}}><strong>GENERAL TERMS AND CONDITIONS</strong></p>
<p><br />&nbsp;</p>
<ol>
    <li>
        <p><strong>PREAMBLE</strong></p>
        <ol>
            <li>
                <p><span size="2">Peak Labs DMCC, a company duly incorporated under the laws of the United Arab Emirates, with legal seat in Dubai, DMCC Business Centre, Unit No: 3601 (&ldquo;</span><span size="2"><strong>PEAKDEFI</strong></span><span size="2">&rdquo; or &ldquo;</span><span size="2"><strong>We</strong></span><span size="2">&rdquo; or &ldquo;</span><span size="2"><strong>Us</strong></span><span size="2">&rdquo; or &ldquo;</span><span size="2"><strong>Our</strong></span><span size="2">&rdquo; or &ldquo;</span><span size="2"><strong>Ours</strong></span>&rdquo;) is a technology company providing digital services in the decentralized finance sector.</p>
            </li>
            <li>
                <p><span size="2">To learn more about the services We offer, please visit Our website, available at&nbsp;</span><span size="2">https://peakdefi.com/&nbsp;</span><span size="2">(the &ldquo;</span><span size="2"><strong>Site</strong></span>&rdquo;).</p>
            </li>
            <li>
                <p><span size="2">Among others, PEAKDEFI offers a service consisting of an online digital platform through which natural persons or legal entities can sell and buy Tokens, as better illustrated below (the &quot;</span><span size="2"><strong>Launchpad</strong></span>&quot;), which is the subject matter governed by these provisions.</p>
            </li>
            <li>
                <p><span size="2">The Launchpad is owned and operated by PEAKDEFI through the Site, and it is available at&nbsp;</span><a href="https://launchpad.peakdefi.com/"><u>https://launchpad.peakdefi.com</u></a>.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>SCOPE AND INTERPRETATION</strong></p>
        <ol>
            <li>
                <p><span size="2">These general terms and conditions solely govern the provision of the Launchpad to the different categories of actors identified in the following provisions (the &ldquo;</span><span size="2"><strong>Launchpad GTCs&rdquo;</strong></span>). Therefore, the provision of the Site and any other services offered by PEAKDEFI through the Site are excluded from the scope of Launchpad GTCs. These excluded services are governed by their own terms and conditions accessible from the respective web pages of the Site.</p>
            </li>
            <li>
                <p>With respect to the provision of the Launchpad, in the event of a conflict between the Launchpad GTCs and other contractual terms mentioning the Launchpad available on the site, the Launchpad GTCs will prevail.</p>
            </li>
            <li>
                <p>The meaning of capitalized terms used in the following provisions of the Launchpad GTCs is explained in the glossary, which is available at the bottom of this page, which forms an integral and substantial part of Launchpad GTCs.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>USERS</strong></p>
        <ol>
            <li>
                <p>The Launchpad is provided to the following categories of Users:</p>
            </li>
        </ol>
    </li>
</ol>
<ol type="a">
    <li>
        <p><span size="2">the &ldquo;</span><span size="2"><strong>Sellers</strong></span><span size="2">&rdquo;,</span> meaning any natural or legal person that uses the Launchpad to launch Sales and and sell the Tokens offered through the respective Sales;</p>
    </li>
    <li>
        <p><span size="2">the &ldquo;</span><span size="2"><strong>Buyers</strong></span><span size="2">&rdquo;,</span> meaning any natural or legal person that uses the Launchpad to buy the Tokens offered and sold by the Sellers.</p>
    </li>
</ol>
<ol>
    <ol>
        <li>
            <p>To be a User and be able to use the Launchpad, You must first have staked PEAK Tokens in the Staking Protocol. This staking activity and the PEAK Token are not regulated by the Launchpad GTCs.</p>
        </li>
    </ol>
    <li>
        <p><strong>ACCEPTANCE OF THE LAUNCHPAD GTCs</strong></p>
        <ol>
            <li>
                <p>The Launchpad is provided subject to Your acceptance without modification of the Launchpad GTCs and all other operating rules, policies (including, without limitation, PEAKDEFI&rsquo;s Privacy Policy or Cookies Policy) and procedures that may be published from time to time on the Site by PEAKDEFI.</p>
            </li>
            <li>
                <p>If you are a Seller, you may only access the Launchpad after having been approved by Us and having entered into the IDO Launchpad Agreement with Us.</p>
            </li>
            <li>
                <p>Please read this Launchpad GTCs carefully before accessing or using the Launchpad.</p>
            </li>
            <li>
                <p>By accessing or using any feature of the Launchpad You agree to become bound by the Launchpad GTCs. If You do not agree to all the terms and conditions of this Launchpad GTCs you are recommended not to use the Launchpad.</p>
            </li>
            <li>
                <p>The Launchpad is available only to, and the GTCs may be accepted only by individuals who are at least 18 years old</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>CONDITIONS</strong></span><strong>&nbsp;AND PURPOSE OF USE</strong></p>
        <ol>
            <li>
                <p><span size="2">The User acknowledges and&nbsp;</span>accepts that:</p>
                <ol type="a">
                    <li>
                        <p>PEAKDEFI will process the User&apos;s Data in accordance with the provisions of the Privacy Policy;</p>
                    </li>
                    <li>
                        <p>if You are a Seller, Your Data will be processed also by Blockpass for the purpose of KYC/AML (if you are not familiar with the term &ldquo;KYC/AML&rdquo;, You are recommended to read the Glossary at the bottom of this page);</p>
                    </li>
                    <li>
                        <p><span size="2">PEAKDEFI will provide the Launchpad according to the needs related to any scheduled or extraordinary and unmissable main</span>tenance work;</p>
                    </li>
                    <li>
                        <p>the costs of connection to the Internet network, and those possibly related to the connection modalities, are at the User&apos;s expense.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>The Users undertakes to:&nbsp;</p>
                <ol type="a">
                    <li>
                        <p>not to use the the Launchpad in an improper manner, for purposes that are not permitted by law or contrary to morality, to spread computer viruses, to perform activities that may compromise the security of the Launchpad or damage it;</p>
                    </li>
                    <li>
                        <p>access the Launchpad by means of automated tools (such as collection bots, robots, spiders or scrapers);</p>
                    </li>
                    <li>
                        <p>provide their true data;</p>
                    </li>
                    <li>
                        <p>not to violate any term of the Launchpad GTCs and the laws applicable to the Users;</p>
                    </li>
                    <li>
                        <p>to respect the rights of PEAKDEFI and/or of Third Parties.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>The Launchpad is intended to be used exclusively for offering, selling, and buying Tokens offered through Sales. If the Token offering You are interested in as a Buyer or as a Seller does not fall within the meaning of IDO as established in the Glossary, You are recommended not to use the Launchpad.</p>
            </li>
            <li>
                <p>The procedures for launching Sales on the Launchpad and offering, selling and buying the Tokens that are the subject of those Sales, are those available on the Launchpad from time to time.</p>
            </li>
            <li>
                <p>The price of Tokens sold through the Launchpad is decided by Sellers and PEAKDEFI.</p>
            </li>
            <li>
                <p>The Launchpad facilitates transactions between the Buyer and the Seller but We are not a party to any agreement between the Buyer and the Seller of Tokens.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>Sales AND TOKEN SALES</strong></p>
        <ol>
            <li>
                <p>For the purpose of launching Sales, and offering and selling Tokens through the Launchpad, the Seller is required to:</p>
                <ol type="a">
                    <li>
                        <p><span size="2">submit an application via&nbsp;</span><span size="2">https://forms.monday.com/forms/f0d4083ebc3d99b9d70fbcf08f9ade91?r=use1</span>;</p>
                    </li>
                    <li>
                        <p>enter into an IDO Launchpad Agreement with Us and comply with all the provisions therein contained;</p>
                    </li>
                    <li>
                        <p>upon Our approval, carefully read all the instructions provided during the procedure for starting and executing the IDO;</p>
                    </li>
                    <li>
                        <p>accept the Launchpad GTCs;</p>
                    </li>
                    <li>
                        <p>undergo the KYC/AML procedure managed by Blockpass</p>
                    </li>
                </ol>
            </li>
        </ol>
    </li>
</ol>
<p>The transmission of the IDO order constitutes a proposal to sell the selected Tokens, governed by the GTCs and entails the obligation of the Seller to deliver the Tokens, upon their issuance.</p>
<ol>
    <ol start="2">
        <li>
            <p>For the purpose of buying Tokens through the Launchpad, the Buyer is required to:</p>
            <ol type="a">
                <li>
                    <p>carefully read all the instructions provided during the procedure for participating in the IDO and purchasing Tokens;</p>
                </li>
                <li>
                    <p>and accept the Launchpad GTCs.&nbsp;</p>
                </li>
            </ol>
        </li>
    </ol>
</ol>
<p>The transmission of the purchase order constitutes a proposal to purchase the selected Tokens, governed by the GTCs and entails the obligation of the Buyer to pay the price of the Tokens.</p>
<ol>
    <ol start="3">
        <li>
            <p>In addition to the GTCs, each IDO and sale of Tokens may be subject to additional agreements between the Sellers and the Buyers, including but not limited to simple agreements for future tokens, to which PEAKDEFI is not a party.</p>
        </li>
        <li>
            <p>The Buyer undertakes to verify the correctness of all data entered before and after sending the purchase order, undertaking to promptly rectify any incorrect information.&nbsp;</p>
        </li>
        <li>
            <p>PEAKDEFI reserves the right to request Buyers, at any time, to provide additional information and documents at the request of any competent authority or in case of application of any applicable law or regulation.</p>
        </li>
        <li>
            <p><span size="2">Once</span> the&nbsp;<span size="2">o</span>rder&nbsp;<span size="2">c</span>onfirmation has been received, the order cannot be&nbsp;<span size="2">canceled</span> or modified.</p>
        </li>
        <li>
            <p><span size="2">PEAKDEFI</span> may make available&nbsp;<span size="2">on the Launchpad&nbsp;</span>different sales&nbsp;<span size="2">procedures</span> than those indicated above and on the basis of the indications that&nbsp;<span size="2">PEAKDEFI</span><span size="2">will</span><span size="2">make available to Users&nbsp;</span>on the Site&nbsp;<span size="2">or on the Launchpad</span>.</p>
        </li>
    </ol>
    <li>
        <p><strong>FEES</strong></p>
        <ol>
            <li>
                <p>As a Buyer, you can use the Launchpad for free. No fees will be charged to You by PEAKDEFI.</p>
            </li>
            <li>
                <p>As a Seller, PEAKDEFI may charge You fees as consideration for the platform service, which are governed by the IDO Launchpad Agreement You enter into with Us.</p>
            </li>
            <li>
                <p>Notwithstanding the above, due to the use of a Blockchain Protocol, Gas Fee could be applied to any transaction executed via Launchpad.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>IDENTITY VERIFICATION THROUGH KYC/AML PROCESS</strong></p>
        <ol>
            <li>
                <p>As a software development company, We have no role in enforcing KYC/AML by default, however, we have mandatory requirements for KYC/AML identification verification tools for the Sellers through Us to enforce on Users. We are implementing KYC/AML tools into the Launchpad through https://www.blockpass.org/.</p>
            </li>
            <li>
                <p>Certain Sellers could be required by law to require You to complete the KYC/AML verification process before participating in any Project sales.</p>
            </li>
            <li>
                <p>Although We make no warranty as to the merit, legality, or juridical nature of any project relating to any of the IDO launched on the Launchpad, We nonetheless understand the need to require KYC/AML verification under certain circumstances. Therefore, we reserve the right at any time, to:</p>
                <ol type="a">
                    <li>
                        <p>ask for your Personal Data, including but no limited to name, surname, birthday, email address, nationality, location, government identification number (identification card/passport number and date of identification card/passport issuing), Telegram username, Wallet Address, and any KYC/AML documentation with the liveness test that it deems necessary to determine the identity and location of an User, and reserve the right to restrict the use of the Launchpad until the User&rsquo;s identity is sufficiently determined;</p>
                    </li>
                    <li>
                        <p>to share the submitted KYC/AML information and documentation to the Third Parties to verify the authenticity of the submitted information, and the end user (you) giving the consent to share such information by using the Services;</p>
                    </li>
                    <li>
                        <p>to reject the use of the Services if we have the reasonable ground to believe that they are found to be in violation of relevant and applicable AML laws and regulations, and to cooperate with the competent authorities or any investigation when and if necessary, upon the valid request by the court order.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>The liveness test will require You to take a photo of Your government identification with Your phone or camera. If You have any questions, feel free to reach out via email: launchpad@peakdefi.com.</p>
            </li>
            <li>
                <p>We expressly prohibit and reject the use of the Launchpad for any form of illicit activity, including money laundering, terrorist financing or trade sanctions violations, consistent with various jurisdictions&rsquo; laws, regulations and norms. To that end, the Launchpad is not offered to individuals or entities on any Politically Exposed Persons (&ldquo;PEP&rdquo;) lists, or subject to any United States, European Union, or other global sanctions or watch lists. By using the Launchpad, You represent that You are not on any of such lists.</p>
            </li>
            <li>
                <p>You fully acknowledge that Your information and KYC/AML documentation may be disclosed to government agencies or regulators upon a valid request of the court order. Once you have decided to participate in any Project and start staking your PEAK Token, you must ensure that all information provided to Us is complete, accurate, and updated in a timely manner. We will rely on the information You provided and should there be any reasonable grounds for Us to believe that the partial or the whole of Your information provided to Us is incomplete, or incorrect, or outdated, We reserve the right to send You a notice to demand correction, or to delete such information directly, and, as the case may be, to disable You to access to all or part of the Launchpad.</p>
            </li>
            <li>
                <p>If we have a reasonable ground to believe that any User transactions by using digital currencies derived from any suspicious illegal activities, We will be entitled to block Your access to the Launchpad as We may deem it necessary at Our sole discretion..</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>USE OF BLOCKCHAIN</strong></p>
        <ol>
            <li>
                <p>The Launchpad may rely on the use of any Blockchain Protocol, meaning any open source software that is built upon the experimental technology referred to as blockchain. Risks arising from this reliance include (but are not limited to):</p>
                <ol type="a">
                    <li>
                        <p>the existence of technical flaws in such a Blockchain Protocol;</p>
                    </li>
                    <li>
                        <p>slowdowns in transaction validation;</p>
                    </li>
                    <li>
                        <p>targeting of such a blockchain by malicious persons;</p>
                    </li>
                    <li>
                        <p>changes in such a Blockchain Protocol&rsquo;s consensus protocol or algorithms;</p>
                    </li>
                    <li>
                        <p>decreased community or miner support for such a Blockchain Protocol;</p>
                    </li>
                    <li>
                        <p>the existence or development of competing networks and protocols;</p>
                    </li>
                    <li>
                        <p>the existence or development of forked versions of such a blockchain protocol;</p>
                    </li>
                    <li>
                        <p>flaws in the Solidity scripting language;</p>
                    </li>
                    <li>
                        <p>disputes between such a blockchain protocol developers, miners and/or users;&nbsp;</p>
                    </li>
                    <li>
                        <p>regulatory action against such Blockchain Protocol developers, miners and/or users.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>PEAKDEFI reserves the right to migrate Launchpad on another Blockchain Protocol at any time.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>USE OF WALLETS</strong></p>
        <ol>
            <li>
                <p><span size="2">All transactions initiated through the Launchpad are facilitated and run by third-party electronic wallet extensions, and by using the Launchpad, You agree that You are governed by the terms of service and privacy policy for the applicable extensions such as, including but not limited to, Metamask (terms are available at&nbsp;</span><a href="https://metamask.io/terms.html"><u>https://metamask.io/terms.html</u></a><span size="2">&nbsp;and&nbsp;</span><a href="https://metamask.io/privacy.html"><u>https://metamask.io/privacy.html</u></a>).</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>USE</strong></span><strong>&nbsp;OF SMART CONTRACTS</strong></p>
        <ol>
            <li>
                <p><span size="2">To</span> initiate a transaction on the Launchpad, a User must voluntarily invoke one or more Smart Contract operations from a Wallet. All transactions on the Launchpad, including but not limited to transfers, offers, bids, listings, sales, or purchases of Tokens are initiated through one or more Smart Contracts at the sole discretion and at the complete risk of the Users.&nbsp;</p>
            </li>
            <li>
                <p><span size="2">The</span> Smart Contracts are configured to facilitate the execution of a voluntary User offer, an acceptance of an offer, or other confirmation to purchase, sell, bid on, list, or transfer Tokens. The User acknowledges the risk of Smart Contracts and agrees to be bound by the outcome of any Smart Contract operation by invoking, calling, requesting, or otherwise engaging with the Smart Contract, whether or not the Smart Contract behaves as the User expects.</p>
            </li>
            <li>
                <p><span size="2">The</span><span size="2">&nbsp;User agrees and understands that all fees applied by PEAKDEFI, if any, are transferred, processed, or initiated directly through one or more of the Smart Contracts on the&nbsp;</span><span size="2">bl</span>ockchain network.&nbsp;</p>
            </li>
            <li>
                <p><span size="2">All</span> the transactions occurring via Launchpad are executed by one or more Smart Contracts processed on the blockchain and not under any direct control by PEAKDEFI or any other Third Party.&nbsp;</p>
            </li>
            <li>
                <p><span size="2">PEAKDEFI is&nbsp;</span>not the custodian of any Token offered and purchased by the User. The User understands and acknowledges that neither the Launchpad nor Smart Contracts give PEAKDEFI custody, possession, or control of any Token at any time, except as provided for in agreements other than the Launchpad GTCs.</p>
            </li>
            <li>
                <p><span size="2">You</span><span size="2">&nbsp;affirm that You are aware and acknowledge that PEAKDEFI is a non-custodial service provider and has designed the Launchpad to be directly accessible by the Users without any involvement or actions taken by PEAKDEFI or any Third Party except where expressly otherwise&nbsp;</span><span size="2">provided</span>.</p>
            </li>
            <li>
                <p><span size="2">Users</span> are forbidden from engaging in any attack, hack, denial-of-service attack, interference, or exploit of any Smart Contract related to the Launchpad. Operations performed by a User that is technically permitted by a Smart Contract related to the Launchpad may nevertheless be a violation of the Launchpad GTCs and the law.</p>
            </li>
            <li>
                <p><span size="2">The</span> User acknowledges that PEAKDEFI may modify, change, amend, or replace one or more of the Smart Contracts from time to time. The User agrees that a modification to one or more of the Smart Contracts does not alter any right or obligation conferred by the Launchpad GTCs.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>OTHER TECHNICAL ASPECTS&nbsp;</strong></p>
        <ol>
            <li>
                <p>For the purpose of executing Sales and sale/purchase Tokens, Users will comply with the written instructions that PEAKDEFI will provide with any electronic means, including but not limited to emails or instructions on the Site.</p>
            </li>
            <li>
                <p>Tokens are digital products that cannot be physically delivered. In particular, the User must have the availability of a Wallet Address for the purpose of transferring Tokens, when issued. In the absence of such a Wallet, no transfer of Tokens may take place.</p>
            </li>
            <li>
                <p>PEAKDEFI will have no liability in relation to such Wallet and will not have access to any private key thereof. You understand that Your public Wallet Address will be made publicly visible whenever you engage in a transaction on the Launchpad.&nbsp;</p>
            </li>
            <li>
                <p>PEAKDEFI does not provide any services, including technical or IT support and assistance. Any possible assistance and support of a technical nature, aimed at a better management of the sale and purchase process of the Tokens may be provided on a case by case basis by PEAKDEFI, without this implying any form of compulsory technical assistance to the Users.&nbsp;</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>REQUESTS</strong></span><strong>&nbsp;BY USERS</strong></p>
        <ol>
            <li>
                <p>The User may address requests to PEAKDEFI through the methods or contact details provided on the Site.</p>
            </li>
            <li>
                <p>PEAKDEFI has no legal obligation to respond to the User&apos;s requests.</p>
            </li>
            <li>
                <p>If the User provides ideas, suggestions, or other feedback in connection with the use of the Launchpad, such feedback is not confidential and may be used by PEAKDEFI without restriction and without payment to the User.</p>
            </li>
            <li>
                <p>PEAKDEFI will process the Data transmitted by the User when contacting PEAKDEFI for the sole purpose of executing the requests governed by the Launchpad GTCs or the Special Sections, and therefore on the basis of assumptions of a contractual nature, in accordance with the provisions of the Privacy Policy.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>RIGHTS</strong></span><strong>&nbsp;AND POWERS OF PEAKDEFI</strong></p>
        <ol>
            <li>
                <p>PEAKDEFI reserves the right, in its sole and absolute discretion, to:</p>
                <ol type="a">
                    <li>
                        <p>modify, update, suspend, limit or interrupt the operation of the Launchpad at any time, or change and/or replace its domain name;</p>
                    </li>
                    <li>
                        <p>to amend, modify, alter or supplement the Launchpad GTCs and the Smart Contracts accessible through the Launchpad from time to time;</p>
                    </li>
                    <li>
                        <p><span size="2">analyze the traffic on the Launchpad (</span><span size="2"><em>e.g.</em></span> detect the most visited pages, the number of visitors per hour or per day, the geographical origin, the average connection time, the browsers used, the origin of the visitor - from search engines or from other Sites -, phrases and words searched for, etc.) in order to understand how it is used and manage, optimize and improve it, or even just for statistical purposes;</p>
                    </li>
                    <li>
                        <p>solve operational or technical problems (e.g. anomalies in page loading);&nbsp;</p>
                    </li>
                    <li>
                        <p>perform monitoring activities to repel and/or prevent cyber-attacks and/or fraud;</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>In accordance with the provisions of Clause 13(a) and (b) above, We recommend You to read about the changes We make, and if You do not agree, discontinue use of Launchpad.</p>
            </li>
            <li>
                <p>You agree that PEAKDEFI has the right to immediately suspend, pause or cancel Your access to the Services, by any means permitted by applicable law and compatible with the Launchpad technology, if We suspect, in our sole discretion, that:</p>
                <ol type="a">
                    <li>
                        <p>Your Wallet is being used for money laundering or any illegal activity;</p>
                    </li>
                    <li>
                        <p>You have concealed or provided false identification information or other details;&nbsp;</p>
                    </li>
                    <li>
                        <p>You have engaged in fraudulent activity;&nbsp;</p>
                    </li>
                    <li>
                        <p>any IDO You are launching or or previously launched by You is unlawful;</p>
                    </li>
                    <li>
                        <p>any Token You are selling or previously sold by You is unlawful;;</p>
                    </li>
                    <li>
                        <p>You have otherwise acted in breach of the Launchpad GTCs.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>In the event that You are in breach of the Launchpad GTCs, PEAKDEFI may, at its sole discretion and without any obligation to pay compensation:</p>
                <ol type="a">
                    <li>
                        <p>deny any Users further use of the Launchpad by any means permitted by applicable law and compatible with the Launchpad technology;</p>
                    </li>
                    <li>
                        <p>take against any of the Users any action for its own protection, including those aimed at obtaining compensation for damages.</p>
                    </li>
                </ol>
            </li>
        </ol>
    </li>
</ol>
<ol start="15">
    <li>
        <p><span size="2"><strong>INTELLECTUAL PROPERTY</strong></span><strong>RIGHTS AND END-USER LICENSE AGREEMENT</strong></p>
        <ol>
            <li>
                <p>Unless otherwise expressly provided for, PEAKDEFI is the exclusive owner of all Intellectual Property Rights over the Launchpad, including, without limitation, all present and future copyright, title, interests in and to the Launchpad, registered and unregistered trademarks, design rights, unregistered designs, database rights.&nbsp;</p>
            </li>
            <li>
                <p>Notwithstanding the above, grants You a non-exclusive, worldwide, non-sublicensable, limited, revocable end-user license to use the Launchpad. Except as herein provided, the provision of the Launchpad by PEAKDEFI will not be considered as an assignment or licensing by PEAKDEFI in favor of the Users of any Intellectual Property Right on the Launchpad, except for the above.</p>
            </li>
            <li>
                <p>All the content on the Launchpad, including but not limited to the images, pictures, graphics, photographs, animations, videos, music, audio and text belongs to PEAKDEFI. Content owned by Sellers may be present on the Launchpad for the purpose of launching and/or promoting any given IDO subject to publication or authorization by the Sellers.</p>
            </li>
            <li>
                <p>Under no circumstances may You have the right to copy, reproduce, make use, translate, distribute, publish, create derivative works, or otherwise deal with any content protected by Intellectual Property Rights that you do not own for any other reason without being granted a written consent from the respective owner. Therefore You hereby agree not to do anything that will harm or potentially harm such rights.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>WARRANTY</strong></span><strong>&nbsp;EXCLUSIONS AND NO ASSISTANCE</strong></p>
        <ol>
            <li>
                <p>The Launchpad is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis and PEAKDEFI makes no warranties, express or implied (including the implied warranties of non-infringement, merchantability and fitness for a particular purpose) in relation to the Launchpad, and inform the Users that the Launchpad may be temporarily inaccessible or otherwise defective or delayed.&nbsp;</p>
            </li>
            <li>
                <p>In accordance with the above, except where otherwise expressly provided in the Launchpad GTCs, PEAKDEFI does not represent and warrant that, by way of example but not limited to:</p>
                <ol type="a">
                    <li>
                        <p>the Launchpad will meet the User&rsquo;s requirements;</p>
                    </li>
                    <li>
                        <p>the suitability of the Launchpad with respect to the needs of the User;</p>
                    </li>
                    <li>
                        <p>the Launchpad will be uninterruptedly and timely available, secure, or error-free;</p>
                    </li>
                    <li>
                        <p>the quality of the Launchpad;</p>
                    </li>
                    <li>
                        <p>the correction of any technical errors of the Launchpad;</p>
                    </li>
                    <li>
                        <p>any aspect of adequacy or absence of risk related to the use of Blockchain Protocols, Smart Contracts, and Wallets, as specified below;</p>
                    </li>
                    <li>
                        <p>the legal compliance of the Sales of Tokens offered through such Sales by Sellers, for which the respective Sellers are responsible;</p>
                    </li>
                    <li>
                        <p>the legality, reliability, and accuracy of the information and any other material or information provided by Sellers in connection with the projects to which the Sales launched on the Launchpad relate, for which the respective Sellers are responsible.</p>
                    </li>
                </ol>
            </li>
            <li>
                <p>PEAKDEFI will make every reasonable effort to ensure that the User has continuous and uninterrupted access to the Launchpad but will not, under any circumstances, be liable if Launchpad or any of its features is temporarily or permanently inaccessible.</p>
            </li>
            <li>
                <p>Any material accessed, downloaded, or otherwise obtained through the use of the Launchpad is done at the User&rsquo;s own discretion and risk and the User will be solely responsible for any damage to its computer system or loss of data that results from the download of any such material. No advice or information, whether oral or written, obtained by the User from PEAKDEFI or through or from the Launchpad will create any warranty not expressly stated in the Launchpad GTCs.</p>
            </li>
            <li>
                <p>Because some jurisdictions do not allow the exclusion of implied warranties, the above exclusion of implied warranties may not apply to You if you reside in such states or jurisdictions. In this onlycase, PEAKDEFI&rsquo;s liability will be limited to the extent permitted by law.</p>
            </li>
            <li>
                <p>PEAKDEFI will use reasonable efforts to protect information submitted by You in connection with the Launchpad, but You acknowledge and agree that Your submission of such information is at Your sole risk, and PEAKDEFI hereby disclaims any and all liability to You for any loss or liability relating to such information in any way.</p>
            </li>
            <li>
                <p><span size="2">PEAKDEFI</span>does not guarantee the provision of technical assistance in relation to the Launchpad.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>LIMITATION OF LIABILITY, DISCLAIMERS, AND RISKS</strong></p>
        <ol>
            <li>
                <p><span size="2"><strong>No consequential, incidental or punitive damages</strong></span>: to the fullest extent permitted by law, in no event neither PEAKDEFI nor its employees, agents, or third-party content providers will be liable to You or any Third Party for any lost profit or any indirect, consequential, exemplary, incidental, special or punitive damages arising from the Launchpad GTCs, or for any damages related to loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, or loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable and even if PEAKDEFI has been advised of the possibility of such damages. This disclaimer is applicable to any damage or injury resulting from negligence or omission of net, computer virus or other similar item, telecommunications errors, or unauthorized access to, or use of user information through theft or any other means. We are not liable for criminal, tortuous, or negligent actions or omissions of Third Parties that affect the Launchpad. In no event will PEAKDEFI or any of its directors, officers, agents, employees, assigns, or third-party content providers be held liable for any tortuous or illegal conduct of other Users. In no event will PEAKDEFI or any of its agents, employees, or assigns be held liable for any damage to equipment, hardware, or other property of user or personal injury that arises in connection with use of the Launchpad. Access to, and use of, the Launchpad is at Your own discretion and risk, and You will be solely responsible for any damage to Your computer system or mobile device or loss of data resulting therefrom.</p>
            </li>
            <li>
                <p><span size="2"><strong>Limitation of Liability</strong></span>: PEAKDEFI&rsquo;s maximum aggregate liability for damages to each User arising out of or in any way related to the Launchpad GTCs, the access to and use of the Launchpad will in all cases be limited to, and under no circumstances will exceed, PEAKDEFI&rsquo;s service fees actually received by PEAKDEFI from such User, only in the event and to the maximum extent that fees are actually charged to the Users.</p>
            </li>
            <li>
                <p><span size="2"><strong>IDO and Token sales</strong></span>: PEAKDEFI will not be liable to You for contract, tort, or any other types of damages, including indirect, special, incidental, consequential, punitive or exemplary damages arising out of or related:</p>
                <ol type="a">
                    <li>
                        <p>unlawful Sales or unlawful Tokens offered by the Sellers through the Launchpad;&nbsp;</p>
                    </li>
                    <li>
                        <p>legality, reliability, and accuracy of the information and any other material or information provided by Sellers in connection with the projects to which the Sales launched on the Launchpad relate;</p>
                    </li>
                    <li>
                        <p>any participation in or the outcome of any Launchpad transaction;</p>
                    </li>
                </ol>
            </li>
        </ol>
    </li>
</ol>
<p><span size="2">whether or not PEAKDEFI has been advised or knew of the possibility of such damages.&nbsp;</span></p>
<ol>
    <ol start="4">
        <li>
            <p><span size="2"><strong>No Professional Advice or Liability</strong></span>: all information provided by or on behalf of PEAKDEFI is for informational purposes only and should not be construed as professional, accounting or legal advice. Users should not take or refrain from taking any action in reliance on any information contained in the Launchpad GTCs or provided by or on behalf of PEAKDEFI. Before Users make any decisions involving the IDO or the sale/purchase of Tokens, Users should seek independent professional advice from persons licensed and qualified in the area for which such advice would be appropriate.</p>
        </li>
        <li>
            <p><span size="2"><strong>Certain Uses and Risks of Blockchain Technology</strong></span>: for the purpose of the functioning of the Launchpad, PEAKDEFI utilizes experimental cryptographic technologies and blockchain technologies, including a Blockchain Protocol, Tokens, Smart Contracts. Each User acknowledges and agrees that such technologies are novel, experimental, and speculative, and that therefore there is significant uncertainty regarding the operation and effects and risks thereof and the application of existing law thereto.</p>
        </li>
        <li>
            <p><span size="2"><strong>Risk of Interacting with Smart Contracts</strong></span>: Users acknowledge and assume the risk of initiating, interacting with, participating transactions executed by Smart Contracts and take full responsibility and liability for the outcome of any transaction they initiate, whether or not the Smart Contracts or other market participants behave as expected or intended. Users hereby represent that they are knowledgeable, experienced and sophisticated in using blockchain technology and transactions.</p>
        </li>
    </ol>
    <li>
        <p><span size="2"><strong>INDEMNIFICATION</strong></span></p>
        <ol>
            <li>
                <p>To the fullest extent permitted by applicable law, You agree to indemnify, defend and hold harmless PEAKDEFI, and Our respective past, present and future employees, officers, directors, contractors, consultants, equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents, representatives, predecessors, successors and assigns, from and against all actual or alleged Third Party claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest, fees, expenses (including, without limitation, attorneys&rsquo; fees and expenses) and costs (including, without limitation, court costs, costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or otherwise, including, but not limited to, damages to property or personal injury, that are caused by, arise out of or are related to (a) Your use or misuse of the Launchpad; (b) any feedback You provide, (c) Your violation of the Launchpad GTCs, (d) Your violation of the rights of another User or Third Party.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>TERMINATION&nbsp;</strong></p>
        <ol>
            <li>
                <p>Notwithstanding anything contained in the Launchpad GTCs, We reserve the right, without notice and in Our sole discretion, to terminate Your right to access or use the Launchpad at any time and for any or no reason, and You acknowledge and agree that We will have no liability or obligation to You in such event and that You will not be entitled to a refund of any amounts that You have already paid to us, to the fullest extent permitted by applicable law.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>SEVERABILITY&nbsp;</strong></p>
        <ol>
            <li>
                <p>If any term, Clause or provision of the Launchpad GTCs is held invalid or unenforceable, then that term, Clause or provision will be severable from the Launchpad GTCs and will not affect the validity or enforceability of any remaining part of that term, Clause or provision, or any other term, Clause or provision of the Launchpad GTCs.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>FORCE MAJEURE</strong></span></p>
        <ol>
            <li>
                <p>PEAKDEFI will not incur any liability or penalty for not performing any act or fulfilling any duty or obligation hereunder or in connection with the matters contemplated hereby by reason of any occurrence that is not within its control (including any provision of any present or future law or regulation or any act of any governmental authority, any act of God or war or terrorism, any epidemic or pandemic, or the unavailability, disruption or malfunction of the Internet, the World Wide Web or any other electronic network, Blockchain Protocol, or PEAKDEFI technological systems or any aspect thereof, or any consensus attack, or hack, or denial-of-service or other attack on the foregoing or any aspect thereof, or on the other software, networks and infrastructure that enables PEAKDEFI to provide the Services.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>USERS RESPONSIBILITY FOR THEIR WALLETS</strong></p>
        <ol>
            <li>
                <p>Users need to use their Wallets in order to use their Launchpad. Your Wallet and Your Wallet Address are for Your personal use only and should be kept confidential. You understand that You are responsible for all use (including any unauthorized use) of Your Wallet and any matters relating to it.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>MISCELLANEOUS</strong></p>
        <ol>
            <li>
                <p>The Launchpad GTCs regulates the relationship between PEAKDEFI and the User and does not create rights in favor of, nor obligations against, Third Parties.</p>
            </li>
            <li>
                <p>Any tolerance by PEAKDEFI of the conduct of the Users in violation of the provisions contained in the Launchpad GTCs does not constitute a waiver of the rights arising from the provisions violated, nor the right to require the exact fulfillment of all terms and conditions therein.</p>
            </li>
            <li>
                <p>PEAKDEFI does not provide content and/or services to individuals who do not have the legal capacity to act to accept the Launchpad GTCs as set out in their home country&apos;s legislation.</p>
            </li>
            <li>
                <p>The rights and remedies included herein are not exclusive, but are in addition to any other rights and remedies available under applicable law.</p>
            </li>
            <li>
                <p>Any limitation or exclusion of liability provided for in favor of PEAKDEFI in the Launchpad GTCs will apply to the fullest extent permitted by law.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><span size="2"><strong>PROCESSING</strong></span><strong>&nbsp;OF PERSONAL DATA</strong></p>
        <ol>
            <li>
                <p>PEAKDEFI will process data of Users in accordance with the Privacy Policy.</p>
            </li>
        </ol>
    </li>
    <li>
        <p><strong>APPLICABLE LAW AND JURISDICTION</strong></p>
        <ol>
            <li>
                <p>The Launchpad GTCs are governed by the regulations applicable at the Dubai Multi Commodity Centre (DMCC) and the laws of the United Arab Emirates.</p>
            </li>
            <li>
                <p>Any dispute concerning the interpretation, execution, termination or validity of the Launchpad GTCs will be submitted to the DMCC Disputes Centre and governed by the latter&rsquo;s Mediation Rules.</p>
            </li>
            <li>
                <p>Should a settlement not be reached via mediation, the Disputes Centre shall refer the dispute to the exclusive jurisdiction of Dubai Courts.</p>
            </li>
            <li>
                <p>Should the provisions of this Clause be inapplicable according to the mandatory rules of the country of the Users, then the applicable law and the competent Court will be determined according to the laws of such country.</p>
            </li>
            <li>
                <p>If You are a Consumer, You may have additional rights and protections provided by the local law of the country from which You are accessing the Site or using the Launchpad for purchase purposes.</p>
            </li>
        </ol>
    </li>
</ol>
<p><br />&nbsp;</p>
<p style={{textAlign: "center"}}><strong>GLOSSARY</strong></p>
<p><br />&nbsp;</p>
<p><span size="2"><strong>Blockchain Protocol</strong></span> means computer technologies and protocols that (a) use a shared, distributed, replicable, and verifiable ledger whose integrity and temporal ordering are based on cryptographic functions and whose access is decentralized and governed by a consensus protocol that allows new items to be written to the ledger according to the rules imposed by the protocol; (b) that ledger consists of chain-linked blocks of recorded information, where each block is closed by a cryptographic hash and the next block begins with that same hash;</p>
<p><span size="2"><strong>Buyer</strong></span> has the meaning set forth in Clause 3.1(b);</p>
<p><span size="2"><strong>Clause</strong></span> means any Clause of the Launchpad GTCs;</p>
<p><span size="2"><strong>Consumer</strong></span> means any natural person who is acting for purposes which are outside his/her trade, business or profession;</p>
<p><span size="2"><strong>Cookie Policy</strong></span> means the information on the use of cookies on the Site available at https://www.google.com/url?q=https://www.iubenda.com/privacy-policy/97319236&amp;sa=D&amp;source=docs&amp;ust=1653069701042860&amp;usg=AOvVaw12jWwMyPrSun5QYgHLbvgP;</p>
<p><span size="2"><strong>Data</strong></span> the information relating to the Users necessary to use the Launchpad , as well as all the information transmitted by the device with which the Users uses the Launchpad;</p>
<p><span size="2"><strong>Gas Fee</strong></span> means any payment of a transaction fee required by the Blockchain Protocol used by the Launchpad, whichever it is, to any operation or transaction that occurs on such a protocol, which in turn enable operation and transaction on the Launchpad;</p>
<p><span size="2"><strong>Glossary</strong></span> means this section of the Launchpad GTCs;</p>
<p><span size="2"><strong>IDO</strong></span> means any initial decentralized exchange offerings, also known by the abbreviation &ldquo;Initial DEX Offerings&rdquo; and &ldquo;IDO&rdquo;, meaning offerings of Tokens that occur through decentralized liquidity exchanges, which in turn are crypto-asset exchange that utilizes liquidity pools;</p>
<p><span size="2"><strong>IDO Launchpad Agreement</strong></span> means the agreement entered into by and between the Buyer and PEAKDEFI that governs certain rights and obligations relating to the launch of a given IDO by means the Launchpad, including but not limited to the fees due by the Seller to PEAKDEFI;</p>
<p><span size="2"><strong>Intellectual Property Rights&nbsp;</strong></span> means patents, utility models, designs, copyrights, trademarks or service marks, rights in the topography of semiconductor products, database rights, rights contained in confidential information, including know-how and trade and industrial secrets, moral rights or other similar rights in any country and, whether or not they are registered, any application for registration of any of the foregoing rights and all rights relating to the filing of applications for registration of any of the foregoing rights which are owned by, licensed to or otherwise lawfully used any Party;</p>
<p><span size="2"><strong>KYC/AML&nbsp;</strong></span> means, depending on the context, the process or describes the set of measures that form &quot;know-your-customer&quot; and &ldquo;source of funds verification&rdquo; procedures and that are taken to comply with laws or regulations relating to anti-money laundering;</p>
<p><span size="2"><strong>Launchpad&nbsp;</strong></span> has the meaning set forth in Clause 1.3;</p>
<p><span size="2"><strong>Launchpad GTCs</strong></span> has the meaning set forth in Clause 2.1;</p>
<p><span size="2"><strong>PEAKDEFI</strong></span> has the meaning set forth in Clause 1.1;</p>
<p><span size="2"><strong>PEAK Token</strong></span> means the $PEAK Token, a blockchain-based token which is issued, stored, transferred, transacted, launched as a BEP-20 asset on the Binance Smart Chain Network;</p>
<p><span size="2"><strong>Personal Data</strong></span> means any information concerning an identified or identifiable natural person (&quot;data subject&quot;); an identifiable person is any natural person who can be identified, directly or indirectly, with particular reference to an identifier such as a name, an identification number, location data, an online identifier or one or more characteristic elements of his/her physical, physiological, genetic, mental, economic, cultural or social identity information necessary to use the Services. For more information, We recommend You to read the Privacy Policy;</p>
<p><span size="2"><strong>Privacy Policy</strong></span><span size="2">&nbsp; means PEAKDEFI&apos;s privacy policy regarding the processing of personal data of Users available&nbsp;</span><a href="https://www.iubenda.com/privacy-policy/97319236"><u>here</u></a>;</p>
<p><span size="2"><strong>Privacy Law&nbsp;</strong></span> means any privacy laws or regulation about privacy, data protection and data circulation that may apply to PEAKDEFI;</p>
<p><span size="2"><strong>Seller</strong></span> has the meaning set forth in Clause 3.1(a);</p>
<p><span size="2"><strong>Site</strong></span> has the meaning set forth in Clause 1.2;</p>
<p><span size="2"><strong>Smart Contracts</strong></span> means a <a href="https://en.wikipedia.org/wiki/Computer_program">computer program</a> or a <a href="https://en.wikipedia.org/wiki/Transaction_Protocol_Data_Unit">transaction protocol</a> run on a Blockchain Protocol which is intended to automatically execute, control or document legally relevant events and actions according to the terms of a <a href="https://en.wikipedia.org/wiki/Contract">contract</a> or an agreement;</p>
<p><span size="2"><strong>Staking Protocol</strong></span> means the decentralized protocol designed for Users to stake PEAK Tokens for the purpose of using the Lunchpad available at https://launchpad.peakdefi.com/allocation-stakinghttps://peakdefi.com/fund/;</p>
<p><span size="2"><strong>Third Party</strong></span> means subject other than PEAKDEFI or the Users;</p>
<p><span size="2"><strong>Tokens</strong></span> means any kind of cryptographic assets constructed by means of Smart Contracts and transactable through a Blockchain Protocol;</p>
<p><span size="2"><strong>User</strong></span><span size="2"> means any user of the Platform, also referred to, depending on the context, as &ldquo;</span><span size="2"><strong>You</strong></span><span size="2">&rdquo;, &ldquo;</span><span size="2"><strong>Your</strong></span><span size="2">&rdquo; and &ldquo;</span><span size="2"><strong>Yours</strong></span>&rdquo;;</p>
<p><span size="2"><strong>Wallet</strong></span> means a tool that You can use to interact with a <a href="https://academy.binance.com/en/articles/how-does-blockchain-work">blockchain</a> network;</p>
<p><span size="2"><strong>Wallet Address</strong></span><span size="2"> means&nbsp;</span>a randomly generated set of alphanumeric characters where tokens or NFTs are stored.</p>
<p><br />&nbsp;</p>
            </div>
        </main>

    </div>);
}

export default TermsAndConditions;