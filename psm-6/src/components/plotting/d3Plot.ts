import * as d3 from "d3";

export type DataElem = { t: number, theta: number, dotTheta: number }
export type PlotData = Array<DataElem>

export function buildD3Plot(data: PlotData, ref: SVGSVGElement, width: number, height: number) {
  const svg = d3.select(ref)

  const margin = {top: 20, right: 20, bottom: 20, left: 20};
  const circleRad = 1;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d: DataElem) => d.theta;
  const yValue = (d: DataElem) => d.dotTheta;

  const xScale = d3.scaleLinear()
    .domain([-2 * Math.PI, 2 * Math.PI])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([-Math.PI, Math.PI])
    .range([0, innerHeight]);

  const xPresScale = d3.scalePoint()
    .range([0, innerWidth])
    .domain(["-2 \u03c0", "-1.5 \u03c0", "-\u03c0", "-0.5 \u03c0", "0",
      "0.5 \u03c0", "\u03c0", "1.5 \u03c0", "2 \u03c0"]);

  const yPresScale = d3.scalePoint()
    .range([0, innerWidth])
    .domain(["-\u03c0", "-0.75 \u03c0", "-0.50 \u03c0", "-0.25 \u03c0", "0",
      "0.25 \u03c0", "0.50 \u03c0", "0.75 \u03c0", "\u03c0"]);

  console.log(`xScale domain: ${xScale.domain()}`)
  console.log(`yScale domain: ${yScale.domain()}`)
  console.log(data);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // @ts-ignore
  const yAxis = d3.axisLeft(yPresScale).tickSize(-innerWidth, 0, 0);

  const xAxis = d3.axisBottom(xPresScale).tickSize()

  const yAxisG = g.append('g').call(yAxis)
    .attr('transform', `translate(${innerWidth / 2}, 0)`);

  yAxisG.append('text')
    .attr('fill', 'black')
    .attr('x', '45')
    .attr('y', '5')
    .text('theta dot');

  yAxisG.selectAll(".tick line")
    .attr("stroke", "#59ADEB")
    .attr("opacity", "0.5")
    .attr("x1", (width - (2 * margin.left)) / 2 * -1)
    .attr("x2", (width - (2 * margin.right)) / 2);

  // yAxisPlot.selectAll(".tick line")
  //   .attr("x1", (width - (2*padding))/2 * -1)
  //   .attr("x2", (width - (2*padding))/2 * 1);

  g.append('g').call(d3.axisBottom(xPresScale))
    .attr('transform', `translate(0, ${innerHeight / 2})`);

  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cy", d => yScale(d.dotTheta))
    .attr("cx", d => xScale(d.theta))
    .attr("r", circleRad);
}
