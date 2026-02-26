import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/loginPage'

import validUser from '../../test-data/users/valid-user.json'
import facilities from '../../test-data/fixtures/healthcare-facilities.json'
import programs from '../../test-data/fixtures/healthcare-programs.json'
import comments from '../../test-data/fixtures/comment-input.json'

type User = {
	username: string
	password: string
}

const test = base.extend<{ validUser: User }>({
	validUser: async ({}, use) => {
		await use(validUser)
	},
})

const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US')
}

test.describe('Make Appointment', () => {
	test.beforeEach(async ({ page, validUser }) => {
		const loginPage = new LoginPage(page)
		await loginPage.login(validUser)
	})

	test('Verify that make appointment page displays "Make Appointment" in h2', async ({
		page,
	}) => {
		await expect(
			page.getByRole('heading', { name: 'Make Appointment' })
		).toBeVisible()
	})

	test('Verify that can select all facility combo boxes', async ({ page }) => {
		const facilityDropdown = page.getByLabel('Facility')

		for (const facility of facilities) {
			await facilityDropdown.selectOption(facility)
			await expect(facilityDropdown).toHaveValue(facility)
		}
	})

	test('Verify that can select apply for hospital readmission checkbox', async ({
		page,
	}) => {
		const checkbox = page.getByLabel('Apply for hospital readmission')

		await checkbox.check()
		await expect(checkbox).toBeChecked()
	})

	test('Verify that can select health care program radio button', async ({
		page,
	}) => {
		for (const program of programs) {
			const radio = page.getByLabel(program)
			await radio.check()
			await expect(radio).toBeChecked()
		}
	})

	test('Verify that can input current date on Visit Date', async ({ page }) => {
		const visitDateInput = page.getByLabel('Visit Date (Required)')
		const today = formatDate(new Date())

		await visitDateInput.fill(today)
		await expect(visitDateInput).toHaveValue(today)
	})

	test('Verify that can input comment', async ({ page }) => {
		const commentInput = page.getByLabel('Comment')

		await commentInput.fill(comments.comment)
		await expect(commentInput).toHaveValue(comments.comment)
	})

	test('Verify that book appointment button is displayed and enabled', async ({
		page,
	}) => {
		const bookButton = page.getByRole('button', { name: 'Book Appointment' })

		await expect(bookButton).toBeVisible()
		await expect(bookButton).toBeEnabled()
	})
})
