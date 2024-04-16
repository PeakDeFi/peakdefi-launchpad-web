export const shouldShowTable = (sale_name) => {
  if (sale_name === "sugar kingdom odyssey") {
    return false;
  }

  if (sale_name === "anote") {
    return false;
  }

  if (sale_name === "vendetta") {
    return false;
  }
  return true;
};
