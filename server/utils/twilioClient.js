import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('SMS sent:', message.sid);
  } catch (error) {
    console.error('Failed to send SMS:', error.message);
  }
};

// import { sendSMS } from '../utils/twilioClient.js';

// await sendSMS('+2547XXXXXXXX', `Welcome to VunaHub! Your account has been created.`);

