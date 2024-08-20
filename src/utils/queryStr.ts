const geneRateQueryString = (query: any) => {
  return Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
    )
    .join("");
};

export default geneRateQueryString;
