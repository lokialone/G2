import { throttle, deepMix } from '@antv/util';
import { selectPlotArea, mousePosition } from './utils';

function maybeCoordinate(options) {
  const { coordinate = [] } = options;
  const fisheye = coordinate.find((d) => d.type === 'fisheye');
  if (fisheye) return fisheye;
  const newFisheye = { type: 'fisheye' };
  coordinate.push(newFisheye);
  options.coordinate = coordinate;
  return newFisheye;
}

/**
 * @todo Bind abstract data or data index.
 */
export function Fisheye({
  wait = 30,
  leading,
  trailing = false,
}: Record<string, any>) {
  return (context) => {
    const { options, update, container } = context;
    const plotArea = selectPlotArea(container);

    // Clone options and mutate it.
    const clonedOptions = deepMix({}, options, { animate: false });
    const updateFocus = throttle(
      (event) => {
        const focus = mousePosition(plotArea, event);
        if (!focus) return;
        const [x, y] = focus;
        const fisheye = maybeCoordinate(clonedOptions);
        fisheye.focusX = x;
        fisheye.focusY = y;
        fisheye.isVisual = true;
        update(clonedOptions);
      },
      wait,
      { leading, trailing },
    ) as (...args: any[]) => void;

    // Bind events.
    plotArea.addEventListener('pointerenter', updateFocus);
    plotArea.addEventListener('pointermove', updateFocus);
    plotArea.addEventListener('pointerleave', updateFocus);

    return () => {
      plotArea.removeEventListener('pointerenter', updateFocus);
      plotArea.removeEventListener('pointermove', updateFocus);
      plotArea.removeEventListener('pointerleave', updateFocus);
    };
  };
}
