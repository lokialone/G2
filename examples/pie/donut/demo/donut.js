// FIXME: 默认选中，文本 && Tooltip 交互
import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];
const chart = new Chart({
  container: 'container',
  height: 500,
});
chart.data(data);
chart.scale('percent', {
  formatter: (val) => {
    val = val * 100 + '%';
    return val;
  },
});
chart.coordinate('theta', {
  radius: 0.75,
  innerRadius: 0.6,
});
chart.tooltip({
  showTitle: false,
  showTooltipMarkers: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
});
chart.axis(false);
// 辅助文本
chart
  .annotation()
  .text({
    position: ['50%', '50%'],
    content: '主机',
    style: {
      fontSize: 14,
      fill: '#8c8c8c',
      textAlign: 'center',
    },
    offsetY: -20,
  })
  .text({
    position: ['50%', '50%'],
    content: '200',
    style: {
      fontSize: 20,
      fill: '#8c8c8c',
      textAlign: 'center',
    },
    offsetX: -10,
    offsetY: 20,
  })
  .text({
    position: ['50%', '50%'],
    content: '台',
    style: {
      fontSize: 14,
      fill: '#8c8c8c',
      textAlign: 'center',
    },
    offsetY: 20,
    offsetX: 20,
  });
chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item')
  .label('percent', (percent) => {
    return {
      content: (data) => {
        return `${data.item}: ${percent * 100}%`;
      },
    };
  })
  .tooltip('item*percent', (item, percent) => {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: percent,
    };
  })
  .style({
    lineWidth: 1,
    stroke: '#fff',
  });
chart.render();
