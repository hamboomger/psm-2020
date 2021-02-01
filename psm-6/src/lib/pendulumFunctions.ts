type AngleUnits = 'rad' | 'deg';

export const pendulum = {
  theta(pivot: [number, number], pendulum: [number, number], units: AngleUnits): number {
    const adjSide = Math.abs(pivot[1] - pendulum[1]);
    const oppSide = Math.abs(pivot[0] - pendulum[0]);

    console.log(adjSide);
    console.log(oppSide);


    const angleRad = Math.atan(oppSide / adjSide) ;
    return units === 'rad' ? angleRad : angleRad * 180 / Math.PI
  },

  getStringLength(pivot: [number, number], pendulum: [number, number]): number {
    const adjSide = Math.abs(pivot[1] - pendulum[1]);
    const oppSide = Math.abs(pivot[0] - pendulum[0]);
    return Math.sqrt(Math.pow(adjSide, 2) + Math.pow(oppSide, 2));
  },

  thetaFunction(maxAngleRad: number, sLength: number): (t: number) => number {
    const g = 9.807;
    const T = 2 * Math.PI * Math.sqrt(sLength / g);
    return (t) => (maxAngleRad * Math.cos(2*Math.PI/T*t)) * 180 / Math.PI;
  },

  getCoords(pivot: [number, number], angleDeg: number, sLength: number): [number, number] {
    const adjSide = sLength * Math.cos(angleDeg * Math.PI / 180);
    const oppSide = sLength * Math.sin(angleDeg * Math.PI / 180);

    return [pivot[0]+oppSide, pivot[1]+adjSide];
  }
}
