const Joi = require('joi');

module.exports = {
	createValidationL: (request) => {
		const createSchema = {
            //make sure of the minimum
            question: Joi.string().required().min(20).max(100),
            answers:Joi.array().required(),
            weight:Joi.number().required()
		};

		return Joi.validate(request, createSchema);
    },
    updateValidationL: (request) => {
      const updateSchema= {
      //make sure of the minimum
      question: Joi.string().min(20).max(100),
      answers:Joi.array(),
      weight:Joi.number()
      };

      return Joi.validate(request, updateSchema);
}
};