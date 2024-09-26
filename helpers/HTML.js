const signUpTemplate=(verifyLink,Name)=>{
    return `
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to [Your App Name]</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto; /* Add some top margin */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #cccccc;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to RECYCLEPAY!</h1>
        </div>
        <div class="content">
            <p>Hello ${Name},</p>
            <p>Thank you for signing up on our platform. We are excited to have you on board.</p>
            <p>Please click the button below to verify your account:</p>
            <p>
                <a href="${verifyLink}" class="button">Verify My Account</a>
            </p>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br> THE RECYCLEPAY Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>
    
    `
}
const forgotPasswordTemplate = (resetLink, Name) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto; /* Add some top margin */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #ff6600; /* Orange header */
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #ff6600; /* Orange footer */
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ffffff;
        }
        .button {
            display: inline-block;
            background-color: #ff6600; /* Orange button */
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;

        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello ${Name},</p>
            <p>We received a request to reset your password. If you made this request, click the button below to set a new password:</p>
            <p>
                <a href="${resetLink}" class="button">Reset My Password</a>
            </p>
            <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>Best regards,<br> THE RecyclePay Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
        </div>
    </div>
</body>
</html>


    `
}




const verifyTemplate = (verifyLink,Name) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to [Your App Name]</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto; /* Add some top margin */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #cccccc;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verification Email</h1>
        </div>
        <div class="content">
            <p>Hello ${Name},</p>
            <p>Your verification email.</p>
            <p>Please click the button below to verify your account:</p>
            <p>
                <a href="${verifyLink}" class="button">Verify My Account</a>
            </p>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br> THE RECYCLE PAY Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>
    `
}



const pickUpWasteTemplate = (details) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to RecyclingPay</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto; /* Add some top margin */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #cccccc;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RecyclePay Confirmation Info</h1>
        </div>
        <div class="content">
            <p>Hello ${details.Name},</p>
            <p>Waste Recycling Order Confirmation.</p>
            <p>Thank you for placing an order with us. Your request has been confirmed and will be available for pickup in the next three working days.</p>

 <p>Pick Up Details</p>

            <p>
             PhoneNumber:${details.PhoneNumber}
            <br>
            pickUpAddress: ${details.pickUpAddress}
             <br>
            wasteKg: ${details.WasteKG}
            </p>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br>The Waste Recycling Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>
    `
}
const pickUpWastePendingTemplate = (details) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RecyclePay - Order Pending</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #ff6600; /* Orange header */
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #ff6600; /* Orange footer */
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ffffff;
        }
        .details {
            margin-top: 10px;
        }
        .details p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RecyclePay Order Pending</h1>
        </div>
        <div class="content">
            <p>Hello ${details.Name},</p>
            <p>We have received your waste pickup order. Your request is currently <strong>pending</strong> and will be processed soon.</p>
            
            <p>Pending Order Details</p>
            <p>
          <strong>PhoneNumber:</strong> ${details.phoneNumber}<br>
          <strong>pickUpAddress:</strong> ${details.pickUpAddress}<br>
          <strong>wasteKg:</strong> ${details.WasteKG}
            </p>
            </div>

            <p>You will receive another notification once your order is confirmed and ready for pickup. If you have any questions in the meantime, feel free to contact our support team.</p>

            <p>If you did not place this order, please disregard this email.</p>
            <p>Best regards,<br>The RecyclePay Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} RecyclePay. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

const pickUpWasteDeclinedTemplate = (details) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RecyclePay - Order Declined</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #ff6600; /* Orange header */
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #ff6600; /* Orange footer */
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ffffff;
        }
        .details {
            margin-top: 10px;
        }
        .details p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RecyclePay Order Declined</h1>
        </div>
        <div class="content">
            <p>Hello ${details.Name},</p>
            <p>We regret to inform you that your waste pickup order has been <strong>declined</strong>.</p>
            
            <p>Decliened Order Details</p>
            <p>
            PhoneNumber:${details.PhoneNumber}
            <br>
            pickUpAddress: ${details.pickUpAddress}
            <br>
            wasteKg: ${details.WasteKG}
            </p>
            </div>

            <p>If you believe this is a mistake or would like more information, please contact our support team to assist you.</p>

            <p>We apologize for the inconvenience and appreciate your understanding.</p>
            <p>Best regards,<br>The RecyclePay Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} RecyclePay. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};
module.exports = {signUpTemplate,verifyTemplate,forgotPasswordTemplate,pickUpWasteTemplate,pickUpWastePendingTemplate,pickUpWasteDeclinedTemplate}