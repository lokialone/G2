import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { CompositionComponent as CC } from '../runtime';
import { TreeMark } from '../spec';
import {
  Tree as TreeTransform,
  TreeOptions as TreeTransformOptions,
} from '../data/tree';

export type TreeOptions = Omit<TreeMark, 'type'>;

export const Tree: CC<TreeOptions> = (options) => {
  const DEFAULT_LAYOUT_OPTIONS: TreeTransformOptions = {
    sortBy: (a, b) => b.value - a.value,
  };
  const DEFAULT_NODE_OPTIONS = {
    axis: false,
    legend: false,
    type: 'point',
    encode: {
      x: 'x',
      y: 'y',
      size: 2,
      shape: 'point',
    },
  };
  const DEFAULT_LINK_OPTIONS = {
    type: 'link',
    encode: {
      x: 'x',
      y: 'y',
      shape: 'smooth',
    },
  };
  const DEFAULT_LABEL_OPTIONS = {
    text: '',
    fontSize: 10,
  };
  return () => {
    const {
      data,
      encode = {},
      scale = {},
      style = {},
      layout = {},
      nodeLabels = [],
      linkLabels = [],
      animate = {},
    } = options;
    const valueEncode = encode?.value;
    const { nodes, edges } = TreeTransform({
      ...DEFAULT_LAYOUT_OPTIONS,
      ...layout,
      field: valueEncode,
    })(data);

    return [
      deepMix({}, DEFAULT_LINK_OPTIONS, {
        data: edges,
        encode: subObject(encode, 'link'),
        scale: subObject(scale, 'link'),
        labels: linkLabels,
        style: { stroke: '#999', ...subObject(style, 'link') },
        animate:
          typeof animate === 'object' ? subObject(animate, 'link') : animate,
      }),
      deepMix({}, DEFAULT_NODE_OPTIONS, {
        data: nodes,
        scale: subObject(scale, 'node'),
        encode: subObject(encode, 'node'),
        labels: [
          {
            ...DEFAULT_LABEL_OPTIONS,
            ...subObject(style, 'label'),
          },
          ...nodeLabels,
        ],
        style: { ...subObject(style, 'node') },
        animate:
          typeof animate === 'object' ? subObject(animate, 'node') : animate,
      }),
    ];
  };
};

Tree.props = { composite: true };
