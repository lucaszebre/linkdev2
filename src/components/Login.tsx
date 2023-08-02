import { createClient } from "@supabase/supabase-js";
/* eslint-disable react/no-unescaped-entities */
import React,{useState,useEffect} from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from "@mui/material";
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

const Schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(8, { message: ' at least 8 characters long' })
    .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
    .regex(/[0-9]/, { message: ' must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
});

const supabase = createClient('https://rrqmpgpvlhaxsozwlntq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycW1wZ3B2bGhheHNvendsbnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MjU4NjIsImV4cCI6MjAwNTMwMTg2Mn0.OEAZdA5aUxMgV8xTuV8a8rFlzGpP_S2EcRAqp7Pa5_0');

const Login =  () => {
    const {register,handleSubmit,watch,formState: { errors },} = useForm({resolver: zodResolver(Schema),});
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLoginWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                    },
                })
        
            if (error) {
                console.error('Error signing in with Google:', error.message);
            } else {
                // Update state with the user data
                console.log('Logged in user:', data);
            }
            } catch (err) {
            console.error('Error signing in with Google:');
            }
        };
        const handleLoginWithGithub = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                    },
                })
        
            if (error) {
                console.error('Error signing in with Github:', error.message);
            } else {
                // Update state with the user data
                console.log('Logged in user:', data);
            }
            } catch (err) {
            console.error('Error signing in with Github:');
            }
        };
        
        async function signInWithEmail() {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            
            }
            
    
        
    
        
    return (
        <>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <div className={styles.LoginContainer}>
            <div className={styles.LoginWrapper}>
                <div className={styles.LoginImageWrapper}>
                    <div className={styles.LoginImage}>
                        <Image  src="/assets/images/logo-devlinks-large.svg" alt="devlink-logo" fill />
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(()=>{
                    const watched=watch()
                    setEmail(watched.email)
                    setPassword(watched.password)
                    signInWithEmail()
                })} className={styles.LoginForm} action="">
                    <h1 className={styles.LoginH1}>
                        Login
                    </h1>
                    <div className={styles.RowForm}>
                        <Button type="button" 
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleLoginWithGoogle} 
                            >
                        Sign in with Google
                        </Button>
                        <Button
                        startIcon={<GitHubIcon/>}
                        variant="outlined"
                        onClick={handleLoginWithGithub} >
                            Sign in with Github 
                        </Button>
                    </div>
                    <p className={styles.LoginDescription}>
                    Add your details below to get back into the app
                    </p>
                    <label style={errors.email ? { color: '#EC5757' } : {}} className={styles.LoginLabel} htmlFor="">
                        Email adress
                    </label>
                    <div  className={styles.LoginInputWrapper}>
                        <Image className={styles.LoginImageInput} src='/assets/images/icon-email.svg' alt='icon-email' height={16} width={16} />
                        <input  style={errors.email ? { border: '#EC5757 1px solid' } : {}}   {...register('email')} className={styles.LoginInput} type="text" placeholder='e.g. alex@email.com' />
                        {errors.email && <p className={styles.LoginError}>{errors.email?.message}</p>}
                    </div>
                    
                    <label style={errors.password ? { color: '#EC5757' } : {}}  className={styles.LoginLabel} htmlFor="">
                        Password
                    </label>
            
                    <div className={styles.LoginInputWrapper}>
                        <Image  className={styles.LoginImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                        <input  style={errors.password ? { border: '#EC5757 1px solid' } : {}}    {...register('password')} className={styles.LoginInput}  placeholder='Enter your password' type = "password" />
                        {errors.password && <p className={styles.LoginError}>{errors.password?.message}</p>}
                    </div>
                    <button type='submit' className={styles.LoginButton}>Login</button>
                    <div className={styles.LoginDiv}>
                        Dont have a account
                        <Link  href='/register'className={styles.LoginNoAccount}>
                            Create account
                        </Link>
                    </div>
                    <div>
                    <Link href={'/ForgetPassword'} className={styles.LoginNoAccount}>
                        Forget your password?
                    </Link>
                    </div>
                    
                </form>
            </div>
        </div>
    </>
    )
}

export default Login


