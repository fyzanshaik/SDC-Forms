"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'devclub.dc@gmail.com',
        pass: 'mbjv spjv kzhp ifnx',
    },
});
const sendMail = async (recieverEmail) => {
    const uniqueHash = Math.random().toString(36).substring(2, 15);
    const rickRollLink = 'https://tinyurl.com/sa3ee9a3';
    const emailSuccess = await transporter.sendMail({
        to: `${recieverEmail}`,
        subject: 'Join Our Git, GitHub & Open Source Session!',
        html: `
        <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #FF6F61;">🚀 Join Our Git, GitHub & Open Source Session!</h1>
          <h2>🎉 <strong>When</strong>: 24th October 12:40 PM</h2>
          <h2>📍 <strong>Where</strong>: SAC room || Maybe something else check the group</h2>
          <p>👩‍💻 We're hosting an exciting session covering <strong>Git, GitHub, and Open Source</strong>! Whether you're a beginner or a pro, you'll walk away with hands-on knowledge and insights.</p>
          
          <h2>📲 Click below to win goodies & for more details:</h2>
          <h1> <a href="${rickRollLink}" style="color: #4CAF50; text-decoration: none;">
            <strong>Click Here</strong>
          </a></h1>
         
  
          <h3 style="color: #4CAF50;">🆔 Your Ticket Hash:</h3>
          <h2><code>${uniqueHash}</code></h2>
        </div>
      `,
    });
    console.log(emailSuccess);
};
exports.default = sendMail;
