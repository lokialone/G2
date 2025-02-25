/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'polar' });

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .transform({ type: 'jitter' })
  .scale('color', { guide: null })
  .encode('x', 'clarity')
  .encode('color', 'clarity');

chart.render();
