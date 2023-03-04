import { SVG } from "@svgdotjs/svg.js";
import React, { useEffect } from "react";

export default function SpinnerError() {
  const idCanvas = "amva1290Error";
  useEffect(() => {
    let drawPlace = document.getElementById("loading");
    let canvas = document.getElementById(idCanvas);
    if (drawPlace && canvas === null) {
      const width = drawPlace.clientWidth;
      const height = drawPlace.clientHeight / 2;
      canvas = SVG().addTo(`#loading`).size(width, height).id(idCanvas);
      let azucar = "#3D779B";
      let a = "#5AB2E8";
      let t = "#7798AC";
      let g = "#A0CCE8";
      let c = "#295069";
      let size = 10;
      let space = 2;
      const n = width / (size + space) + 5;
      for (let i = -2; i < n; i++) {
        let base = SelectAmino(a, t, c, g);
        let x = i * (size + space);
        let yi = 0;
        let yf = height - size;
        let ym = yf / 2;
        let delay = i * (size + space);
        let c1 = canvas.circle(size).move(x, yi).fill(azucar);
        let r1 = canvas
          .rect(size / 2, ym / 2)
          .move(x + size / 2 / 2, size / 2)
          .fill(base)
          .rx(20)
          .ry(20);
        let dura = SelectDuration();
        let group = canvas.group();
        group.add(r1);
        group.add(c1);
        group
          .animate({
            duration: dura,
            delay: delay,
            times: 1
          })
          .rotate(getRot())
          .move(x, getY(-50));
        let c2 = canvas.circle(size).move(x, ym).fill(azucar);
        let r2 = canvas
          .rect(size / 2, ym / 2)
          .move(x + size / 2 / 2, ym - ym / 2)
          .fill(base)
          .rx(20)
          .ry(20);
        dura = SelectDuration();
        let group2 = canvas.group();
        group2.add(r2);
        group2.add(c2);
        group2.move(x, ym - ym / 2);
        group2
          .animate({
            duration: dura,
            delay: delay,
            times: 1
          })
          .rotate(getRot() * -1)
          .move(x, getY(50));
      }
    }
    return function cleanup() {
      if (canvas !== null) {
        canvas.remove();
      }
    };
  });

  return (
    <div
      id="loading"
      style={{
        height: "200px",
        width: "100%",
        position: "absolute",
        left: "0",
        zIndex: "-1"
      }}
    ></div>
  );
}

function getRot(size) {
  return Math.floor(Math.random() * (360 - 180));
}

function getY(size) {
  return Math.floor(Math.random() * (size - 1)) + 1;
}

function SelectDuration() {
  let a = Math.floor(Math.random() * (5 - 1)) + 1;
  return a * 500;
}

function SelectAmino(a, t, c, g) {
  let n = Math.floor(Math.random() * (4 - 1)) + 1;
  switch (n) {
    case 1:
      return a;
    case 2:
      return g;
    case 3:
      return t;
    case 4:
    default:
      return c;
  }
}
