
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

/**
* Here we're using Gmail to send 
*/

const app = express();
app.use(cors());

app.get('/', async (req, res) => {

            // getting dest email by query string
            const fullName = req.query.fullName;
            const mobile = req.query.mobile;
            const email = req.query.email;

            const msg = {
              to: 'qidwalid@gmail.com',
              from: 'admin@volcatech.com',
              subject: `${fullName} sent you a new message`,
              text: 'A new email from your portfolio',
              html: `A new email from your portfolio <br/><br/>
              By: ${fullName} <br/>
              Mobile: ${mobile} <br/>
              Email: ${email}
              `
            };
            sgMail
              .send(msg)
              .then(() => {
                res.status(200).send({ message: 'Message sent successfully!' });
              })
              .catch((sgError: any) => {
                console.error(sgError.toString());
                res.status(500).send(sgError);
              });
  });
  
  export const sendEmail = functions.https.onRequest(<any>app);
