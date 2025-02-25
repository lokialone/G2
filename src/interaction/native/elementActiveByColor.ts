import {
  applyDefaultsActiveStyle,
  createDatumof,
  selectG2Elements,
  createColorKey,
} from './utils';
import { elementActive } from './elementActive';

/**
 * @todo Bind abstract data or data index.
 */
export function ElementActiveByColor(options) {
  return (context) => {
    const { container, view } = context;
    return elementActive(container, {
      ...options,
      ...applyDefaultsActiveStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createColorKey(view),
    });
  };
}
