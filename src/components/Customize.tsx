/* eslint-disable react/no-unescaped-entities */
import React,{useContext} from 'react'
import styles from '@/styles/Customize.module.css'
import Image from 'next/image'
import Navbar from './Navbar'
import { AuthContext } from '@/context';
import Empty from './Empty';
import Profile from './Profile';
import LinkComponents from './LinkComponents';
import Mobile from './Mobile';
const Customize = () => {
    const { Navbutton}  = useContext(AuthContext);

    return (
        <>
                <Navbar />
        <div className={styles.Wrapper}>
            
            <div className={styles.CustomizeWrapper}>
      
                <div className={styles.illustration}>
                    <Mobile  />
                </div>
                {Navbutton=='Links' ? <LinkComponents /> : <Profile/>}
            </div>
            </div>

        </>
        
    )
}

export default Customize
