export const getTierValues = (name) => {
  if (name === "bit rivals") {
    return [200, 550, 950, 2100, 4200, 7500];
  }
  if (name === "edge video ai") {
    return [200, 550, 950, 2100, 4200, 7500];
  }

  return [55, 120, 200, 300, 500, 850];
};
