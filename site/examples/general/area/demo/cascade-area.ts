import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
});

chart
  .area()
  .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true })
  .encode('x', (d) => new Date(d.year))
  .encode('y', 'revenue')
  .encode('series', 'format')
  .encode('color', 'group')
  .encode('shape', 'smooth')
  .axis('y', { tickFormatter: '~s' });

chart
  .line()
  .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' })
  .encode('x', (d) => new Date(d.year))
  .encode('y', 'revenue')
  .encode('series', 'format')
  .encode('shape', 'smooth')
  .style('stroke', 'white');

chart.render();
