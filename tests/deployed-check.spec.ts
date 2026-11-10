import { test, expect } from '@playwright/test';

test.describe('Deployed Site Check - https://purple-project.onrender.com', () => {
  test('Take full page screenshot of deployed site', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', error => errors.push(error.message));
    
    await page.goto('https://purple-project.onrender.com/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForLoadState('networkidle');
    
    // Filter out expected errors
    const criticalErrors = errors.filter(e => 
      !e.includes('iconify') && 
      !e.includes('favicon') &&
      !e.includes('net::ERR') &&
      !e.includes('React Router Future Flag') &&
      !e.includes('Supabase') &&
      !e.includes('React DevTools')
    );
    
    console.log('Console errors:', errors);
    console.log('Critical errors:', criticalErrors);
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'deployed-site-full.png', 
      fullPage: true 
    });
    
    // Take viewport screenshot
    await page.screenshot({ 
      path: 'deployed-site-viewport.png' 
    });
    
    // Check key elements
    await expect(page.locator('body')).toBeVisible();
    
    // Check for horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    console.log('Body width:', bodyWidth, 'Viewport width:', viewportWidth);
    
    // Check key elements exist
    const hasProjectPurple = await page.locator('text=PROJECT PURPLE').first().isVisible().catch(() => false);
    const hasProjectPurple2 = await page.locator('text=Project Purple').first().isVisible().catch(() => false);
    console.log('Has PROJECT PURPLE:', hasProjectPurple, hasProjectPurple2);
    
    // Check navigation
    const nav = page.locator('nav');
    const navExists = await nav.count();
    console.log('Nav elements:', navExists);
    
    // Check main content
    const main = page.locator('main');
    const mainExists = await main.count();
    console.log('Main elements:', mainExists);
    
    // Check footer
    const footer = page.locator('footer');
    const footerExists = await footer.count();
    console.log('Footer elements:', footerExists);
    
    // Check for RGB demo link
    const rgbDemoLink = page.locator('a[href="/rgb-demo"]');
    const rgbDemoExists = await rgbDemoLink.count();
    console.log('RGB Demo link:', rgbDemoExists);
    
    // Take screenshots of specific sections
    const hero = page.locator('section').first();
    if (await hero.count() > 0) {
      await hero.screenshot({ path: 'hero-section.png' });
    }
    
    console.log('All checks completed');
  });
  
  test('Check RGB Demo page on deployed site', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', error => errors.push(error.message));
    
    await page.goto('https://purple-project.onrender.com/rgb-demo', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'deployed-rgb-demo-full.png', 
      fullPage: true 
    });
    
    await page.screenshot({ 
      path: 'deployed-rgb-demo-viewport.png' 
    });
    
    console.log('RGB Demo errors:', errors);
    
    // Check key components
    const canvas = page.locator('canvas.fixed.inset-0');
    const canvasVisible = await canvas.isVisible().catch(() => false);
    console.log('ParticleSystem canvas visible:', canvasVisible);
    
    const glitchText = page.locator('[data-text="APEX PROTOCOL"]').first();
    const glitchVisible = await glitchText.isVisible().catch(() => false);
    console.log('GlitchText visible:', glitchVisible);
    
    const countdown = page.locator('.countdown-container').first();
    const countdownVisible = await countdown.isVisible().catch(() => false);
    console.log('CountdownTimer visible:', countdownVisible);
  });
});