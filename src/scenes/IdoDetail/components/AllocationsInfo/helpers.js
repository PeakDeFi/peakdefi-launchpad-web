export const contractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x34b90aafAE59A5011b5c136434003EF62fD0029a";
  }

  if (sale_name?.toLowerCase() === "anote") {
    return "0xB3D11c5B7E955302d785a20B8B69538F257624CE";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x822d943d3eb14CB7D040FA3D1dF959e30E753904";
  }
};

export const tgeContractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x56473A8F9388b8185004a86044649eDc4e70f16F";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x822d943d3eb14CB7D040FA3D1dF959e30E753904";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xB3D11c5B7E955302d785a20B8B69538F257624CE";
  }

  return undefined;
};
