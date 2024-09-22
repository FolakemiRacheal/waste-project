const Joi = require("joi");

    const logInValidator = Joi.object({
        Email: Joi.string()
        .email()
        .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        .trim()
        .required()
        .messages({
          "string.email": "Please enter a valid email address.",
          "string.empty": "Email cannot be empty.",
          "any.required": "Email is required.",
          "string.pattern.base": "Please enter a valid email address.",
        }),
    
        Password: Joi.string().pattern(new RegExp("^(?=.[!@#$%^&])(?=.*[A-Z]).{7,}$"))
        .required()
        .messages({
            "any.required": "Please provide a password.",
            "string.empty": "Password cannot be left empty.",
            "string.pattern.base":
                "Password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
    })
    
const validateLogin = (req, res, next) => {
    const { error } = logInValidator.validate(req.body, { abortEarly: false }); // Add abortEarly: false to collect all errors
  
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
  
    next();
  };










// Define the schema with custom age validation
const signUpValidator = Joi.object({
  Name: Joi.string()
    .min(3)
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+([ '-][A-Za-z]+)*$/
) // Allow only English alphabet characters
    .required()
    .messages({
      "string.pattern.base":
        "Full name must contain only alphabetic characters.",
      "string.base": "name must be a string.",
      "string.empty": " name cannot be empty.",
      "string.min": "name should have a minimum length of 3 characters.",
      "string.max": "name should have a maximum length of 20 characters.",
      "any.required": "name is required.",
    }),

  

  Email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email cannot be empty.",
      "any.required": "Email is required.",
      "string.pattern.base": "Please enter a valid email address.",
    }),

    PhoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid number with 10 to 15 digits.",
      "string.empty": "Phone number cannot be empty.",
      "any.required": "Phone number is required.",
    }),


    Location: Joi.string().required().pattern(/^[a-zA-Z0-9-,. ]+$/).messages({
      'string.pattern.base': 'Location can contain only alphabetic characters, numbers, spaces, commas, periods, or hyphens.',
      'any.required': 'Location is required.',
      'string.empty': 'Location cannot be empty.'
    }),
  


    Password: Joi.string().pattern(new RegExp("^(?=.[!@#$%^&])(?=.*[A-Z]).{7,}$"))
    .required()
    .messages({
        "any.required": "Please provide a password.",
        "string.empty": "Password cannot be left empty.",
        "string.pattern.base":
            "Password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
 
});

const validateSignUp = (req, res, next) => {
  const { error } = signUpValidator.validate(req.body, { abortEarly: false }); // Add abortEarly: false to collect all errors

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }

  next();
};




const createWasteValidator = async (req, res, next) => {
  const Schema = Joi.object({
      WasteKG: Joi.number().required().min(1).max(70).messages({
      "number.base": "WasteKG must be a number",
      "number.empty": "WasteKG cannot be empty",
      "number.min": "WasteKG must be at least 10 kilogram",
      "number.max": "WasteKG must not exceed 70 kilograms",
      "any.required": "WasteKG is a required field"
    }),
    pickUpAddress: Joi.string().required().messages({
      'string.pattern.base': 'Address can contain only alphabetic characters, numbers, spaces, commas, periods, or hyphens.',
      'any.required': 'Address is required.',
      'string.empty': 'Address cannot be empty.'
    }),
    phoneNumber: Joi.string().required().messages({
      'string.pattern.base': 'Phone can contain only alphabetic characters, numbers, spaces, commas, periods, or hyphens.',
      'any.required': 'Phone is required.',
      'string.empty': 'Phone cannot be empty.'
    }),
        });
          const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
 }



  module.exports = { validateSignUp ,validateLogin,createWasteValidator};
