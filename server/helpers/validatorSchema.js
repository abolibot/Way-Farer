import Joi from '@hapi/joi';

const schemas = {
  signupSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
    lastName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
    password: Joi.string().min(6).required(),
  }),
  signinSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export default schemas;
