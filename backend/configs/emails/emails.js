import { mailtrapclient, sender } from "../mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./templates.js"


export const sendEmailVerificationMail = async (email, verificationToken) => {
  const recipient = [{email}];
  try {
    const response = await mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email verification"
    })
  } catch (error) {
    console.log("Error sending email verification");
    throw new Error(error)
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}]
  try {
    await mailtrapclient.send({
      from: sender,
      to: recipient,
      template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
      template_variables: {
        "company_info_name": "Auth Company",
        "name": name,
      }
    })
  } catch (error) {
    console.log(error);
    
  }
}