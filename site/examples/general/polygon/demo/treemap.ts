import { Chart } from '@antv/g2';
import * as d3 from 'd3-hierarchy';

const layout = (data) => {
  const root = d3.hierarchy(data);
  root.count();
  d3.treemap().size([1, 1])(root);
  return root
    .descendants()
    .map((d) =>
      Object.assign(d, {
        x: [d.x0, d.x1, d.x1, d.x0],
        y: [d.y0, d.y0, d.y1, d.y1],
      }),
    )
    .filter((d) => d.height === 0);
};
const name = (d) => {
  const { name } = d.data;
  return name.length > 5 ? name.slice(0, 4) + '...' : name;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 4,
  paddingBottom: 4,
  paddingRight: 4,
});

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
  transform: [{ type: 'custom', callback: layout }],
});

chart
  .polygon()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('size', 'r')
  .encode('color', (d) => d.parent.data.name)
  .encode('tooltip', (d) => d.parent.data.name)
  .encode('title', '')
  .scale('x', { domain: [0, 1], guide: null })
  .scale('y', { domain: [0, 1], guide: null, range: [0, 1] })
  .scale('size', { type: 'identity' })
  .legend('color', {
    field: '学派',
    size: 72,
    autoWrap: true,
    maxRows: 2,
    cols: 6,
  });

chart
  .text()
  .data({
    transform: [
      { type: 'filterBy', fields: ['height'], callback: (d) => d === 0 },
    ],
  })
  .encode('x', (d) => d.x[0])
  .encode('y', (d) => d.y[0])
  .encode('text', name)
  .style('dy', '15px')
  .style('dx', '5px')
  .style('fill', 'black')
  .style('textAnchor', 'start')
  .style('fontSize', 12);

chart.render();
