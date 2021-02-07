import React from "react";
import {IPendulumStore} from "../../lib/AppState";
import {pendulum, PhaseSpace, PhaseSpaceParams, Vector} from "../../lib/pendulumFunctions";
import './plot.css';
import {PhaseSpaceDataObservable, PSDSubscriber} from "./PhaseSpaceDataObservable";
import {D3PlotBuilder} from "./D3PlotBuilder";

interface Props {
  width: number
  height: number
  pendInfo: IPendulumStore
  params: PhaseSpaceParams
}

interface State {
  currentPatch: number;
}

function createObservable(pivotCoords: Vector, pendCoords: Vector): PhaseSpaceDataObservable {
  const theta = pendulum.theta(pivotCoords, pendCoords, 'rad');
  const L = pendulum.getStringLength(pivotCoords, pendCoords);
  return new PhaseSpaceDataObservable(theta, L);
}

class PhaseSpacePlot extends React.Component<Props, State> implements PSDSubscriber {
  private svgRef = React.createRef<SVGSVGElement>();
  private observable?: PhaseSpaceDataObservable;
  private plotBuilder?: D3PlotBuilder;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPatch: 1,
    }
  }

  notify(patchNumber: number, phaseSpace: PhaseSpace): void {
    console.log('notified')
    this.plotBuilder?.drawPlotLine(patchNumber, phaseSpace);
  }

  componentDidMount() {
    this.plotBuilder = new D3PlotBuilder(this.props.width, this.props.height, this.svgRef.current!);
    this.plotBuilder.buildPlotPlane();
  }

  render() {
    const { animationStarted, pendCoords, pivotCoords } = this.props.pendInfo;
    console.log('Rendered');
    if (animationStarted && !this.observable) {
      this.observable = createObservable(pivotCoords, pendCoords);
      this.observable.subscribe(this);
      this.observable.startCalculations(this.props.params, 1000);
    } else if (!animationStarted && this.observable) {
      this.observable.stopCalculations();
    }
    return (
      <>
        <svg style={{width: '100%'}} ref={this.svgRef} />
      </>
    )
  }
}

export default PhaseSpacePlot
