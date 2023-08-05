import * as React from 'react';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from '@/styles/Mobile.module.css'
import { AuthContext } from '@/context';
import IllustrationLink from './IllustrationLink';
import Image from 'next/image';
const Mobile = () => {
    const { change,LinkArray,userData}  = useContext(AuthContext);
  return (
    <div className={styles.MobileContainer}>
        <div className={styles.BorderDiv}>
          <Image className={styles.Border} src={'/assets/images/mobile-border.svg'} alt='mobile-border' fill />
        </div>
      <div className={styles.MobileTop}>
        <div>{change &&<Avatar key={1} sx={{
          width:96,
          height:96
          
        }} src={userData.avatar_url} /> || <Avatar key={2} sx={{
          width:96,
          height:96
          
        }} src={userData.avatar_url} /> }
        </div>
        <div className={styles.MobileName}>
            <h1 className={styles.MobileH1}>
                {userData.name}
            </h1>
            <p className={styles.MobileP}>
                {userData.email}
            </p>
        </div>
      </div>
        <div className={styles.MobileCore}>
          {
              LinkArray.map((linkItem,index) => (
                  <IllustrationLink name={linkItem.platform} link={linkItem.link?linkItem.link:''}  key={index} />
                  ))
          }
      </div>
    </div>
  )
}

export default Mobile
