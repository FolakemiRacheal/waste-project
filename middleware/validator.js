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
    
        Password: Joi.string().trim().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long.",
            "string.empty": "Password cannot be empty.",
            "any.required": "Password is required.",
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
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
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

    Location:  Joi.string()
    .min(3) // Minimum length of 3 characters
    .max(100) // Maximum length of 100 characters (adjust as needed)
    .regex(/^\d{1,5}\s[A-Za-z0-9\s]+,\s[A-Za-z\s]+,\s[A-Za-z\s]+$/).trim() // Remove leading and trailing spaces
    .required() // Field is required
    .messages({
      "string.base": "Location must be a string.",
      "string.empty": "Location cannot be empty.",
      "string.min": "Location should have a minimum length of 3 characters.",
      "string.max": "Location should have a maximum length of 100 characters.",
      "string.pattern.base": "Location must be in the format: [Street Number] [Street Name], [City], [State] ",
      "any.required": "Location name is required.",
    }),
  


  Password: Joi.string().trim().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
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
  //  Name: Joi.string().min(3).required().pattern(new RegExp(/^[^\s].+[^\s]$/)).messages({
  //      "any.required": "Name is required.",
  //      "string.empty": "Name cannot be empty.",
  //       "string.min": "Name must be at least 3 characters long.",
  //       "string.pattern.base": "Name cannot start or end with a whitespace.",
  //     }),

  //     Email: Joi.string().email().min(7).required().messages({
  //       "any.required": "please kindly fill your email address",
  //       "string.empty": "email cannot be empty",
  //       "string.email":"invalid email format. please enter a valid email address",
  //     }),
 
      WasteKG: Joi.number().required().min(1).max(50).messages({
      "number.base": "WasteKG must be a number",
      "number.empty": "WasteKG cannot be empty",
      "number.min": "WasteKG must be at least 1 kilogram",
      "number.max": "WasteKG must not exceed 50 kilograms",
      "any.required": "WasteKG is a required field"
    }),
    pickUpAddress: Joi.string().required().pattern(/^[a-zA-Z0-9-,. ]+$/).messages({
      'string.pattern.base': 'Address can contain only alphabetic characters, numbers, spaces, commas, periods, or hyphens.',
      'any.required': 'Address is required.',
      'string.empty': 'Address cannot be empty.'
    }),
    // PhoneNumber: Joi.string().pattern(/^\d{11}$/).required().messages({
    //   "any.required": "Phone number is required.",
    //   "string.empty": "Phone number cannot be empty.",
    //   "string.pattern.base": "Phone number must be exactly 11 digits."
    // })
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
