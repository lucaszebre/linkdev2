import React,{useContext, useEffect, useState} from 'react'
import styles from '@/styles/Preview.module.css'
import IllustrationLink from './IllustrationLink'
import Link from 'next/link'
import Image from 'next/image'
import { Alert, Avatar, Button, Snackbar } from '@mui/material'
import { AuthContext } from '@/context';
import supabase from '../../supabase'
import { User } from '@supabase/supabase-js'
import { copy } from '@/utils/copy'
const Preview = () => {
    const { userData,LinkArray}  = useContext(AuthContext);
    const [user,setUser]= useState<User|null>()
    const [open, setOpen] = React.useState(false);
    async function IsUserConnected(){
        try{
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }catch(error){
            setUser(null)
        }
    }

    useEffect(()=>{
        IsUserConnected()
    },[])

    const handleClick = () => {
        copy(userData.user_id)
        setOpen(true);
      };
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    return (
        <>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link Copied to the clipboard"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      The link is copied to the clipboard!
    </Alert> 
    </Snackbar>
        <div className={styles.Preview}>
            <div className={styles.PreviewBackground}></div>
            <div className={styles.PreviewTop}>
                {user && <Link href={'/'}><Button variant='outlined' className={styles.BackEditor}>Back to Editor</Button></Link>}
                <Button onClick={handleClick} variant='contained' className={styles.ShareLink}>Share Link</Button>
            </div>
            <div className={styles.PreviewCenter}>
            <Avatar src={userData.avatar_url} sx={{
            width:96,
            height:96
        }} />
                <h1 className={styles.PreviewName}>
                    {userData.name}
                </h1>
                <p className={styles.PreviewMail}>
                {userData.email}
                </p>
                <div className={styles.PreviewBody}>
                {
                LinkArray.map((linkItem,index) => (
                    <IllustrationLink name={linkItem.platform} link={linkItem.link?linkItem.link:''}  key={index} />
                    ))
            }
                </div>
            </div>
        </div>
        </>
    )
}

export default Preview
