import React,{useContext,useState} from 'react'
import Image from 'next/image'
import styles from "@/styles/Profile.module.css"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthContext } from '@/context';
import { Button } from '@mui/material';
import supabase from '../../supabase';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function to generate unique identifiers
const schema = z.object({
    firstname: z.string().min(1, { message: 'cant be empty' }),
    lastname: z.string().min(1, { message: 'cant be empty' }),
    email: z.string().email({ message: 'Invalid email format' }),
    });
const Profile = () => {
    const { setUserData,userData,setChange } = useContext(AuthContext);
    const [Url,setUrl] = useState('');
    const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(schema),});
    const handleChangeName = (event: { target: { value: any; }; }) => {
        // Assuming you want to set the 'name' property of 'userData' based on the input value
        setUserData({ ...userData, name: event.target.value });
    };  
    const handleChangeMail = (event: { target: { value: any; }; }) => {
        // Assuming you want to set the 'name' property of 'userData' based on the input value
        setUserData({ ...userData, email: event.target.value });
    };

        const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files && event.target.files[0];
            setSelectedFile(file);
            handleFileUpload();
    };

    const UploadUrl = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user?.id
        try{
            const { data: updatedUserData, error: updateError } = await supabase
                    .from('User')
                    .update({ avatar_url: Url })
                    .eq('user_id', userId);
                    if (updateError) {
                    console.error('Error updating avatar URL in Users table:', updateError.message);
                    } else {
                    console.log('Avatar uploaded successfully:', Url);
                    }
                
        }catch(error){

        }}
        
    

        const handleFileUpload = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            
            const userId = user?.id
            if (selectedFile) {
                const filePath = `/${userId}/${uuidv4()}-${selectedFile.name}`;
                const { data, error } = await supabase.storage.from('Avatar').upload(filePath,selectedFile);
                if (error) {
                    console.error('Error uploading avatar:', error.message);
                } else {
                    const { data } = supabase
                    .storage
                    .from('Avatar')
                    .getPublicUrl(filePath)
                const avatarUrl = data.publicUrl;
                setUrl(avatarUrl)
                
            };}}

    return (
        <div className={styles.Profile}>
            <h1 className={styles.ProfileH1}>
                Profile Details
            </h1>
            <p className={styles.ProfileP}>
            Add your details to create a personal touch to your profile.
            </p>
            
            <div  className={styles.ProfilePicture}>
                <span className={styles.ProfileSpan2}>Profile picture</span>
                <div className={styles.UploadImage}> 
                   {Url && <Image  className={styles.AvatarBackground} src={Url} alt='background-avatar' fill />}
                    <Image className={styles.IconeProfile} src={'/assets/images/icon-upload-image.svg'} alt='icon-upload-image' width={24}height={24} />
                    {/* <span className={styles.ProfileSpan}>
                        + Upload Image
                    </span> */}
                    <input  className={styles.ProfileSpan} type="file" onChange={handleFileChange} />
                </div>
                <div className={styles.ProfileDiv}>
                    <p className={styles.ProfileP}>Image must be below 1024x1024px.<br/>Use PNG or JPG format.</p>
                </div>
            </div>

            <form className={styles.Form} onSubmit={handleSubmit(() =>{ 
            UploadUrl(); setChange(prevChange=>!prevChange)})} action="">
                <div className={styles.ProfileForm}>
                    <div className={styles.ProfileFormRow}>
                        <label className={styles.ProfileLabel} htmlFor="">
                            Name*
                        </label>
                        <div  className={styles.LoginInputWrapper}>
                        <input  value={userData.name} style={errors.firstname ? { border: '#EC5757 1px solid' } : {}}  {...register('firstname')} className={styles.ProfileInput} onChange={handleChangeName} placeholder='e.g.John' type="text" />
                        {errors.firstname && <p className={styles.LoginError}>{errors.firstname?.message?.toString()}</p>}
                        </div>
                    </div>
                    <div className={styles.ProfileFormRow}>
                        <label className={styles.ProfileLabel} htmlFor="">
                            Email
                        </label>
                        <div  className={styles.LoginInputWrapper}>
                        <input value={userData.email} style={errors.email ? { border: '#EC5757 1px solid' } : {}}  {...register('email')} className={styles.ProfileInput} placeholder='e.g.email@example.com' onChange={handleChangeMail} type="text" />
                        {errors.email && <p className={styles.LoginError}>{errors.email?.message?.toString()}</p>}
                        </div>
                    </div>
                </div>
            <div className={styles.ProfileBottom}>
                <Button type='submit'  variant='contained' className={styles.ProfileButtonSave}>Save</Button>
            </div>
            </form>
        </div>
    )
}

export default Profile
