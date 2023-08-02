import React,{useContext} from 'react'
import styles from '@/styles/Customize.module.css'
import { Button } from '@mui/material'
import { AuthContext } from '@/context';
import Empty from './Empty'
import Link from './Link'

const LinkComponents = () => {
    const { LinkArray,setLinkArray } = useContext(AuthContext);
    const addNewLink = () => {
        setLinkArray((prevLinkArray) => [...prevLinkArray, {link:'',platform:''}]);
      }
  return (
    <div className={styles.CustomizeContainer}>
                <h1 className={styles.CustomizeH1}>
                    Customize your links
                </h1>
                <p className={styles.CustomizePContainer}>
                    Add/Edit/Remove links below and then share all your profiles with the world!
                </p>
                <Button onClick={()=>{
                    addNewLink()
                }}variant='outlined' className={styles.CustomizeButton}>
                    + Add new link
                </Button>
                {LinkArray.length === 0 ? (
            <Empty />
        ) : (
            LinkArray.map((linkItem,index) => (
            <Link platform={linkItem.platform} link={linkItem.link} number={index} />
            ))
        )}
                
                <div className={styles.CustomizeFooter}>
                    <Button variant='contained'>
                        Save
                    </Button>
                </div>
            </div>
  )
}

export default LinkComponents
