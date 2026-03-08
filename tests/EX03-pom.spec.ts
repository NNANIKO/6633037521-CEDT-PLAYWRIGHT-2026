import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import validInput from '../test-data/valid_input.json'
import { MakeAppointmentPage } from '../page-objects/makeAppointmentPage'

test('Verify Make Appointment Success', async ({ page }) => {
	const loginPage = new LoginPage(page)
	await loginPage.login()

	await expect(
		page.getByRole('heading', { name: 'Make Appointment' })
	).toBeVisible()

	const appointmentPage = new MakeAppointmentPage(page)
	await appointmentPage.makeAppointment(validInput)

	await expect(
		page.getByRole('heading', { name: 'Appointment Confirmation' })
	).toBeVisible()
})
