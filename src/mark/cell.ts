import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { CellGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

export type CellOptions = Omit<CellGeometry, 'type'>;

/**
 * Convert value for each channel to Cell shapes.
 * Calc the bbox of each Cell based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Cell: MC<CellOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const x = scale.x as Band;
    const y = scale.y as Band;
    const P = Array.from(index, (i) => {
      const width = x.getBandWidth(x.invert(+X[i]));
      const height = y.getBandWidth(y.invert(+Y[i]));
      const x1 = +X[i];
      const y1 = +Y[i];
      const p1 = [x1, y1];
      const p2 = [x1 + width, y1];
      const p3 = [x1 + width, y1 + height];
      const p4 = [x1, y1 + height];
      return [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

const shapes = ['rect', 'hollow'];

Cell.props = {
  defaultShape: 'cell',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true, scale: 'band' },
    { name: 'y', required: true, scale: 'band' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroX' },
    { type: 'maybeZeroY' },
    { type: 'maybeZeroPadding' },
  ],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
};
