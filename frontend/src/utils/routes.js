import { spring } from 'react-router-transition';

// we need to map the `scale` prop we define below
// to the transform style property
export function switchRouteMapStyles(styles) {
  return {
    opacity  : styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
export function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping  : 22
  });
}

// child matches will...
export const SWITCH_ROUTE_BOUNCE_TRANSITION = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale  : 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale  : bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale  : bounce(1)
  }
};
