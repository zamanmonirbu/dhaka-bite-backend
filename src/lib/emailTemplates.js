const generateVerificationEmail = function generateVerificationEmail(verificationCode) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background-color: #007BFF; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Email Verification</h1>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">Thank you for signing up! Please use the following verification code to complete your registration:</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #f0f8ff; padding: 15px 30px; font-size: 28px; font-weight: bold; color: #007BFF; border-radius: 8px; letter-spacing: 2px;">
            ${verificationCode}
          </span>   
        </div>
        <p style="font-size: 16px; color: #555;">This code will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-size: 16px; color: #555;">Best regards,<br>Dhaka Bite Team</p>
      </div>                                                                                                                                        
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 13px; color: #999;">
        &copy; 2025 dhakabite. All rights reserved.
      </div>
    </div>
  `;                                                                                                                                                                                                                                                                                                                      
};

const generateResetPasswordEmail = function generateResetPasswordEmail(verificationCode) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background-color: #007BFF; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Password Reset</h1>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">You are receiving this email because we received a password reset request for your account. Please use the following verification code to reset your password:</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #f0f8ff; padding: 15px 30px; font-size: 28px; font-weight: bold; color: #007BFF; border-radius: 8px; letter-spacing: 2px;">
            ${verificationCode}
          </span>   
        </div>
        <p style="font-size: 16px; color: #555;">This code will expire in 5 minutes. If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-size: 16px; color: #555;">Best regards,<br>Dhaka Bite Team</p>
      </div>                                                                                                                                        
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 13px; color: #999;">
        &copy; 2025 dhakabite. All rights reserved.
      </div>
    </div>
  `;                                                                                                                                                                                                                                                                                                                      
};

export { generateVerificationEmail, generateResetPasswordEmail };
