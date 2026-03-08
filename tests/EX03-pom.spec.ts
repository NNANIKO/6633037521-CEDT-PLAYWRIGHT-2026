import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'

test('Verify login pass with valid user', async ({ page }) => {
	const loginPage = new LoginPage(page)
	await loginPage.login()
	await expect(
		page.getByRole('heading', { name: 'Make Appointment' })
	).toBeVisible()
})
