/* eslint-disable react/no-unescaped-entities */
import React,{useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/Register.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabase from '../../supabase';
import { FormDataRegister,schemaRegister } from '@/types/ContextType';
import ThankYouForRegister from './ThankYouForRegister';

const Register: React.FC = () => {
    const Router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sucess,setSucess]=useState<boolean>(false)
    const { register, handleSubmit,watch, formState: { errors } } = useForm<FormDataRegister>({ resolver: zodResolver(schemaRegister) });
    const handleRegistration = async (data: FormDataRegister) => {
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
            setSucess(false)
            // Handle registration error (e.g., display an error message)
        } else {
            console.log('Registration successful:', data.user);
            // Redirect or show a success message to the user
            setSucess(true)
            setTimeout(()=>{
                Router.push('/'); // Replace 'success-page' with the URL of the page you want to redirect to
            },300)
        }
        } catch (error) {
        console.error('Registration error:', error);
        // Handle other potential errors (e.g., network issues)
        }

    };

    if(sucess){
        return (
            <ThankYouForRegister />
        )
    }
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
                    {errors.email && <p className={styles.RegisterError}>{errors.email.message?.toString()}</p>}
                </div>
                <label className={styles.RegisterLabel} htmlFor="">
                    Create password
                </label>
                
                <div className={styles.RegisterInputWrapper}>
                    <Image  className={styles.RegisterImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                    <input type='password' style={errors.password1 ? { border: '#EC5757 1px solid' } : {}}    {...register('password1')} className={styles.RegisterInput}  placeholder='At least 8 characters' />
                    {errors.password1 && <p className={styles.RegisterError}>{errors.password1.message?.toString()}</p>}
                </div>
                <label className={styles.RegisterLabel} htmlFor="">
                    Confirm password
                </label>
                
                <div className={styles.RegisterInputWrapper}>
                    <Image  className={styles.RegisterImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                    <input type='password' style={errors.password2 ? { border: '#EC5757 1px solid' } : {}}    {...register('password2')} className={styles.RegisterInput}  placeholder='At least 8 characters' />
                    {errors.password2 && <p className={styles.RegisterError}>{errors.password2.message?.toString()}</p>}
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
