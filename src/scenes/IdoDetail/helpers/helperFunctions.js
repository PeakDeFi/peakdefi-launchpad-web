export const shouldShowTable = (sale_name) => {
  if (sale_name === "sugar kingdom odyssey") {
    return false;
  }
  if (sale_name === "edge video ai") {
    return false;
  }

  if (sale_name === "anote") {
    return false;
  }

  if (sale_name === "vendetta") {
    return false;
  }

  if (sale_name === "octavia") {
    return false;
  }
  return true;
};
