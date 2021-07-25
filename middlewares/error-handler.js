const { CustomAPIError } = require("../error/custom-error");

const errorHandler = (err, _req, res, _next) => {
	if (err instanceof CustomAPIError) return res.status(err.status).json({ message: err.message });
	res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
