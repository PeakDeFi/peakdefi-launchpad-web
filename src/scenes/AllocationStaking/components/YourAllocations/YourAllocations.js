import React, { useEffect, useState } from "react";
import WithdrawDaily from "../WithdrawDaily/WithdrawDaily";
import DistributionSKO from "../DistributionComponents/DistributionSKO";
import WithdrawLinear from "../WithdrawLinear/WithdrawLinear";
import WithdrawAnote from "../WithdrawAnote/WithdrawAnote";
import WithdrawEywa from "../WithdrawEywa/WithdrawLinear";
const YourAllocations = ({
  name,
  saleContractAddress,
  contractAddress,
  tgeContractAddress,
  tokenName,
  tokenImg,
  tokenSmallName,
}) => {
  const [show, setShow] = useState("daily");

  useEffect(() => {
    switch (name) {
      case "sugar kingdom odyssey":
        setShow("sko");
        break;
      case "octavia":
        setShow("liner");
        break;
      case "bit rivals":
        setShow("liner");
        break;
      case "anote":
        setShow("anote");
        break;
      case "eywa":
        setShow("eywa");
        break;
      default:
        setShow("daily");
    }
  }, []);

  return (
    <div>
      {show === "eywa" && (
        <WithdrawEywa
          saleContractAddress={saleContractAddress}
          contractAddress={contractAddress}
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "daily" && (
        <WithdrawDaily
          saleContractAddress={saleContractAddress}
          contractAddress={contractAddress}
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "anote" && (
        <WithdrawAnote
          contractAddress={contractAddress}
          saleContractAddress={saleContractAddress}
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "sko" && (
        <DistributionSKO
          contractAddress={contractAddress}
          saleContractAddress={saleContractAddress}
          tgeContractAddress={tgeContractAddress}
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "liner" && (
        <WithdrawLinear
          saleContractAddress={saleContractAddress}
          contractAddress={contractAddress}
          type={"liner"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}
    </div>
  );
};

export default YourAllocations;
