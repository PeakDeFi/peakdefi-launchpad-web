export const contractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x34b90aafAE59A5011b5c136434003EF62fD0029a";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xd38ACf6CD7d840B64dEA325bf4bE0A27fba2b696";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x21E0034eA7212abDb0Ae3670ab4EbDc5d5Bf5D59";
  }
  if (sale_name?.toLowerCase() === "octavia") {
    return "0xE0D35BEb22A03207a365c0f82dDdA1a7AA1Ae030";
  }
  if (sale_name?.toLowerCase() === "edge video ai") {
    return "0x39204F2d08ca1A0d11a82aCA03055cC2EC4592C7";
  }
  if (sale_name?.toLowerCase() === "eywa") {
    return "0x52cAbF5a4f66af09c4B110AD1E8CC6d994A249f4";
  }
  if (sale_name?.toLowerCase() === "bit rivals") {
    return "0x2aB412CBA52CbB0A3C6b33a2585B6e62110e6b87";
  }
};

export const tgeContractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x899e0D7bd342ECE88632c8F35A256568DFb7F6cc";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x21E0034eA7212abDb0Ae3670ab4EbDc5d5Bf5D59";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xd38ACf6CD7d840B64dEA325bf4bE0A27fba2b696";
  }

  return undefined;
};
