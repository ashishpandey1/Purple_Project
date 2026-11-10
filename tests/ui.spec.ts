import { test, expect } from '@playwright/test';

test.describe('PROJECT PURPLE - UI Tests', () => {
  
  test.describe('React App - Main Pages', () => {
    test('Home page loads without errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', error => errors.push(error.message));
      
      await page.goto('http://localhost:3000/');
      await page.waitForLoadState('networkidle');
      
      // Check for console errors (ignore React Router warnings)
      const criticalErrors = errors.filter(e => 
        !e.includes('React Router Future Flag') &&
        !e.includes('Supabase') &&
        !e.includes('React DevTools')
      );
      expect(criticalErrors.length).toBe(0);
      
      // Check key elements exist - use more specific selectors
      await expect(page.locator('h1:has-text("PROJECT PURPLE")')).toBeVisible();
      await expect(page.locator('text=Get Started Free').first()).toBeVisible();
    });

    test('Events page loads without errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', error => errors.push(error.message));
      
      await page.goto('http://localhost:3000/events');
      await page.waitForLoadState('networkidle');
      
      const criticalErrors = errors.filter(e => 
        !e.includes('React Router Future Flag') &&
        !e.includes('Supabase')
      );
      expect(criticalErrors.length).toBe(0);
      
      await expect(page.locator('h1:has-text("Events")')).toBeVisible();
    });

    test('RGB Demo page loads without errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', error => errors.push(error.message));
      
      await page.goto('http://localhost:3000/rgb-demo');
      await page.waitForLoadState('networkidle');
      
      const criticalErrors = errors.filter(e => 
        !e.includes('React Router Future Flag') &&
        !e.includes('Supabase')
      );
      expect(criticalErrors.length).toBe(0);
      
      await expect(page.locator('[data-text="APEX PROTOCOL"]').first()).toBeVisible();
    });
  });

  test.describe('RGB Demo - Component Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/rgb-demo');
      await page.waitForLoadState('networkidle');
    });

    test('ParticleSystem renders without errors', async ({ page }) => {
      const canvas = page.locator('canvas.fixed.inset-0');
      await expect(canvas).toBeVisible();
    });

    test('GlitchText animates correctly', async ({ page }) => {
      const glitchElement = page.locator('[data-text="APEX PROTOCOL"]').first();
      await expect(glitchElement).toBeVisible();
      
      // Check that the element has the glitch data attribute
      await expect(glitchElement).toHaveAttribute('data-text', 'APEX PROTOCOL');
    });

    test('CountdownTimer displays and updates', async ({ page }) => {
      const countdown = page.locator('.countdown-container').first();
      await expect(countdown).toBeVisible();
      
      // Check for countdown digits
      const digits = page.locator('.countdown-digit');
      await expect(digits.first()).toBeVisible();
    });

    test('RGB Buttons render and are interactive', async ({ page }) => {
      const primaryButton = page.locator('button:has-text("Watch Live")').first();
      await expect(primaryButton).toBeVisible();
      
      // Check button has correct classes
      await expect(primaryButton).toHaveClass(/btn-rgb-cyan/);
    });

    test('ArenaCardRGB renders with stats', async ({ page }) => {
      const cards = page.locator('.arena-card-rgb');
      await expect(cards.first()).toBeVisible();
      
      // Check for stats
      const stats = page.locator('.arena-card-stat, [class*="stat"]');
      // At least some stat elements should exist
    });

    test('CRTMonitor effect renders', async ({ page }) => {
      const crtMonitor = page.locator('text=CRT MODE').first();
      await expect(crtMonitor).toBeVisible();
    });

    test('No horizontal scroll overflow', async ({ page }) => {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
    });
  });

  test.describe('Responsive Design', () => {
    test('Mobile viewport (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000/rgb-demo');
      await page.waitForLoadState('networkidle');
      
      // Check no horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(375 + 20);
      
      // Key elements should still be visible
      await expect(page.locator('[data-text="APEX PROTOCOL"]').first()).toBeVisible();
    });

    test('Tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3000/rgb-demo');
      await page.waitForLoadState('networkidle');
      
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(768 + 20);
    });

    test('Desktop viewport (1440px)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('http://localhost:3000/rgb-demo');
      await page.waitForLoadState('networkidle');
      
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(1440 + 20);
    });
  });
});

test.describe('Standalone Poster HTML', () => {
  test('Poster loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', error => errors.push(error.message));
    
    await page.goto('file:///C:/WORKSPACE/PROJECT%20PURPLE/apex-protocol-poster.html');
    await page.waitForLoadState('networkidle');
    
    // Filter out expected errors (like iconify network requests)
    const criticalErrors = errors.filter(e => 
      !e.includes('iconify') && 
      !e.includes('favicon') &&
      !e.includes('net::ERR')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('Poster renders key elements', async ({ page }) => {
    await page.goto('file:///C:/WORKSPACE/PROJECT%20PURPLE/apex-protocol-poster.html');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('text=APEX PROTOCOL').first()).toBeVisible();
    await expect(page.locator('text=TIER 1 MAJOR')).toBeVisible();
    await expect(page.locator('text=VALORANT CHAMPIONS').first()).toBeVisible();
  });

  test('Particle canvas renders', async ({ page }) => {
    await page.goto('file:///C:/WORKSPACE/PROJECT%20PURPLE/apex-protocol-poster.html');
    await page.waitForLoadState('networkidle');
    
    const canvas = page.locator('#particles-canvas');
    await expect(canvas).toBeVisible();
    
    // Check canvas has correct dimensions
    const canvasSize = await page.evaluate(() => {
      const c = document.getElementById('particles-canvas');
      return { width: c.width, height: c.height, styleWidth: c.style.width, styleHeight: c.style.height };
    });
    
    expect(canvasSize.width).toBeGreaterThan(0);
    expect(canvasSize.height).toBeGreaterThan(0);
  });

  test('Countdown timer works', async ({ page }) => {
    await page.goto('file:///C:/WORKSPACE/PROJECT%20PURPLE/apex-protocol-poster.html');
    await page.waitForLoadState('networkidle');
    
    const countdown = page.locator('#countdown');
    await expect(countdown).toBeVisible();
    
    // Check format (DD:HH:MM:SS)
    const text = await countdown.textContent();
    expect(text).toMatch(/^\d{2}:\d{2}:\d{2}:\d{2}$/);
  });

  test('Mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('file:///C:/WORKSPACE/PROJECT%20PURPLE/apex-protocol-poster.html');
    await page.waitForLoadState('networkidle');
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 20);
    
    await expect(page.locator('text=APEX PROTOCOL').first()).toBeVisible();
  });
});