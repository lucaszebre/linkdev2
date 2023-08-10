import z from 'zod'

export interface Link {
    platform: string;
    link: string|null;
  }
  
export interface UserData {
  name:string;
  email:string;
}

export interface UserData {
  avatar_url: string;
  created_at: string;
  email: string;
  links: Link[];
  name: string;
  user_id: string;
}

export const SchemaLogin = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8, { message: ' at least 8 characters long' })
  .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
  .regex(/[0-9]/, { message: ' must contain at least one digit' })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
});

export interface FormDataRegister {
  email: string;
  password1: string;
  password2: string;
}



export const schemaProfile = z.object({
  firstname: z.string().min(1, { message: 'cant be empty' }),
  lastname: z.string().min(1, { message: 'cant be empty' }),
  email: z.string().email({ message: 'Invalid email format' }),
  });