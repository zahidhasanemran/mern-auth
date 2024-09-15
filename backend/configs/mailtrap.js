import dotenv from "dotenv"
import { MailtrapClient } from "mailtrap";


dotenv.config()

export const Mailtrapclient = new MailtrapClient({
  token: process.env.MailtrapTOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};

// const recipients = [
//   {
//     email: "emrans45@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

// https://cloud.mongodb.com/v2/66e5b25f3d586827c72e24b9#/clusters/detail/Cluster0