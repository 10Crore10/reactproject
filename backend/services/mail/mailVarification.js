import nodemailer from 'nodemailer';
import  'dotenv/config'


const transport  =  nodemailer.createTransport({
 host: process.env.SMTP_HOST,
 port: process.env.SMTP_PORT,
 secure: false,
//  requireTLS: false,
 auth: {
user: process.env.SMTP_MAIL,
pass: process.env.SMTP_PASSWORD,
 }

});

const sendVerification = async(mail, subject, content) => {
    try{
        const info = await transport.sendMail({
            from: process.env.SMTP_MAIL,
            to: mail,
            subject: subject,
            html: content
        });
    
    
        transport.sendMail(info,(err)=>{
             if(err){
                 console.log('Error: ', err);
             }

             console.log('Message sent: %s', info.messageId);
         });
        
    }catch(e){
        console.log(e);
        // throw new Error("Failed to send email")
    }
  
}

export default sendVerification;