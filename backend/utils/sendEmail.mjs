// import nodemailer from "nodemailer";
// import ejs from "ejs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async (to, subject, template, data) => {
//   try {
//     // Render EJS file
//     const templatePath = path.join(
//       __dirname,
//       "../views/emails",
//       `${template}.ejs`
//     );

//     const html = await ejs.renderFile(templatePath, data);

//     const result = await transporter.sendMail({
//       from: `"My App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("Email sent successfully", result);
//   } catch (error) {
//     console.error("Email error:", error); 
//   }
// };










import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, template, data) => {
//   try {
    // Render EJS file
    const templatePath = path.join(
      __dirname,
      "../views/emails",
      `${template}.ejs`
    );

    const html = await ejs.renderFile(templatePath, data);

    const result = await transporter.sendMail({
      from: `"LOGO" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully", result);
//   } catch (error) {
//     console.error("Email error:", error); 
//   }
};