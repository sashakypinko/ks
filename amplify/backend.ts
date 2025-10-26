import { defineBackend } from '@aws-amplify/backend';
import { email } from './email/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  email,
});
