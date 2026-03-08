export class LoginPage {
	constructor(page) {
		this.page = page
		this.username = process.env.APP_USER || ''
		this.password = process.env.PASSWORD || ''
		this.url = process.env.URL || ''
	}

	async login() {
		await this.page.goto(this.url)
		await this.page.getByRole('link', { name: 'Make Appointment' }).click()
		await this.page.getByLabel('Username').click()
		await this.page.getByLabel('Username').fill(this.username)
		await this.page.getByLabel('Password').click()
		await this.page.getByLabel('Password').fill(this.password)
		await this.page.getByRole('button', { name: 'Login' }).click()
	}
}
