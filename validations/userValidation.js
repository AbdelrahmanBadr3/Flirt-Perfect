const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {
	createValidation: (request) => {
		const createSchema = {
            name: Joi.string().required().min(3).max(50),
            password: Joi.string().required().min(8).max(16),
            email: Joi.string().required().email().min(3).max(254),
			gender:Joi.string().required().valid('MALE', 'FEMALE','NOTSPECIFED'),
			dateOfBirth: Joi.date().required(),
            isActivated:joi.boolean(),
            isOnline:joi.boolean(),
			answerID:joi.objectId()
			//resetPasswordToken: Joi.string(),
			//resetPasswordExpires: Joi.date()
		};

		return Joi.validate(request, createSchema);
	},
	updateValidation: (request) => {
		const updateSchema = {
			name: Joi.string().min(3).max(50),
            password: Joi.string().min(8).max(16),
            email: Joi.string().email().min(3).max(254),
			gender:Joi.string().valid('MALE', 'FEMALE','NOTSPECIFED'),
			dateOfBirth: Joi.date(),
            isActivated:joi.boolean(),
            isOnline:joi.boolean(),
			answerID:joi.objectId()
		};

		return Joi.validate(request, updateSchema);
	}
};