import { createChart, CrosshairMode  } from "lightweight-charts";

export function createNewChart() {
  const chartProp = {
    width: 1500,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    crosshair: {
    mode: CrosshairMode.Normal,
    vertLine: {
      visible: true,
      labelVisible: true,
    },
    horzLine: {
      visible: true,
      labelVisible: true, // Shows the price on the right scale
    },
  },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
    layout: {
      background: {
        color: "#020618",
      },
      textColor: "#D1D5DB",
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: true,
    },
    handleScale: {
      mouseWheel: true,
      pinch: true,
    },
  };
  const chartContainer = document.querySelector("#chart-container");
  if (chartContainer !== null) {
    const chart = createChart(chartContainer, chartProp);
    return chart;
  }
  return null;
}
