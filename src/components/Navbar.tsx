import { useContext } from 'react'
import Image from 'next/image'
import styles from '@/styles/Navbar.module.css'
import * as React from 'react';
import { SvgIcon } from '@mui/material';
import Button from '@mui/material/Button';
import supabase from '../../supabase'
import Router from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/context';
import CustomSVG from './CustomSvg';
const Navbar = () => {
    const { setNavButton,Navbutton}  = useContext(AuthContext);
    const Logout =async () => {
        try{
            const { error } = await supabase.auth.signOut()
            Router.push('/login')
        }catch(error){
            console.log(error)
        }
        
    }
    return (
        <div className={styles.NavbarWrapper}>
            <header className={styles.Navbar}>
                <div className={styles.NavbarImage}>
                    <Image className={styles.LogoPc} src="/assets/images/logo-devlinks-large.svg" alt="devlink-logo" fill />
                    <Image className={styles.LogoMobile} src="/assets/images/logo-devlinks-small.svg" alt="devlink-logo" fill />
                </div>

                <div className={styles.NavbarDiv}>
                    <Button
                        onClick={() => {
                            setNavButton('Links');
                        } }
                        variant={Navbutton == 'Links' ? "contained" : "outlined"} startIcon={<CustomSVG choice='links' color={Navbutton == 'Links' ? "white" : "#633CFF"} />} >
                    Links
                </Button>
                <Button
                    onClick={() => {
                        setNavButton('Profile');
                    } }
                    variant={Navbutton == "Profile" ? "contained" : "outlined"} startIcon={<CustomSVG choice='header' color={Navbutton == 'Profile' ? "white" : "#633CFF"} />}>
                    Profile Details
                </Button>
            </div><div className={styles.LastDiv}>
                <Button
                variant='outlined'
                >
                    <Link href={'/preview'}>Preview</Link>
                </Button>
                <Button
                    onClick={() => {
                        Logout();
                    } }
                >
                    Logout
                </Button>

            </div>
                    
            </header>
        </div>
    )
}

export default Navbar
