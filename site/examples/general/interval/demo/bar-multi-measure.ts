/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingBottom: 150,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
});

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .axis('y', { tickFormatter: '~s' })
  .axis('x', { labelRotate: 90 })
  .encode('x', 'Major Genre')
  .encode('y', 'Worldwide Gross')
  .encode('series', () => 'Worldwide Gross')
  .encode('color', () => 'Worldwide Gross');

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'Major Genre')
  .encode('y', 'US Gross')
  .encode('color', () => 'US Gross')
  .encode('series', () => 'US Gross');

chart.render();
