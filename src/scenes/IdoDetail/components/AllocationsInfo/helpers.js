export const contractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x34b90aafAE59A5011b5c136434003EF62fD0029a";
  }

  if (sale_name?.toLowerCase() === "anote") {
    return "0xB3D11c5B7E955302d785a20B8B69538F257624CE";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x0cb4a12b298244a56b7bdFC26Eb3A1D1e5dcFaBa";
  }
  if (sale_name?.toLowerCase() === "octavia") {
    return "0xADc0ACe4dE87923Ea2DeFF82e2e69112362e9C32";
  }
};

export const tgeContractAddressFetcher = (sale_name) => {
  if (sale_name?.toLowerCase() === "sugar kingdom odyssey") {
    return "0x56473A8F9388b8185004a86044649eDc4e70f16F";
  }
  if (sale_name?.toLowerCase() === "vendetta") {
    return "0x0cb4a12b298244a56b7bdFC26Eb3A1D1e5dcFaBa";
  }
  if (sale_name?.toLowerCase() === "anote") {
    return "0xB3D11c5B7E955302d785a20B8B69538F257624CE";
  }

  return undefined;
};
