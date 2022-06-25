export const GetRecaptchaToken = async () => {
	return new Promise((resolve, reject) => {
		grecaptcha.ready(async () => {
			const token = await grecaptcha.execute('6LcJypAgAAAAABRvxLwlMHj9Oic7FnC2dpRfzzIp', {
				action: 'submit'
			});
			return resolve(token);
		});
	});
};
