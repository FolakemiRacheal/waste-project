const Joi = require("joi");

// const Joi = require('@hapi/joi');

// const signUpValidator1 = async (req, res, next) => {
//     const schema = Joi.object({
//         fullName: Joi.string().required().min(3).trim().regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/).messages({
//         "any.required": "please provide Name",
//         "string.empty": "Name cannot be empty",
//         "string.min": "the minimum name must be at least 3 character long",
//         "string.pattern.base": "Name should only contain letters",
//       }),
//        Email: Joi.string().email().min(7).required().messages({
//         "any.required": "please provide your email address", 
//         "string.empty": "email cannot be empty",
//         "string.email":"invalid email format. please enter a valid email address", 
//       }),
//        Password: Joi.string().required().min(8).max(50).regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,50}$/).messages({
//           "string.pattern.base":"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
//           "string.empty": "Password cannot be empty",
//         }),
//         Location:Joi.string().required().messages({
//             'any.required': 'Address is a required field.',
//             'string.empty': 'please provide an address'
//         }),
//         PhoneNumber:Joi.string().regex(/^\d{11}$/).message('Phone number must be exactly 11 digits'),
//      })
//     const {err} = schema.validate(req.body);

//     if (err) {
//         return res.status(400).json({
//             message: err.details[0].message
//         })
//     }else{
//         next()

//     }

// }

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
  fullName: Joi.string()
    .min(3)
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+([ '-][A-Za-z]+)*$/
) // Allow only English alphabet characters
    .required()
    .messages({
      "string.pattern.base":
        "Full name must contain only alphabetic characters.",
      "string.base": "Full name must be a string.",
      "string.empty": "Full name cannot be empty.",
      "string.min": "Full name should have a minimum length of 3 characters.",
      "string.max": "Full name should have a maximum length of 20 characters.",
      "any.required": "Full name is required.",
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

// validate update inputs



// Define the schema with custom age validation


module.exports = { validateSignUp ,validateLogin};