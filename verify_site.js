const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Starting Playwright automated browser verification...');
  
  // Launch in headful mode (headless: false) and slow down actions so the user can watch
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  // Helper function to capture screenshots
  async function capture(name) {
    const filePath = path.join(__dirname, `screenshot-${name}.png`);
    await page.screenshot({ path: filePath });
    console.log(`[SCREENSHOT] Saved: screenshot-${name}.png`);
  }

  try {
    // 1. Visit homepage
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // Let custom animations play out
    await page.waitForTimeout(2000);
    await capture('home');

    // 2. Visit Approach
    console.log('Navigating to /approach...');
    await page.click('nav a[href="/approach"]');
    // Wait for dynamic API to render
    await page.waitForSelector('.pillar-card.visible');
    await page.waitForTimeout(1000);
    await capture('approach');

    // 3. Visit How It Works
    console.log('Navigating to /how-it-works...');
    await page.click('nav a[href="/how-it-works"]');
    // Wait for steps to render
    await page.waitForSelector('.timeline-step.visible');
    await page.waitForTimeout(1000);
    await capture('how-it-works');

    // 4. Visit Ecosystems
    console.log('Navigating to /ecosystem...');
    await page.click('nav a[href="/ecosystem"]');
    // Wait for cards to render
    await page.waitForSelector('.eco-detail-card.visible');
    await page.waitForTimeout(1000);
    await capture('ecosystem');

    // 5. Visit Projects
    console.log('Navigating to /projects...');
    await page.click('nav a[href="/projects"]');
    // Wait for project list to render
    await page.waitForSelector('.project-detail-card.visible');
    await page.waitForTimeout(1000);
    await capture('projects');

    // 6. Visit Connect & Submit Form
    console.log('Navigating to /connect...');
    await page.click('nav a[href="/connect"]');
    await page.waitForSelector('.form-wrapper.visible');
    await capture('connect');

    console.log('Filling out contact form...');
    await page.fill('#name', 'Autobots Verification');
    await page.fill('#company', 'Glade Replication Labs');
    await page.fill('#email', 'labs@glade.ai');
    await page.fill('#message', 'Verified fully by autonomous Playwright test script in headful mode.');
    await page.waitForTimeout(1000);
    
    console.log('Submitting contact form...');
    await page.click('#submit-btn');
    
    // Wait for success message
    await page.waitForSelector('#success-message', { state: 'visible' });
    console.log('Form submission successful! Success message is visible.');
    await page.waitForTimeout(1500);
    await capture('connect-success');

    console.log('Verification completed successfully!');

  } catch (error) {
    console.error('An error occurred during verification:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
