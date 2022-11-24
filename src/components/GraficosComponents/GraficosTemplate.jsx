import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { useThemeHook } from "../../hooks/useTheme";

function GraficosTemplate({ type, data, name, height = "auto" }) {
  const [chart, setChart] = useState(null);

  const colors = useThemeHook();

  React.useEffect(() => {
    if (chart !== null) {
      chart.data.labels = config.data.labels.map((labels) => labels);
      chart.data.datasets = config.data.datasets.map((data) => data);
      chart.update();
    } else {
      Chart.register(...registerables);
      const ctx = document.getElementById(name);
      const myChart = new Chart(ctx, config);
      setChart(myChart);
    }
  }, [chart, data]);

  const config = {
    type: type,
    data: data,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: colors.palette.text.accent,
          },
          position: "top",
        },
      },
    },
  };
  return <canvas id={name} width="auto" height={height} />;
}

export { GraficosTemplate };
