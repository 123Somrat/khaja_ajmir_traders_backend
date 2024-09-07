import mongoose from "mongoose";
import getGreetingTime from "./getGreetingTime";


const generateEmailContent=(expiredDuesIds: mongoose.Types.ObjectId[]):string=> {
  const greetingTime = getGreetingTime();

  const emailContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Product Expiry Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .product-info {
        background-color: #f9f9f9;
        padding: 10px;
        border-left: 4px solid #ff0000;
        margin-top: 20px;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        color: #999999;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hello, Zia vai</h1>
      <p>Good ${greetingTime},</p>
      
      <p>We wanted to notify you that the following product(s) have expired:</p>

      <div class="product-info">
        <ul>
          ${expiredDuesIds.map(id => `<li><strong>Product ID:</strong> ${id}</li>`).join('')}
        </ul>
      </div>

      <p>Please take any necessary action at your earliest convenience.</p>

      <p>Thank you for your attention to this matter.</p>

      <p>Goodbye and have a great ${greetingTime}!</p>
      
      <div class="footer">
        <p>&copy; 2024 Khaja Ajmir Traders. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  return emailContent;
};


export default generateEmailContent;