import { defineFunction } from '@aws-amplify/backend';
import 'dotenv/config';

/**
 * Define and configure your email resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const email = defineFunction({
  name: "email",
  entry: "./handler.ts",
  environment: {
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASS: process.env.SMTP_PASS,
    MAIL_TO: process.env.MAIL_TO,
  },
});
