import { test, expect } from '@playwright/test'

test('Login success with valid user', async ({ page }) => {
	await page.goto('https://katalon-demo-cura.herokuapp.com/')
	await page.locator('#menu-toggle').click()
	await page.getByRole('link', { name: 'Login' }).click()
	await page.getByLabel('Username').fill('John Doe')
	await page.getByLabel('Password').fill('ThisIsNotAPassword')
	await page.getByRole('button', { name: 'Login' }).click()
	await expect(
		page.getByRole('heading', { name: 'Make Appointment' })
	).toBeVisible()
})

test('Login fail with invalid password', async ({ page }) => {
	await page.goto('https://katalon-demo-cura.herokuapp.com/')
	await page.locator('#menu-toggle').click()
	await page.getByRole('link', { name: 'Login' }).click()
	await page.getByLabel('Username').fill('John Doe')
	await page.getByLabel('Password').fill('1234')
	await page.getByRole('button', { name: 'Login' }).click()
	await expect(
		page.getByText(
			'Login failed! Please ensure the username and password are valid.'
		)
	).toBeVisible()
})

test('Login fail with invalid username', async ({ page }) => {
	await page.goto('https://katalon-demo-cura.herokuapp.com/')
	await page.locator('#menu-toggle').click()
	await page.getByRole('link', { name: 'Login' }).click()
	await page.getByLabel('Username').fill('hihi')
	await page.getByLabel('Password').fill('ThisIsNotAPassword')
	await page.getByRole('button', { name: 'Login' }).click()
	await expect(
		page.getByText(
			'Login failed! Please ensure the username and password are valid.'
		)
	).toBeVisible()
})
