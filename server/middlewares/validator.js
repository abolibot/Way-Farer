import Joi from '@hapi/joi';

const validators = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({ status: 400, error: result.error.details[0].message });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    return next();
  },
};

export default validators;
