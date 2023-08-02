import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Customize.module.css'
const Empty = () => {
  return (
    <div className={styles.EmptyDiv}>
    <Image src={'/assets/images/illustration-empty.svg'} width={250} height={152} alt='illustration-empty' />
    <h2 className={styles.CustomizeH2}>
        Let's get you started
    </h2>
    <p className={styles.CustomizeP}>
    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
    </p>
</div>
  )
}

export default Empty
