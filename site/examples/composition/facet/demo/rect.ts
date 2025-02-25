/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingRight: 80,
  paddingBottom: 50,
  paddingLeft: 50,
  height: 600,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: ({
          culmen_depth_mm: depth,
          culmen_length_mm: length,
          ...d
        }) => ({
          ...d,
          culmen_depth_mm: depth === 'NaN' ? NaN : depth,
          culmen_length_mm: length === 'NaN' ? NaN : length,
        }),
      },
    ],
  })
  .encode('x', 'sex')
  .encode('y', 'species');

facetRect
  .point()
  .facet(false)
  .frame(false)
  .encode('x', 'culmen_depth_mm')
  .encode('y', 'culmen_length_mm')
  .style('r', 3)
  .style('fill', '#ddd')
  .style('stroke', 'none');

facetRect
  .point()
  .encode('x', 'culmen_depth_mm')
  .encode('y', 'culmen_length_mm')
  .encode('color', 'island');

chart.render();
