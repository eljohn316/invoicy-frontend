import * as z from 'zod';

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
  rememberMe: z.boolean(),
});

export const SignUpFormSchema = z
  .object({
    firstName: z.string().min(1, "Can't be empty"),
    lastName: z.string().min(1, "Can't be empty"),
    email: z.email(),
    password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
    confirmPassword: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  });
