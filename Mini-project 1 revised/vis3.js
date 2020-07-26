function vis3(geoJSON, donations) {
  const margin = {top: 20, right: 20, bottom: 20, left: 20};

  const visWidth = 1000 - margin.left - margin.right;
  const visHeight = 1000 - margin.top - margin.bottom;

  const don = Object.fromEntries(new Map(donations.map(d => [d.nation, d.diff])));

  const svg = d3.select('#vis3').append('svg')
      .attr('width', visWidth + margin.left + margin.right+500)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left*2}, ${margin.top})`);

  const projection =  d3.geoNaturalEarth1()
      .fitSize([visWidth, visHeight], geoJSON);

  const path = d3.geoPath().projection(projection);

  const maxd = d3.max(donations, d => d.diff);
  const mind = d3.min(donations, d => d.diff);
  console.log(d3.version);



  const changeColor = d3.scaleDiverging([mind,0,maxd], d3.interpolateRdYlGn);



  g.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', function(d) {
      	console.log(d.properties.NAME_LONG,don[d.properties.NAME_LONG]);
      	if(don[d.properties.NAME_LONG])
      		return changeColor(don[d.properties.NAME_LONG]);
      	else
      	{
      		if(d.properties.NAME_LONG === "United States")
      			return changeColor(maxd);
      		return 'darkgray	';
      	}
      })
      .attr('stroke', 'black');

  const mapOutline = d3.geoGraticule().outline();

  g.append('path')
    .datum(mapOutline)
    .attr('d', path)
    .attr('stroke', 'black')
    .attr('fill', 'none');


   const linear = d3.scaleLinear()
  .domain([mind,-36606,3397,maxd])
  .range(["rgb(165, 0, 40)","rgb(251, 180, 104)","rgb(239, 246, 168)", "rgb(0, 105, 55)"]);


svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
  .shapeWidth(75)
  .orient('horizontal')
  .cells(10)
  .scale(linear);

svg.select(".legendLinear")
  .call(legendLinear);

}
