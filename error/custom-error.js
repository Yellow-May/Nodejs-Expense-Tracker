class CustomAPIError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

const customError = (message, status) => new CustomAPIError(message, status);

module.exports = { CustomAPIError, customError };
