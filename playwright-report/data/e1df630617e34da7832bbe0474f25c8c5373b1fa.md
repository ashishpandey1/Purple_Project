# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication Flow >> register → login → dashboard flow
- Location: tests\auth.spec.ts:8:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/"
Received: "http://localhost:3000/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    3 × locator resolved to <html lang="en">…</html>
      - unexpected value "http://localhost:3000/dashboard"
    11 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3000/login"

```

```yaml
- banner:
  - link "PROJECT PURPLE":
    - /url: /
  - navigation:
    - link "Home":
      - /url: /
    - link "Dashboard":
      - /url: /dashboard
    - link "Profile":
      - /url: /profile
    - link "Sign In":
      - /url: /login
    - link "Get Started":
      - /url: /register
- main:
  - heading "Welcome Back" [level=1]
  - paragraph: Sign in to your account
  - text: Email
  - textbox "Email":
    - /placeholder: you@example.com
  - text: Password
  - textbox "Password":
    - /placeholder: ••••••••
  - button "Sign In"
  - paragraph: Or continue with
  - button:
    - img
  - button:
    - img
  - paragraph:
    - text: Don't have an account?
    - link "Sign up":
      - /url: /register
  - paragraph:
    - link "Forgot password?":
      - /url: /forgot-password
- contentinfo: © 2026 PROJECT PURPLE • Built with React + Supabase
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | const BASE = 'http://localhost:3000'
  4   | 
  5   | test.describe.configure({ retries: 0, timeout: 60000 })
  6   | 
  7   | test.describe.serial('Authentication Flow', () => {
  8   |   test('register → login → dashboard flow', async ({ page }) => {
  9   |     // Capture console logs
  10  |     page.on('console', msg => console.log('BROWSER:', msg.text()))
  11  |     page.on('pageerror', err => console.log('BROWSER ERROR:', err.message))
  12  | 
  13  |     const email = `test-${Date.now()}@example.com`
  14  |     const password = 'password123'
  15  | 
  16  |     // 1. Go to home page
  17  |     await page.goto(BASE)
  18  |     await expect(page).toHaveTitle(/PROJECT PURPLE/)
  19  | 
  20  |     // 2. Click "Get Started Free" → goes to register
  21  |     await page.click('a:has-text("Get Started Free")')
  22  |     await expect(page).toHaveURL(`${BASE}/register`)
  23  | 
  24  |     // 3. Fill registration form
  25  |     await page.fill('input[id="fullName"]', 'Test User')
  26  |     await page.fill('input[id="email"]', email)
  27  |     await page.fill('input[id="password"]', 'password123')
  28  |     await page.fill('input[id="confirmPassword"]', 'password123')
  29  | 
  30  |     // 4. Submit registration
  31  |     await page.click('button:has-text("Create Account")')
  32  | 
  33  |     // 5. Mock auto-confirms email and signs in → redirects to dashboard
  34  |     await expect(page).toHaveURL(`${BASE}/dashboard`)
  35  | 
  36  |     // 5. Check what's on the dashboard
  37  |     const bodyText = await page.locator('body').textContent()
  38  |     console.log('Dashboard body text:', bodyText?.substring(0, 500))
  39  | 
  40  |     // Check for either transactions or "No transactions yet"
  41  |     const hasTransactions = await page.locator('tbody tr').isVisible({ timeout: 5000 }).catch(() => false)
  42  |     const hasNoTransactions = await page.locator('text=No transactions yet').isVisible({ timeout: 5000 }).catch(() => false)
  43  |     
  44  |     console.log('Has transactions:', hasTransactions)
  45  |     console.log('Has no transactions:', hasNoTransactions)
  46  | 
  47  |     // 7. Logout for next test
  48  |     await page.click('button:has-text("Sign Out")')
> 49  |     await expect(page).toHaveURL(BASE)
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  50  |   })
  51  | 
  52  |   test('create payment → QR page → status', async ({ page }) => {
  53  |     // First register and login
  54  |     const email = `login-${Date.now()}@example.com`
  55  |     const password = 'password123'
  56  | 
  57  |     await page.goto(`${BASE}/register`)
  58  |     await expect(page).toHaveURL(`${BASE}/register`)
  59  | 
  60  |     await page.fill('input[id="fullName"]', 'Payment Test')
  61  |     await page.fill('input[id="email"]', email)
  62  |     await page.fill('input[id="password"]', password)
  63  |     await page.fill('input[id="confirmPassword"]', password)
  64  |     await page.click('button:has-text("Create Account")')
  65  | 
  66  |     // Mock auto-confirms email and signs in → redirects to dashboard
  67  |     await expect(page).toHaveURL(`${BASE}/dashboard`)
  68  | 
  69  |     // Create a $25 payment
  70  |     await page.click('button:has-text("$25 Payment")')
  71  | 
  72  |     // Should redirect to payment page with QR code
  73  |     await expect(page).toHaveURL(/\/payment\//)
  74  |     await expect(page.locator('text=Payment')).toBeVisible()
  75  | 
  76  |     // QR code should be visible
  77  |     await expect(page.locator('img[alt="Payment QR Code"]')).toBeVisible()
  78  | 
  79  |     // Timer should be visible and counting down
  80  |     await expect(page.locator('text=/Expires in:/')).toBeVisible()
  81  | 
  82  |     // Amount should be $25.00
  83  |     await expect(page.locator('text=$25.00')).toBeVisible()
  84  | 
  85  |     // Logout for next test
  86  |     await page.click('button:has-text("Sign Out")')
  87  |     await expect(page).toHaveURL(BASE)
  88  |   })
  89  | 
  90  |   test('protected routes redirect to login when not authenticated', async ({ page }) => {
  91  |     // Clear any existing session
  92  |     await page.goto(`${BASE}/login`)
  93  |     await page.evaluate(() => {
  94  |       localStorage.clear()
  95  |       sessionStorage.clear()
  96  |     })
  97  |     await page.context().clearCookies()
  98  | 
  99  |     // Try to access dashboard without login
  100 |     await page.goto(`${BASE}/dashboard`)
  101 |     await expect(page).toHaveURL(`${BASE}/login`)
  102 | 
  103 |     // Try to access payment page without login
  104 |     await page.goto(`${BASE}/payment/some-id`)
  105 |     await expect(page).toHaveURL(`${BASE}/login`)
  106 | 
  107 |     // Try to access profile without login
  108 |     await page.goto(`${BASE}/profile`)
  109 |     await expect(page).toHaveURL(`${BASE}/login`)
  110 |   })
  111 | })
  112 | 
  113 | test.describe.serial('UI Elements', () => {
  114 |   test('home page loads correctly', async ({ page }) => {
  115 |     await page.goto(BASE)
  116 |     await expect(page.locator('h1')).toContainText('PROJECT PURPLE')
  117 |     await expect(page.locator('text=Get Started Free')).toBeVisible()
  118 |     await expect(page.locator('a:has-text("Sign In")').first()).toBeVisible()
  119 |   })
  120 | 
  121 |   test('navigation works', async ({ page }) => {
  122 |     await page.goto(BASE)
  123 |     await page.locator('a:has-text("Sign In")').first().click()
  124 |     await expect(page).toHaveURL(`${BASE}/login`)
  125 | 
  126 |     await page.goto(BASE)
  127 |     await page.click('a:has-text("Get Started Free")')
  128 |     await expect(page).toHaveURL(`${BASE}/register`)
  129 |   })
  130 | })
```