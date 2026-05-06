import * as z from 'zod';

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
  rememberMe: z.boolean(),
});
