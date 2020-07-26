// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/data_final.csv', d3.autoType),
  d3.json('data/sample_2.json'),
  d3.csv('data/donations.csv', d3.autoType),
  d3.json('data/countries.json'),
]).then(([data, data_2,donations,geoJSON]) => {
  vis1(data, d3.select('#vis1'));
  vis2(data_2, d3.select('#vis2'));
  vis3(geoJSON,donations);
});
