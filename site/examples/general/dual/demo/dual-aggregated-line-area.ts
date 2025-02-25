/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_dual_axis.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/weather.json',
  transform: [
    { type: 'filterBy', fields: [['location', (d) => d === 'Seattle']] },
  ],
});

chart
  .area()
  .transform({ type: 'groupX', y: 'mean', y1: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', ['temp_max', 'temp_min'])
  .scale('y', { nice: true })
  .axis('y', { titleFill: '#85C5A6', title: 'Avg. Temperature (°C)' })
  .style('fill', '#85c5A6')
  .style('fillOpacity', 0.3);

chart
  .line()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getMonth())
  .encode('y', 'precipitation')
  .encode('shape', 'smooth')
  .style('stroke', 'steelblue')
  .scale('y', { independent: true })
  .axis('y', {
    position: 'right',
    grid: null,
    title: 'Precipitation (inches)',
    titleFill: 'steelblue',
  });

chart.render();
