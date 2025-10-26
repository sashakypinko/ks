import { defineFunction } from '@aws-amplify/backend';

/**
 * Define and configure your email resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const email = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
});
