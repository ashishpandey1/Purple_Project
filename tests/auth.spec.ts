import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

test.describe.configure({ retries: 0, timeout: 60000 })

test.describe.serial('Authentication Flow', () => {
  test('register → login → dashboard flow', async ({ page }) => {
    // Capture console logs
    page.on('console', msg => console.log('BROWSER:', msg.text()))
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message))

    const email = `test-${Date.now()}@example.com`
    const password = 'password123'

    // 1. Go to home page
    await page.goto(BASE)
    await expect(page).toHaveTitle(/PROJECT PURPLE/)

    // 2. Click "Get Started Free" → goes to register
    await page.click('a:has-text("Get Started Free")')
    await expect(page).toHaveURL(`${BASE}/register`)

    // 3. Fill registration form
    await page.fill('input[id="fullName"]', 'Test User')
    await page.fill('input[id="email"]', email)
    await page.fill('input[id="password"]', 'password123')
    await page.fill('input[id="confirmPassword"]', 'password123')

    // 4. Submit registration
    await page.click('button:has-text("Create Account")')

    // 5. Mock auto-confirms email and signs in → redirects to dashboard
    await expect(page).toHaveURL(`${BASE}/dashboard`)

    // 5. Check what's on the dashboard
    const bodyText = await page.locator('body').textContent()
    console.log('Dashboard body text:', bodyText?.substring(0, 500))

    // Check for either transactions or "No transactions yet"
    const hasTransactions = await page.locator('tbody tr').isVisible({ timeout: 5000 }).catch(() => false)
    const hasNoTransactions = await page.locator('text=No transactions yet').isVisible({ timeout: 5000 }).catch(() => false)
    
    console.log('Has transactions:', hasTransactions)
    console.log('Has no transactions:', hasNoTransactions)

    // 7. Logout for next test
    await page.click('button:has-text("Sign Out")')
    await expect(page).toHaveURL(BASE)
  })

  test('create payment → QR page → status', async ({ page }) => {
    // First register and login
    const email = `login-${Date.now()}@example.com`
    const password = 'password123'

    await page.goto(`${BASE}/register`)
    await expect(page).toHaveURL(`${BASE}/register`)

    await page.fill('input[id="fullName"]', 'Payment Test')
    await page.fill('input[id="email"]', email)
    await page.fill('input[id="password"]', password)
    await page.fill('input[id="confirmPassword"]', password)
    await page.click('button:has-text("Create Account")')

    // Mock auto-confirms email and signs in → redirects to dashboard
    await expect(page).toHaveURL(`${BASE}/dashboard`)

    // Create a $25 payment
    await page.click('button:has-text("$25 Payment")')

    // Should redirect to payment page with QR code
    await expect(page).toHaveURL(/\/payment\//)
    await expect(page.locator('text=Payment')).toBeVisible()

    // QR code should be visible
    await expect(page.locator('img[alt="Payment QR Code"]')).toBeVisible()

    // Timer should be visible and counting down
    await expect(page.locator('text=/Expires in:/')).toBeVisible()

    // Amount should be $25.00
    await expect(page.locator('text=$25.00')).toBeVisible()

    // Logout for next test
    await page.click('button:has-text("Sign Out")')
    await expect(page).toHaveURL(BASE)
  })

  test('protected routes redirect to login when not authenticated', async ({ page }) => {
    // Clear any existing session
    await page.goto(`${BASE}/login`)
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
    await page.context().clearCookies()

    // Try to access dashboard without login
    await page.goto(`${BASE}/dashboard`)
    await expect(page).toHaveURL(`${BASE}/login`)

    // Try to access payment page without login
    await page.goto(`${BASE}/payment/some-id`)
    await expect(page).toHaveURL(`${BASE}/login`)

    // Try to access profile without login
    await page.goto(`${BASE}/profile`)
    await expect(page).toHaveURL(`${BASE}/login`)
  })
})

test.describe.serial('UI Elements', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto(BASE)
    await expect(page.locator('h1')).toContainText('PROJECT PURPLE')
    await expect(page.locator('text=Get Started Free')).toBeVisible()
    await expect(page.locator('a:has-text("Sign In")').first()).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('a:has-text("Sign In")').first().click()
    await expect(page).toHaveURL(`${BASE}/login`)

    await page.goto(BASE)
    await page.click('a:has-text("Get Started Free")')
    await expect(page).toHaveURL(`${BASE}/register`)
  })
})