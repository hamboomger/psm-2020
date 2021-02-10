import * as d3 from "d3";
import './plot.css';
import {PhaseSpaceDataObservable, PSDSubscriber} from "./PhaseSpaceDataObservable";
import {PhaseSpace} from "../../lib/pendulumFunctions";

export type DataElem = { t: number, theta: number, dotTheta: number }
export type PlotData = Array<DataElem>;

export class D3PlotBuilder {
  private padding = 20;
  private width: number;
  private height: number;
  private innerWidth: number;
  private innerHeight: number;

  private readonly ref: SVGSVGElement;
  private selection?: d3.Selection<SVGGElement, unknown, null, undefined>

  constructor(width: number, height: number, svgRef: SVGSVGElement) {
    this.width = width;
    this.height = height;
    this.ref = svgRef;

    this.innerWidth = width - this.padding*2;
    this.innerHeight = height - this.padding*2;
  }

  drawPlotLine(patchNumber: number, phaseSpace: PhaseSpace) {
    const data: PlotData = phaseSpace.map(d => {
      const [t, [theta, dotTheta]] = d;
      return { t, theta, dotTheta };
    });

    const xValRangeRad = Math.PI / 2;
    const yValRangeRad = Math.PI / 8;
    const xValue = (d: DataElem) => d.theta;
    const yValue = (d: DataElem) => d.dotTheta;

    const xScale = d3.scaleLinear()
      .domain([-xValRangeRad, xValRangeRad])
      .range([0, this.innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([-yValRangeRad, yValRangeRad])
      .range([0, this.innerHeight])
      .nice();

    const lineGen = d3.line<DataElem>()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveNatural);

    var path = this.selection!.append("path")
      .attr("d", lineGen(data)!)
      .attr("stroke", "darkgrey")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var totalLength = path.node()!.getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      // .attr('class', 'plot-line')
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 1)
  }

  buildPlotPlane() {
    const svg = d3.select(this.ref);

    const xValRangeRad = Math.PI / 2;
    const yValRangeRad = Math.PI / 8;
    const xValue = (d: DataElem) => d.theta;
    const yValue = (d: DataElem) => d.dotTheta;

    const xScale = d3.scaleLinear()
      .domain([-xValRangeRad, xValRangeRad])
      .range([0, this.innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([-yValRangeRad, yValRangeRad])
      .range([0, this.innerHeight])
      .nice();

    this.selection = svg.append('g')
      .attr('transform', `translate(${this.padding}, ${this.padding})`)

    const xAxis = d3.axisBottom(xScale)
      .tickSize(-this.innerHeight)
      .tickFormat(formatToPi);

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-this.innerWidth)
      .tickFormat(formatToPi);

    const yAxisG = this.selection.append('g').call(yAxis)
      .attr('transform', `translate(${this.innerWidth / 2}, 0)`);

    const xAxisG = this.selection.append('g').call(xAxis)
      .attr('transform', `translate(0, ${this.innerHeight / 2})`);

    yAxisG.append('text')
      .attr('fill', 'black')
      .attr('x', '45')
      .attr('y', '5')
      .text('theta dot');

    yAxisG.selectAll(".tick line")
      .attr('class', 'plot-tick')
      .attr("x1", (this.width - (2 * this.padding)) / 2 * -1)
      .attr("x2", (this.width - (2 * this.padding)) / 2);

    xAxisG.selectAll(".tick line")
      .attr('class', 'plot-tick')
      .attr("y1", (this.width - (2 * this.padding)) / 2 * -1)
      .attr("y2", (this.width - (2 * this.padding)) / 2);
  }
}

function formatToPi(value: d3.NumberValue): string {
  const valInPi = value.valueOf() / Math.PI;
  return `${valInPi.toFixed(2)} \u03c0`;
}
