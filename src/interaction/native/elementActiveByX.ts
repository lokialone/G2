import {
  applyDefaultsActiveStyle,
  createDatumof,
  selectG2Elements,
  createXKey,
} from './utils';
import { elementActive } from './elementActive';

/**
 *
 * @todo Bind abstract data or data index.
 */
export function ElementActiveByX(
  options = { selectedLineWidth: 1, selectedColor: 'black' },
) {
  return (context) => {
    const { container, view } = context;
    return elementActive(container, {
      ...applyDefaultsActiveStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
    });
  };
}
