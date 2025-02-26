const geneRateQueryString = (query: any) => {
    console.log('i am from generateQuer',query)
  return Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
    )
    .join("");
};

export default geneRateQueryString;
