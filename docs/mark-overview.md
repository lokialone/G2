# 标记（Mark）

绘制抽象数据。

## API

<a name="mark-label" href="#mark-label">#</a> mark.**label**(<i>options</i>)

绘制数据标签，支持的配置如下：

| 参数        | 说明                                                                                                                   | 类型                                                 | 默认值        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------- |
| text        | 文本内容                                                                                                               | `Primitive \| Function`                              | -             |
| position    | 标签在几何图形的位置                                                                                                   | `'left' \| 'right' \| 'bottom' \| 'top' \| 'inside' \| 'top-left' \| 'top-right' \| 'botton-left' \| 'bottom-right'` | -             |
| x           | 相对于父元素的 x 坐标，可以是像素值，也可以是百分比（相对于父元素的宽度）。优先级比由 position 得到的默认 x 坐标高。   | `number \| string`                                   | -             |
| y           | 相对于父元素的 y 坐标，可以是像素值，也可以是百分比（相对于父元素的高度度）。优先级比由 position 得到的默认 y 坐标高。 | `number \| string`                                   | -             |
| formatter   | 格式化文本的函数，支持 [d3-format](https://github.com/d3/d3-format) 所定义的字符串。                             | `string \| Formatter`                                | `d => d + ''` |
| \[StyeKey\] | G 所支持的样式的键                                                                                                     | `string \| Formatter`                                | -             |

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 600,
  });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      type: 'fetch',
      format: 'csv',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .scale('y', { formatter: '.1%' })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'steelblue')
    .label({
      text: 'frequency',
      textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
      fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
      dx: (d) => (+d.frequency > 0.008 ? '-5px' : '5px'),
      formatter: '.1%',
    });

  return chart.render().node();
})();
```
