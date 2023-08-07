import React,{useContext, useEffect, useState} from 'react'
import styles from '@/styles/Preview.module.css'
import IllustrationLink from './IllustrationLink'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Button } from '@mui/material'
import { AuthContext } from '@/context';
import supabase from '../../supabase'
import { User } from '@supabase/supabase-js'
const Preview = () => {
    const { userData,LinkArray}  = useContext(AuthContext);
    const [user,setUser]= useState<User|null>()
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
    return (
        <div className={styles.Preview}>
            <div className={styles.PreviewBackground}></div>
            <div className={styles.PreviewTop}>
                {user && <Link href={'/customize'}><Button variant='outlined' className={styles.BackEditor}>Back to Editor</Button></Link>}
                <Button variant='contained' className={styles.ShareLink}>Share Link</Button>
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
    )
}

export default Preview
