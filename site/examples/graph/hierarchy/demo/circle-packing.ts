import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 20,
});

chart
  .pack()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    padding: 5,
  })
  .encode('value', 'value')
  .encode('color', 'depth')
  .scale('color', {
    domain: [0, 5],
    range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
    interpolate: interpolateHcl,
  })
  .style('labelText', (d) =>
    d.r >= 10 && d.height === 0 ? `${d.data.name}` : '',
  )
  .axis(false)
  .legend(false);

chart.render();
