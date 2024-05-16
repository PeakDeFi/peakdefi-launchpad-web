import React, { useEffect, useState } from "react";
import WithdrawDaily from "../WithdrawDaily/WithdrawDaily";
import DistributionSKO from "../DistributionComponents/DistributionSKO";
import WithdrawLinear from "../WithdrawLinear/WithdrawLinear";
import WithdrawAnote from "../WithdrawDaily/WithdrawDaily";

const YourAllocations = ({
  name,
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
      case "anote":
        setShow("anote");
        break;
      default:
        setShow("daily");
    }
  }, []);

  return (
    <div>
      {show === "daily" && (
        <WithdrawDaily
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
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "sko" && (
        <DistributionSKO
          contractAddress={contractAddress}
          tgeContractAddress={tgeContractAddress}
          type={"daily"}
          tokenName={tokenName}
          tokenImg={tokenImg}
          tokenSmallName={tokenSmallName}
        />
      )}

      {show === "liner" && (
        <WithdrawLinear
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
