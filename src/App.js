import React, { useState } from "react";

export default function App() {
  const [points, setPoints] = useState([]);
  const [undonePoints, setUndonePoints] = useState([]);

  function handleClick(e) {
    console.log(e.screenY);
    setPoints((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
  }

  function handleUndo(e) {
    shiftPoint(points, setUndonePoints, setPoints);
  }

  function handleRedo(e) {
    shiftPoint(undonePoints, setPoints, setUndonePoints);
  }

  function shiftPoint(targetArray, function1, function2) {
    let newPoints = [...targetArray];
    let popedPoint = newPoints.pop();
    if (popedPoint) {
      function1((prev) => [...prev, popedPoint]);
      function2(newPoints);
    }
  }

  function renderPoints() {
    let returnArr = [];
    console.log("points", points);
    if (points) {
      points.forEach((value, i) => {
        returnArr.push(
          <Circle key={i} position={{ x: value.x, y: value.y }}></Circle>
        );
      });
    }

    return returnArr;
  }

  return (
    <div className="App">
      <div className="header-container">
        <div className="shadow">
          <h1>SVG Circles</h1>
        </div>
        <div className="button-container">
          <button onClick={(e) => handleUndo(e)}>UNDO</button>
          <button onClick={(e) => handleRedo(e)}>REDO</button>
        </div>
      </div>

      <div className="target-div" onClick={(e) => handleClick(e)}>
        {points.length === 0 && <h2>Click any where to draw</h2>}
        <svg className="canvas">{renderPoints()}</svg>
      </div>
    </div>
  );
}

function Circle({ position }) {
  return (
    <circle
      cx={position.x}
      cy={position.y}
      r="30"
      stroke="#A4B0FB"
      strokeWidth="5"
      fill="#FDF8D5"
      fill-opacity="0.5"
    />
  );
}
