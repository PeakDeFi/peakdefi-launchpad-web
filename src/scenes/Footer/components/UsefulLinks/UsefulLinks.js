import classes from "./UsefulLinks.module.scss";
import Logo from "../../../../resources/logo.svg";
import { useState } from "react";

const UsefulLinks = () => {
  const [fancyButtons, setFancyButtons] = useState([
    {
      link: "https://ethereum.org/en/",
      text: "Build on Ethereum",
      icon: "https://peakdefi.com/assets/img/eth-diamond-rainbow.png",
    },
    {
      link: "https://docs.soliditylang.org/en/v0.7.4/",
      text: "Crafted with Solidity",
      icon: "https://peakdefi.com/assets/img/solidity-logo.svg",
    },
  ]);

  const [genericLinks, setGenericLinks] = useState([
    {
      title: "Products",
      links: [
        {
          text: "PEAKDEFI",
          link: "https://peakdefi.com/investor-portal/portfolio",
        },
        {
          text: "PEAKDEFI (BSC)",
          link: "https://bsc.peakdefi.com/investor-portal/staking",
        },
        { text: "Governance", link: "https://gov.peakdefi.com/" },
        { text: "Wallet", link: "https://peakdefi.com/download" },
      ],
    },

    {
      title: "Resources",
      links: [
        {
          text: "Whitepaper",
          link: "https://peakdefi.com/assets/pdf/PEAKDEFI_Whitepaper_v0.3.pdf",
        },
        { text: "Help Center", link: "https://documents.peakdefi.com" },
        {
          text: "Security Audits",
          link: "https://launchpad-peakdefi-source.s3.eu-central-1.amazonaws.com/PeakDeFi+Launchpad+smart+contract+audit.pdf",
        },
        {
          text: "Apply for Sale",
          link: "https://docs.google.com/forms/d/e/1FAIpQLSegvMul19PQnl5OE_QoUONKwlsGEOk6V_b_jLCrFaTaDDHwmQ/viewform?usp=sf_link",
        },
        { text: "FAQ", link: "/faq" },
        { text: "Tier System", link: "/tier-system" },
      ],
    },

    {
      title: "Company",
      links: [
        { text: "Support", link: "https://forms.gle/b7XdDV9DKRKysY8S9" },
        {
          text: "Privacy Policy",
          link: "https://www.iubenda.com/privacy-policy/97319236",
        },
        {
          text: "Vision & Mission",
          link: "https://peakdefi.com/vision-and-mission.html",
        },
        { text: "Terms and Conditions", link: "/terms-and-conditions" },
      ],
    },
  ]);

  return (
    <div className={classes.UsefulLinks}>
      <div className={classes.fancyLinks}>
        <img src={Logo} className={classes.logo} />

        <div className={classes.buttons}>
          {fancyButtons.map((e) => (
            <a key={e.link} href={e.link}>
              <div className={classes.content}>
                <img src={e.icon} />
                <div>{e.text}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className={classes.genericLinks}>
        {genericLinks.map((block) => (
          <div className={classes.linksBlock} key={block.title}>
            <h6>{block.title}</h6>
            <div className={classes.links}>
              {block.links.map((link) => (
                <a
                  href={link.link}
                  key={link.link}
                  data-tut={
                    link.text === "Help Center" ? "gitbook_section" : link.link
                  }
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;
