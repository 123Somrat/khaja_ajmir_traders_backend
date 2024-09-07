import dayjs from 'dayjs';
import mailgun from 'mailgun-js'



const mailGun_domain = process.env.MAILGUN_DOMAIN  as string;
const mailGun_api_Key = process.env.MAILGUN_API_KEY as string;


const mg = mailgun({ apiKey: mailGun_api_Key, domain: mailGun_domain });





const sendEmail =async (content:string)=>{
  // Email data
const info = {
  from: "Excited User <paymaster@sandbox326bd2bf8ad34bbdb6116dd010e56ad9.mailgun.org>", // sender address
  to: "bigziauddin@gmail.com", // list of receivers
  subject: 'Product Expiry Notification',
  html: content
  
};

  const confirnation = mg.messages().send(info, function (error, body) {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', body);
    }
  });


}


export default sendEmail;