import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

// @todo
export type PathOptions = {
  [key: string]: any;
};

/**
 * A filled path.
 */
export const Path: SC<PathOptions> = (options) => {
  return Color({ colorAttribute: 'fill', ...options });
};

Path.props = {
  defaultEnterAnimation: 'fadeIn',
};
