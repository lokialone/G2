import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingRight: 50,
  paddingBottom: 50,
  paddingLeft: 80,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived', 'sex'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  })
  .encode('y', 'pclass')
  .shareSize(true);

const facetRect2 = facetRect
  .facetRect()
  .encode('x', 'survived')
  .axis('y', false)
  .axis('x', {
    tickFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
    position: 'bottom',
  })
  .shareSize(true);

const facetRect3 = facetRect2
  .facetRect()
  .encode('y', 'sex')
  .shareSize(true)
  .axis('x', false)
  .axis('y', { position: 'left' });

facetRect3
  .point()
  .transform({ type: 'pack' })
  .legend('color', { tickFormatter: (d) => (d === '1' ? 'Yes' : 'No') })
  .encode('color', 'survived')
  .encode('shape', 'point')
  .encode('size', 3);

chart.render();
