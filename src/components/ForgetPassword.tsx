import React, { useState } from 'react';
import styles from '@/styles/ForgetPassword.module.css';
import { Form, useForm } from 'react-hook-form';
import supabase from '../../supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import * as z from 'zod';

const Schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
});

const ForgetPassword = () => {
    const {register,handleSubmit,watch,formState: { errors },} = useForm({resolver: zodResolver(Schema),});
    const [email,setEmail]= useState("")
    const watched=watch()

    const handleForgetPassword = async (email:string) => {
        try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            console.error('Error sending reset password email:', error.message);
        } else {
            console.log('Reset password email sent successfully.');
        }
        } catch (err) {
        console.error('Error sending reset password email:', err);
        }
    };

    return (
        <div className={styles.ForgetContainer}>
        <form className={styles.ForgetForm} 
        onSubmit={handleSubmit(()=>{
        })}
        >
            <h1 className={styles.ForgetH1}>Forget Password</h1>
            <div className={styles.FormGroup}>
            <label style={errors.email ? { color: '#EC5757' } : {}}  className={styles.FormLabel} htmlFor="email">Email</label>
            <div className={styles.FormInputWrapper}>
            <Image className={styles.FormImageInput} src='/assets/images/icon-email.svg' alt='icon-email' height={16} width={16} />
                <input
                    type="text"
                    className={styles.FormeInput}
                    {...register('email')}
                    placeholder='lucasbogoss@mail.com'
                    style={errors.email ? { border: '#EC5757 1px solid' } : {}}
                />
                {errors.email && <p className={styles.ErrorText}>Invalid email format</p>}
            </div>
            </div>
            <button type="submit" className={styles.ResetButton}>Reset Password</button>
        </form>
        </div>
    );
    };

export default ForgetPassword;



