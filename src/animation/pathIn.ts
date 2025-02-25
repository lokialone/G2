import { Line } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { effectTiming } from './utils';

export type PathInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const PathIn: AC<PathInOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const length = (shape as Line).getTotalLength?.() || 0;

    const keyframes = [
      { lineDash: [0, length] },
      { lineDash: [length, 0] },
    ] as any[];
    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

PathIn.props = {};
