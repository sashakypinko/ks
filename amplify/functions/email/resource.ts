import { defineFunction } from '@aws-amplify/backend';
// import 'dotenv/config';

/**
 * Define and configure your email resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
// @ts-ignore
export const email = defineFunction({
// @ts-ignore
  name: "email",
// @ts-ignore
  entry: "./handler.ts",
// @ts-ignore
//   environment: {
//     SMTP_USERNAME: process.env.SMTP_USERNAME,
//     SMTP_PASS: process.env.SMTP_PASS,
//     MAIL_TO: process.env.MAIL_TO,
//   },
  environment: {
    SMTP_USERNAME: 'sashakypinko@gmail.com',
    SMTP_PASS: 'yqib fvxv nlnm doln',
    MAIL_TO: 'sashakypinko@gmail.com',
  },
});
