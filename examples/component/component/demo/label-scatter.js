import { Chart } from '@antv/g2';

fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      height: 500,
    });
    chart.data(data);
    chart
      .point()
      .position('height*weight')
      .size(4)
      .shape('circle')
      .label('weight', {
        adjustType: 'scatter',
        offset: 0,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: '#fff',
          lineWidth: 2,
        },
      });
    chart.render();
  });
