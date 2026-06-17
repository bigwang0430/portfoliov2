const MEDUSAE_DEFAULTS = {
  cursor: {
    radius: 0.065,
    strength: 3,
    dragFactor: 0.04,
  },
  halo: {
    outerOscFrequency: 2.6,
    outerOscAmplitude: 0.76,
    outerOscJitterStrength: 0.025,
    outerOscJitterSpeed: 0.3,
    radiusBase: 1.5,
    radiusAmplitude: 0.5,
    shapeAmplitude: 0.75,
    rimWidth: 1.8,
    outerStartOffset: 0.4,
    outerEndOffset: 2.2,
    scaleX: 1.3,
    scaleY: 1,
  },
  particles: {
    baseSize: 0.03,
    activeSize: 0.06,
    blobScaleX: 1,
    blobScaleY: 0.6,
    rotationSpeed: 0.1,
    rotationJitter: 0.2,
    cursorFollowStrength: 1,
    oscillationFactor: 1,
    colorBase: '#94fcf2',
    colorOne: '#48f6f9',
    colorTwo: '#ff86c3',
    colorThree: '#ffbbda',
  },
  background: {
    color: '#000000',
  },
}

export default MEDUSAE_DEFAULTS
