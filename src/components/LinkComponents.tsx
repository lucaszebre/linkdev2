import React,{useContext, useEffect, useState} from 'react'
import styles from '@/styles/Customize.module.css'
import { Button } from '@mui/material'
import { AuthContext } from '@/context';
import Empty from './Empty'
import LinkT from './Link'
import { Link } from '@/types/ContextType';
const LinkComponents = () => {
    const { LinkArray,setLinkArray,setUserData,setChange,userData,change } = useContext(AuthContext);
    const addNewLink = () => {
        setLinkArray((prevLinkArray) => [...prevLinkArray, {link:'',platform:''}]);
        }
    
        function UpdateData() {
            if(LinkArray.length==0){
                setUserData((prevUserData) => {
                    return { ...prevUserData, links:null };
                    })
            }
            LinkArray.forEach((linkItem) => {
                setUserData((prevUserData) => {
                return { ...prevUserData, links:LinkArray };
                });
            });
            setChange((prevChange) => !prevChange);
            console.log(userData);
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
                {LinkArray.length == 0 ? (
            <Empty />
        ) : (
            LinkArray.map((linkItem,index) => (
            <LinkT key={index} platform={linkItem.platform} link={linkItem.link} number={index} remove={setLinkArray} />
            ))
        )}
                
                <div className={styles.CustomizeFooter}>
                    <Button 
                    onClick={()=>{
                        UpdateData()
                    }}
                    variant='contained'>
                        Save
                    </Button>
                </div>
            </div>
  )
}

export default LinkComponents
