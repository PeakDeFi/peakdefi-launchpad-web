export const contractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x34b90aafAE59A5011b5c136434003EF62fD0029a";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xd38ACf6CD7d840B64dEA325bf4bE0A27fba2b696";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x49c1a1037D5b22E18f8c4F4aE8377f6833f92f87";
  }
  if (sale_name?.toLowerCase() === "octavia") {
    return "0xADc0ACe4dE87923Ea2DeFF82e2e69112362e9C32";
  }
  if (sale_name?.toLowerCase() === "edge video ai") {
    return "0x39204F2d08ca1A0d11a82aCA03055cC2EC4592C7";
  }
};

export const tgeContractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x899e0D7bd342ECE88632c8F35A256568DFb7F6cc";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x49c1a1037D5b22E18f8c4F4aE8377f6833f92f87";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xd38ACf6CD7d840B64dEA325bf4bE0A27fba2b696";
  }

  return undefined;
};
