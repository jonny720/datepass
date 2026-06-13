/**
 * Safe-zone positioning utility for the escaping No button
 * 
 * This utility manages the playful "escaping" button behavior on the main question screen.
 * It ensures the button always stays fully visible within a safe container boundary
 * and provides varied visual transformations to make the interaction feel intentional.
 */

export type SafeZone =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ButtonTransform {
  x: number; // pixels from left edge of container
  y: number; // pixels from top edge of container
  scale: number; // scale multiplier (0.8 to 1.1)
  rotate: number; // degrees (-4 to 4)
  borderRadius: string; // CSS border-radius value
}

export interface SafeZoneConfig {
  containerWidth: number;
  containerHeight: number;
  buttonWidth: number;
  buttonHeight: number;
  edgePadding: number; // minimum distance from edges
  reduceMotion?: boolean;
}

// Configuration constants
export const ESCAPE_LIMIT = 7;
export const ESCAPE_COOLDOWN_MS = 450;
export const SAFE_EDGE_PADDING = 16;
export const MIN_TOUCH_TARGET_HEIGHT = 44;

// Shape variations for different escape attempts
const SHAPE_VARIATIONS = [
  { scale: 1.0, rotate: 0, borderRadius: '9999px' }, // Pill
  { scale: 0.9, rotate: -2, borderRadius: '0.75rem' }, // Smaller rounded
  { scale: 1.05, rotate: 2, borderRadius: '9999px' }, // Slightly larger pill
  { scale: 0.85, rotate: -3, borderRadius: '0.5rem' }, // Compact rounded
  { scale: 1.0, rotate: 3, borderRadius: '9999px' }, // Rotated pill
  { scale: 0.9, rotate: -1, borderRadius: '0.625rem' }, // Smaller button
  { scale: 1.0, rotate: 0, borderRadius: '0.75rem' }, // Final stable state
];

/**
 * Calculate safe position for a specific zone
 */
function calculateZonePosition(
  zone: SafeZone,
  config: SafeZoneConfig
): { x: number; y: number } {
  const { containerWidth, containerHeight, buttonWidth, buttonHeight, edgePadding } = config;

  // Available space after accounting for button size and padding
  const maxX = containerWidth - buttonWidth - edgePadding;
  const maxY = containerHeight - buttonHeight - edgePadding;
  const minX = edgePadding;
  const minY = edgePadding;

  // Calculate positions based on zone
  const centerX = (containerWidth - buttonWidth) / 2;
  const centerY = (containerHeight - buttonHeight) / 2;

  // Add some randomness within each zone (±10% of available space)
  const jitterX = (Math.random() - 0.5) * (containerWidth * 0.1);
  const jitterY = (Math.random() - 0.5) * (containerHeight * 0.1);

  let x = centerX;
  let y = centerY;

  switch (zone) {
    case 'top-left':
      x = minX + Math.abs(jitterX * 0.5);
      y = minY + Math.abs(jitterY * 0.5);
      break;
    case 'top-center':
      x = centerX + jitterX * 0.3;
      y = minY + Math.abs(jitterY * 0.5);
      break;
    case 'top-right':
      x = maxX - Math.abs(jitterX * 0.5);
      y = minY + Math.abs(jitterY * 0.5);
      break;
    case 'middle-left':
      x = minX + Math.abs(jitterX * 0.5);
      y = centerY + jitterY * 0.3;
      break;
    case 'middle-right':
      x = maxX - Math.abs(jitterX * 0.5);
      y = centerY + jitterY * 0.3;
      break;
    case 'bottom-left':
      x = minX + Math.abs(jitterX * 0.5);
      y = maxY - Math.abs(jitterY * 0.5);
      break;
    case 'bottom-center':
      x = centerX + jitterX * 0.3;
      y = maxY - Math.abs(jitterY * 0.5);
      break;
    case 'bottom-right':
      x = maxX - Math.abs(jitterX * 0.5);
      y = maxY - Math.abs(jitterY * 0.5);
      break;
  }

  // Defensive clamping as final safety layer
  x = Math.max(minX, Math.min(x, maxX));
  y = Math.max(minY, Math.min(y, maxY));

  return { x, y };
}

/**
 * Select next safe zone, avoiding repetition and ensuring variety
 */
function selectNextZone(previousZone: SafeZone | null): SafeZone {
  const allZones: SafeZone[] = [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  // Filter out the previous zone to avoid immediate repetition
  const availableZones = previousZone
    ? allZones.filter((z) => z !== previousZone)
    : allZones;

  // Randomly select from available zones
  const randomIndex = Math.floor(Math.random() * availableZones.length);
  return availableZones[randomIndex];
}

/**
 * Get the next safe button transform for an escape attempt
 * 
 * @param config - Container and button dimensions
 * @param previousZone - The previous zone (to avoid repetition)
 * @param attempt - Current escape attempt number (0-indexed)
 * @returns ButtonTransform with safe position and visual variations
 */
export function getNextSafeButtonTransform(
  config: SafeZoneConfig,
  previousZone: SafeZone | null,
  attempt: number
): ButtonTransform & { zone: SafeZone } {
  // Select next safe zone
  const zone = selectNextZone(previousZone);

  // Calculate safe position
  const { x, y } = calculateZonePosition(zone, config);

  // Get shape variation for this attempt
  const variationIndex = Math.min(attempt, SHAPE_VARIATIONS.length - 1);
  const variation = SHAPE_VARIATIONS[variationIndex];

  // If reduced motion is enabled, use simpler transforms
  const transform: ButtonTransform = config.reduceMotion
    ? {
        x,
        y,
        scale: 1.0,
        rotate: 0,
        borderRadius: '0.75rem',
      }
    : {
        x,
        y,
        scale: variation.scale,
        rotate: variation.rotate,
        borderRadius: variation.borderRadius,
      };

  return { ...transform, zone };
}

/**
 * Get the final stable position for the button after all escapes
 */
export function getFinalStableTransform(config: SafeZoneConfig): ButtonTransform {
  const { containerWidth, buttonWidth } = config;

  // Center horizontally, place in lower-middle area
  const x = (containerWidth - buttonWidth) / 2;
  const y = config.containerHeight * 0.65; // 65% down the container

  return {
    x,
    y,
    scale: 1.0,
    rotate: 0,
    borderRadius: '0.75rem',
  };
}
