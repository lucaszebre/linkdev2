import React from 'react'
import styles from '@/styles/ThankYouForRegister.module.css'
import Image from 'next/image'
const ThankYouForRegister = () => {
    return (
        <div className={styles.ThankYouContainer}>
            <div className={styles.ThankYouWrapper}>
            <div className={styles.ThankYouImage}>
                        <Image  src="/assets/images/logo-devlinks-large.svg" alt="devlink-logo" fill />
                    </div>
                <h1 className={styles.ThankYouH1}>
                    Thank You for Register
                </h1>
                <p className={styles.ThankYouP}>
                    We send you a link to verif your mail 
                </p>
            </div>
        </div>
    )
}

export default ThankYouForRegister
