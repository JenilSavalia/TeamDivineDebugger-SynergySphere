import Joi from "joi";

const projectValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .trim()
    .messages({
      'string.empty': 'Project name is required',
      'string.min': 'Project name must be at least 3 characters long',
      'string.max': 'Project name cannot exceed 100 characters'
    }),

  tags: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one tag is required',
      'array.base': 'Tags must be an array'
    }),

  projectManagerId: Joi.string()
    .required()
    .optional()
    .messages({
      'string.empty': 'Project manager is required'
    }),

  deadline: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.min': 'Deadline must be in the future',
      'date.base': 'Valid deadline is required'
    }),

  priority: Joi.string()
    .valid('LOW', 'MEDIUM', 'HIGH')
    .required()
    .messages({
      'any.only': 'Priority must be LOW, MEDIUM, or HIGH',
      'string.empty': 'Priority is required'
    }),

  image: Joi.string()
    .uri()
    .required()
    .optional()
    .messages({
      'string.uri': 'Image must be a valid URL',
      'string.empty': 'Image is required'
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .trim()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters'
    })
});

export const validateProject = (req, res, next) => {
  const { error, value } = projectValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessages = error.details.map(detail => ({
      field: detail.path,
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }

  req.validatedData = value;
  next();
};
