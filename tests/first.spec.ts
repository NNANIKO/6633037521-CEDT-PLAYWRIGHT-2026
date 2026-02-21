import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
	await page.goto('https://katalon-demo-cura.herokuapp.com/')
	await page.locator('#menu-toggle').click()
	await page.getByRole('link', { name: 'Login' }).click()
	await page.getByLabel('Username').click()
	await page.getByLabel('Username').fill('xxx')
	await page.getByLabel('Password').click()
	await page.getByLabel('Password').fill('xxx')
	await page.getByRole('button', { name: 'Login' }).click()
})
