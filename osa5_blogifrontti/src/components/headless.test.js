const puppeteer = require('puppeteer')

describe('Blog app', () => {

  it('renders login button', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('log in')).toBe(true)
  })

  it('shows login form when button is clicked', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('button')
    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('username')).toBe(true)
    expect(textContent.includes('password')).toBe(true)
  })

  it('shows add blog form after login with correct username and password', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('button')
    await page.type('[name=username]', 'mongo')
    await page.type('[name=password]', 'sekret')
    await page.click('.btn-success')
    await page.waitForSelector('.navbar')
    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('create new')).toBe(true)
  })

})