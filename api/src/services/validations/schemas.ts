import * as Joi from 'joi';

const credentialsSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.required': 'All fields must be filled',
      'string.username': 'Incorrect username or password',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.required': 'All fields must be filled',
      'string.min': 'Incorrect username or password',
    }),
});

export default credentialsSchema;