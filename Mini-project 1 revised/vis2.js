function vis2(top, div)
{
  // margin convention
  const margin = {top: 30, right: 100, bottom: 50, left: 100};
  const visWidth = 1200 - margin.left - margin.right;
  const visHeight = 750 - margin.top - margin.bottom;

  /*const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
                                visHeight + margin.top + margin.bottom));*/
  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);


  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // add title
g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Distribution of Donations by Reason and Country");

  // create scales
  const receiving = ['Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile',
       'Colombia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
       'Finland', 'France', 'Greece', 'Hungary', 'Iceland', 'India',
       'Ireland', 'Italy', 'Japan', 'Korea', 'Latvia', 'Lithuania',

       'Romania', 'Saudi Arabia', 'Slovak Republic', 'South Africa',
       'Spain', 'Taiwan', 'Thailand', 'United Arab Emirates',
       'United Kingdom']
  //'Luxembourg', 'New Zealand', 'Norway', 'Poland', 'Portugal',
  //, 'Kuwait', 'Qatar', 'Slovenia', 'Sweden'
  const reason = ['Air transport', 'Industrial development',
       'Power generation\\/non-renewable sources','Rail transport',
       'RESCHEDULING AND REFINANCING']

  const y = d3.scalePoint()
      .domain(receiving)
      .range([0, visHeight])
      .padding(0.5);

  const x = d3.scalePoint()
      .domain(reason)
      .range([50, visWidth -margin.right])
      .padding(0.2);

  const maxRadius = 15;
  const radius = d3.scaleSqrt()
      .domain([100000, 15000000000])
      .range([3, 15]);

  // add legend

  const legend = g.append("g")
    .attr("transform", `translate(${visWidth + margin.right - 120}, 0)`)
    .selectAll("g")
    .data([15000000, 150000000, 1500000000, 15000000000])
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * 2.5 * maxRadius})`);

  legend.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", "steelblue");

  legend.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("dominant-baseline", "middle")
    .attr("x", maxRadius)
    .text(d => d);

  // create and add axes

  const xAxis = d3.axisBottom(x);

  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth/2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("font-size",20)
      .attr("text-anchor", "middle")
      .text("Reasons");

  const yAxis = d3.axisLeft(y);

  g.append("g")
      .call(yAxis)
      .attr("transform", `translate(50, 0)`)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", -65)
      .attr("y", visHeight / 2)
      .attr("fill", "black")
      .attr("font-size",20)
      .attr("dominant-baseline", "middle")
      .text("Countries");

  // draw points

  const rows = g.selectAll(".row")
    .data(top)
    .join("g")
      .attr("transform", d => `translate(${x(d.purpose)},0)`);

  rows.selectAll("circle")
    .data(d => d.countries)
    .join("circle")
      .attr("cx", d => 0)
      .attr("cy", d => y(d.countries))
      .attr("fill", "steelblue")
      .attr("r", d => radius(d.amount_received));

}
