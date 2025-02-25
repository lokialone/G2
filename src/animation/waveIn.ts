import { arc } from 'd3-shape';
import { Path, CSS, PropertySyntax, convertToPath } from '@antv/g';
import { G2Element } from '../utils/selection';
import { AnimationComponent as AC } from '../runtime';
import { getArcObject } from '../shape/utils';
import { isPolar } from '../utils/coordinate';
import { Animation } from './types';
import { effectTiming } from './utils';
import { ScaleInX } from './scaleInX';

export type WaveInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const WaveIn: AC<WaveInOptions> = (options) => {
  const ZERO = 0.0001;

  // @see https://g-next.antv.vision/zh/docs/api/css/css-properties-values-api#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7
  CSS.registerProperty({
    name: 'waveInArcAngle',
    inherits: false,
    initialValue: '',
    interpolable: true,
    syntax: PropertySyntax.NUMBER,
  });

  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;

    if (!isPolar(coordinate)) {
      return ScaleInX(options)(from, to, value, coordinate, defaults);
    }

    const center = coordinate.getCenter();
    const { __data__, style } = shape as G2Element;
    const { radius = 0, fillOpacity, strokeOpacity, opacity } = style;
    const { points, y, y1 } = __data__;

    const path = arc().cornerRadius(radius as number);
    const arcObject = getArcObject(coordinate, points, [y, y1]);
    const { startAngle, endAngle } = arcObject;
    const pathForConversion = new Path({});

    const createArcPath = (arcParams: {
      startAngle: number;
      endAngle: number;
      innerRadius: number;
      outerRadius: number;
    }) => {
      pathForConversion.attr({
        d: path(arcParams),
        transform: `translate(${center[0]}, ${center[1]})`,
      });
      const convertedPathDefinition = convertToPath(pathForConversion);
      pathForConversion.style.transform = 'none';
      return convertedPathDefinition;
    };

    const keyframes = [
      // Use custom interpolable CSS property.
      {
        waveInArcAngle: startAngle + ZERO,
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
      {
        waveInArcAngle: startAngle + ZERO,
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.01,
      },
      {
        waveInArcAngle: endAngle,
        fillOpacity,
        strokeOpacity,
        opacity,
      },
    ];
    const animation = shape.animate(
      keyframes,
      effectTiming(defaults, value, options),
    );

    animation.onframe = function () {
      shape.style.path = createArcPath({
        ...arcObject,
        endAngle: Number(shape.style.waveInArcAngle),
      });
    };
    animation.onfinish = function () {
      shape.style.path = createArcPath({
        ...arcObject,
        endAngle: endAngle,
      });
    };

    return animation;
  };
};

WaveIn.props = {};
