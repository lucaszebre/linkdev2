/* eslint-disable react/no-unescaped-entities */
import React,{useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/Register.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface FormData {
    email: string;
    password1: string;
    password2: string;
}

const supabase: SupabaseClient = createClient('https://rrqmpgpvlhaxsozwlntq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycW1wZ3B2bGhheHNvendsbnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MjU4NjIsImV4cCI6MjAwNTMwMTg2Mn0.OEAZdA5aUxMgV8xTuV8a8rFlzGpP_S2EcRAqp7Pa5_0');

const schema = z.object({
    email: z.string().min(1, { message: 'Required' }),
    password1: z.string().min(1, { message: 'Required' }),
    password2: z.string().min(1, { message: 'Required' }),
});

const Register: React.FC = () => {
    const Router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, handleSubmit,watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const handleRegistration = async (data: FormData) => {
        const watched=watch()
                    setEmail(watched.email)
                    setPassword(watched.password1)
        try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password:password,
        });

        if (error) {
            console.error('Registration error:', error);
            // Handle registration error (e.g., display an error message)
        } else {
            console.log('Registration successful:', data.user);
            // Redirect or show a success message to the user
            Router.push('/preview'); // Replace 'success-page' with the URL of the page you want to redirect to
        }
        } catch (error) {
        console.error('Registration error:', error);
        // Handle other potential errors (e.g., network issues)
        }

    };
    return (
        <div className={styles.RegisterContainer}>
            <div className={styles.RegisterWrapper}>
                <div className={styles.RegisterImageWrapper}>
                    <div className={styles.RegisterImage}>
                        <Image  src="/assets/images/logo-devlinks-large.svg" alt="devlink-logo" fill />
                    </div>
                </div>            
                <form onSubmit={handleSubmit(handleRegistration)} className={styles.RegisterForm} action="">
                <h1 className={styles.RegisterH1}>
                    Create account
                </h1>
                <p className={styles.RegisterDescription}>
                Let’s get you started sharing your links!
                </p>
                <label  className={styles.RegisterLabel} htmlFor="">
                    Email adress
                </label>
                <div className={styles.RegisterInputWrapper}>
                    <Image className={styles.RegisterImageInput} src='/assets/images/icon-email.svg' alt='icon-email' height={16} width={16} />
                    <input style={errors.email ? { border: '#EC5757 1px solid' } : {}}   {...register('email')}  className={styles.RegisterInput} type="text" placeholder='e.g. alex@email.com' />
                    {errors.email && <p className={styles.RegisterError}>Can't be empty</p>}
                </div>
                <label className={styles.RegisterLabel} htmlFor="">
                    Create password
                </label>
                
                <div className={styles.RegisterInputWrapper}>
                    <Image  className={styles.RegisterImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                    <input type='password' style={errors.password1 ? { border: '#EC5757 1px solid' } : {}}    {...register('password1')} className={styles.RegisterInput} type="text" placeholder='At least 8 characters' />
                    {errors.password1 && <p className={styles.RegisterError}>Can't be empty</p>}
                </div>
                <label className={styles.RegisterLabel} htmlFor="">
                    Confirm password
                </label>
                
                <div className={styles.RegisterInputWrapper}>
                    <Image  className={styles.RegisterImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                    <input type='password' style={errors.password2 ? { border: '#EC5757 1px solid' } : {}}    {...register('password2')} className={styles.RegisterInput} type="text" placeholder='At least 8 characters' />
                    {errors.password2 && <p className={styles.RegisterError}>Can't be empty</p>}
                </div>
                <p className={styles.RegisterP}>
                Password must contain at least 8 characters
                </p>
                <button className={styles.RegisterButton}>Create new account</button>
                <div className={styles.RegisterDiv}>
                    Already have a account
                    <Link href={'/login'} className={styles.RegisterNoAccount}>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register
