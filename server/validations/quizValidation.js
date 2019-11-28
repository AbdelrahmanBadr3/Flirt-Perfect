const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const User = require('../models/User')
const User = require('../models/Quiz')


module.exports = {
	createValidationUser: (request) => {
		const UsersSchema = {
			name: Joi.string().required().min(20).max(100),
			_id:Joi.objectId()
			//resetPasswordToken: Joi.string(),
			//resetPasswordExpires: Joi.date()
		};

		return Joi.validate(request, UsersSchema);
	},
	createValidationQuiz: (request) => {
		const QuizSchema = {
			sequence:Joi.string.required(),
			users:Joi.array()
		};

		return Joi.validate(request, QuizSchema);
    },
    updateValidation: (request) => {
		const UsersUpdateSchema = {
			name: Joi.string().min(20).max(100),
			_id:Joi.objectId()
		};

		return Joi.validate(request, UsersUpdateSchema);
	},
	updateValidation: (request) => {
		const QuizUpdateSchema = {
			sequence:Joi.string,
			users:Joi.array()
		};

		return Joi.validate(request, QuizUpdateSchema);
	}

};