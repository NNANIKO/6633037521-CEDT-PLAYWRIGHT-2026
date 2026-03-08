import fieldData from '../test-data/field_data.json'

export class MakeAppointmentPage {
	constructor(page) {
		this.page = page
	}

	async makeAppointment(validInput) {
		// 1. เลือก Facility
		await this.page
			.getByLabel(fieldData.facility.label)
			.selectOption(validInput.facility)

		// 2. ติ๊ก Readmission
		if (validInput.readmission) {
			await this.page
				.getByRole(fieldData.readmission.role, {
					name: fieldData.readmission.name,
				})
				.check()
		}

		// 3. เลือก Healthcare Program
		await this.page
			.getByRole(fieldData.healthcareProgram.role, {
				name: validInput.healthcareProgram,
			})
			.check()

		// 4. จัดการปฏิทิน (Date Picker)
		await this.page.locator(fieldData.visitDate.locator).click()

		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const currentMonthName = monthNames[new Date().getMonth()]

		// คลิกที่หัวปฏิทินเพื่อถอยออกมาหน้าเลือกเดือน (ถ้าจำเป็น)
		await this.page
			.getByRole(fieldData.visitDate.month.role, { name: currentMonthName })
			.click()

		// แก้ไขจุดที่ Error: ใช้ { exact: true } เพื่อให้คลิกที่ปุ่มเดือน 'Mar' เท่านั้น
		await this.page
			.getByText(validInput.visitDate.month, { exact: true })
			.click()

		// แก้ไขการเลือกวันที่: เปลี่ยนจาก .nth(5) เป็นการระบุวันที่ที่มองเห็นได้จริง
		await this.page
			.getByRole(fieldData.visitDate.day.role, {
				name: validInput.visitDate.day,
				exact: true,
			})
			.filter({ visible: true }) // ป้องกันกรณีเลขวันที่ซ้ำกับเดือนก่อนหน้า/ถัดไป
			.click()

		// 5. กรอก Comment
		await this.page
			.getByRole(fieldData.comment.role, { name: fieldData.comment.name })
			.fill(validInput.comment)

		// 6. กดปุ่ม Submit
		await this.page
			.getByRole(fieldData.submit.role, { name: fieldData.submit.name })
			.click()
	}
}
