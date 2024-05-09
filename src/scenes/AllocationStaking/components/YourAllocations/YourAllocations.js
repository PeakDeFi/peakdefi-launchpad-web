import React, { useEffect, useState } from "react";
import WithdrawDaily from "../WithdrawDaily/WithdrawDaily";
import DistributionSKO from "../DistributionComponents/DistributionSKO";
import WithdrawLinear from "../WithdrawLinear/WithdrawLinear";

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
      case "Oranges":
        break;
      case "sugar kingdom odyssey":
        setShow("sko");
        break;
      case "octavia":
        setShow("liner");
        break;
      default:
        setShow("daily");
    }
  }, []);

  return (
    <div>
      {show === "daily"  && (
        <WithdrawDaily
          contractAddress={contractAddress}
          tgeContractAddress={tgeContractAddress}
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
