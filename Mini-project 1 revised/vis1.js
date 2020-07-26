function vis1(net, div) {
  {
  const margin = {top: 40, right: 20, bottom: 40, left: 180};

  /* width is a part of the Observable standard library.
     it contains the width of the page and is updated
     when you resize the page. */
  const visWidth = 1000 - margin.left - margin.right;
  const visHeight = 700 - margin.top - margin.bottom;

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
    .attr("y", -(margin.top-10))
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Net Donation amounts");

  // create scales

  /*const x = d3.scaleLinear()
      .domain([0, d3.max(net, d => d.net_amount)]).nice()
      .range([0, visWidth]);*/

  const x = d3.scaleLinear()
      .domain([-125000,125000]).nice()
      .range([0, visWidth]);

  const y = d3.scaleBand()
      .domain(net.map(d => d.donor))
      .range([0, visHeight])
      .padding(0.2);

  console.log(x(100000))
  // create and add axes

  const xAxis = d3.axisBottom(x);

  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Donation Amount (in million)");

  const yAxis = d3.axisLeft(y);

  /*g.append("g")
      .call(yAxis)
      .call(g => g.selectAll(".domain").remove());
  */

  // draw bars

  g.selectAll("rect")
    .data(net)
    .join("rect")
      .attr("x", function(d){
                                if(d.net_amount>0)
                                          return x(0);
                                 else return x(0)-x(d.net_amount*-1)+x(0);

                            }
           )
      .attr("y", d => y(d.donor))
      .attr("width", function(d){  if(d.net_amount>0)
                                          return x(d.net_amount)-x(0);
                                    else return x(d.net_amount*-1)-x(0);})
      .attr("height", d => y.bandwidth())
      .attr("fill",function(d){  if(d.net_amount>0)
                                          return "red";
                                    else return "blue";});

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("text")
    .data(net)
    .join("text")
     .attr("dx",function(d){if (d.net_amount>0)
                                  return 475;
                           else
                                return 595;
                           })
     .attr("dy",d=>y(d.donor)+40)
     .text(d=>d.donor)


}
}
