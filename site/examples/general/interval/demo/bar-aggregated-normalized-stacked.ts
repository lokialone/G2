/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/stacked_bar_h_normalized_labeled.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'transpose' });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filterBy',
        fields: [['year', (d) => d === 2000]],
      },
    ],
  })
  .transform({ type: 'groupX', y: 'sum' })
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('y', { tickFormatter: '.0%' })
  .label({ text: 'people', position: 'inside', fill: 'white' });

chart.render();
