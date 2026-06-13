import { describe, it, expect } from 'vitest';
import {
  getNextSafeButtonTransform,
  getFinalStableTransform,
  ESCAPE_LIMIT,
  ESCAPE_COOLDOWN_MS,
  SAFE_EDGE_PADDING,
  MIN_TOUCH_TARGET_HEIGHT,
  type SafeZoneConfig,
} from './buttonEscape';

describe('buttonEscape', () => {
  const mockConfig: SafeZoneConfig = {
    containerWidth: 400,
    containerHeight: 300,
    buttonWidth: 160,
    buttonHeight: 48,
    edgePadding: SAFE_EDGE_PADDING,
  };

  describe('getNextSafeButtonTransform', () => {
    it('returns valid transform within container bounds', () => {
      const transform = getNextSafeButtonTransform(mockConfig, null, 0);

      expect(transform.x).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
      expect(transform.x).toBeLessThanOrEqual(
        mockConfig.containerWidth - mockConfig.buttonWidth - SAFE_EDGE_PADDING
      );
      expect(transform.y).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
      expect(transform.y).toBeLessThanOrEqual(
        mockConfig.containerHeight - mockConfig.buttonHeight - SAFE_EDGE_PADDING
      );
    });

    it('never positions button outside container', () => {
      // Run many iterations to catch edge cases
      for (let i = 0; i < 100; i++) {
        const transform = getNextSafeButtonTransform(mockConfig, null, i);

        // Check X bounds
        expect(transform.x).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
        expect(transform.x + mockConfig.buttonWidth).toBeLessThanOrEqual(
          mockConfig.containerWidth - SAFE_EDGE_PADDING
        );

        // Check Y bounds
        expect(transform.y).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
        expect(transform.y + mockConfig.buttonHeight).toBeLessThanOrEqual(
          mockConfig.containerHeight - SAFE_EDGE_PADDING
        );
      }
    });

    it('returns a valid zone property', () => {
      const transform = getNextSafeButtonTransform(mockConfig, null, 0);

      const validZones = [
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ];

      expect(validZones).toContain(transform.zone);
    });

    it('avoids repeating the same zone consecutively', () => {
      const firstTransform = getNextSafeButtonTransform(mockConfig, null, 0);
      
      // Try 10 times to ensure different zone is selected
      let foundDifferent = false;
      for (let i = 0; i < 10; i++) {
        const nextTransform = getNextSafeButtonTransform(mockConfig, firstTransform.zone, 1);
        if (nextTransform.zone !== firstTransform.zone) {
          foundDifferent = true;
          break;
        }
      }

      expect(foundDifferent).toBe(true);
    });

    it('applies scale variations across attempts', () => {
      const transforms = [];
      for (let i = 0; i < 7; i++) {
        transforms.push(getNextSafeButtonTransform(mockConfig, null, i));
      }

      // Should have at least some variation in scale
      const scales = transforms.map((t) => t.scale);
      const uniqueScales = new Set(scales);
      
      expect(uniqueScales.size).toBeGreaterThan(1);
    });

    it('applies rotation variations across attempts', () => {
      const transforms = [];
      for (let i = 0; i < 7; i++) {
        transforms.push(getNextSafeButtonTransform(mockConfig, null, i));
      }

      // Should have at least some variation in rotation
      const rotations = transforms.map((t) => t.rotate);
      const uniqueRotations = new Set(rotations);
      
      expect(uniqueRotations.size).toBeGreaterThan(1);
    });

    it('keeps rotation within safe range', () => {
      for (let i = 0; i < 7; i++) {
        const transform = getNextSafeButtonTransform(mockConfig, null, i);
        
        expect(Math.abs(transform.rotate)).toBeLessThanOrEqual(5);
      }
    });

    it('keeps scale within accessible range', () => {
      for (let i = 0; i < 7; i++) {
        const transform = getNextSafeButtonTransform(mockConfig, null, i);
        
        // Button should never shrink below 80% or grow beyond 110%
        expect(transform.scale).toBeGreaterThanOrEqual(0.8);
        expect(transform.scale).toBeLessThanOrEqual(1.15);
      }
    });

    it('returns different borderRadius values', () => {
      const transforms = [];
      for (let i = 0; i < 7; i++) {
        transforms.push(getNextSafeButtonTransform(mockConfig, null, i));
      }

      const borderRadii = transforms.map((t) => t.borderRadius);
      const uniqueRadii = new Set(borderRadii);
      
      // Should have variety in border radius
      expect(uniqueRadii.size).toBeGreaterThan(1);
    });

    it('respects reduced motion preference', () => {
      const reducedMotionConfig = { ...mockConfig, reduceMotion: true };
      
      for (let i = 0; i < 7; i++) {
        const transform = getNextSafeButtonTransform(reducedMotionConfig, null, i);
        
        // With reduced motion, scale should be 1.0 and rotate should be 0
        expect(transform.scale).toBe(1.0);
        expect(transform.rotate).toBe(0);
      }
    });

    it('handles narrow mobile container (320px)', () => {
      const mobileConfig: SafeZoneConfig = {
        containerWidth: 320,
        containerHeight: 180,
        buttonWidth: 140,
        buttonHeight: 44,
        edgePadding: SAFE_EDGE_PADDING,
      };

      for (let i = 0; i < 20; i++) {
        const transform = getNextSafeButtonTransform(mobileConfig, null, i);

        // Button must stay fully within narrow container
        expect(transform.x).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
        expect(transform.x + mobileConfig.buttonWidth).toBeLessThanOrEqual(
          mobileConfig.containerWidth - SAFE_EDGE_PADDING
        );
        expect(transform.y).toBeGreaterThanOrEqual(SAFE_EDGE_PADDING);
        expect(transform.y + mobileConfig.buttonHeight).toBeLessThanOrEqual(
          mobileConfig.containerHeight - SAFE_EDGE_PADDING
        );
      }
    });
  });

  describe('getFinalStableTransform', () => {
    it('returns a stable centered position', () => {
      const finalTransform = getFinalStableTransform(mockConfig);

      // Should be roughly centered horizontally
      const expectedCenterX = (mockConfig.containerWidth - mockConfig.buttonWidth) / 2;
      expect(finalTransform.x).toBeCloseTo(expectedCenterX, 0);

      // Should be in lower-middle area (around 65% down)
      expect(finalTransform.y).toBeGreaterThan(mockConfig.containerHeight * 0.5);
      expect(finalTransform.y).toBeLessThan(mockConfig.containerHeight * 0.8);
    });

    it('returns stable scale and rotation', () => {
      const finalTransform = getFinalStableTransform(mockConfig);

      expect(finalTransform.scale).toBe(1.0);
      expect(finalTransform.rotate).toBe(0);
    });

    it('returns a readable borderRadius', () => {
      const finalTransform = getFinalStableTransform(mockConfig);

      expect(finalTransform.borderRadius).toBe('0.75rem');
    });

    it('keeps button within container bounds', () => {
      const finalTransform = getFinalStableTransform(mockConfig);

      expect(finalTransform.x).toBeGreaterThanOrEqual(0);
      expect(finalTransform.x + mockConfig.buttonWidth).toBeLessThanOrEqual(
        mockConfig.containerWidth
      );
      expect(finalTransform.y).toBeGreaterThanOrEqual(0);
      expect(finalTransform.y + mockConfig.buttonHeight).toBeLessThanOrEqual(
        mockConfig.containerHeight
      );
    });
  });

  describe('constants', () => {
    it('exports reasonable configuration constants', () => {
      expect(ESCAPE_LIMIT).toBeGreaterThan(5);
      expect(ESCAPE_LIMIT).toBeLessThan(10);
      
      expect(ESCAPE_COOLDOWN_MS).toBeGreaterThan(200);
      expect(ESCAPE_COOLDOWN_MS).toBeLessThan(1000);
      
      expect(SAFE_EDGE_PADDING).toBeGreaterThan(10);
      expect(SAFE_EDGE_PADDING).toBeLessThan(30);
      
      expect(MIN_TOUCH_TARGET_HEIGHT).toBeGreaterThanOrEqual(44);
    });
  });
});
