export const contractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x34b90aafAE59A5011b5c136434003EF62fD0029a";
  }

  if (sale_name?.toLowerCase() === "anote") {
    return "0xB3D11c5B7E955302d785a20B8B69538F257624CE";
  }
};

export const tgeContractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x32bAAa94E06f3E54910fA431deFd0Ccb3404eF47";
  }

  return undefined;
};