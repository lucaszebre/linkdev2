import React,{useContext, useEffect, useState} from 'react'
import styles from '@/styles/Customize.module.css'
import { Button } from '@mui/material'
import { AuthContext } from '@/context';
import Empty from './Empty'
import LinkT from './Link'
import { Link } from '@/types/ContextType';
const LinkComponents = () => {
    const { LinkArray,setLinkArray,setUserData,setChange,userData,change } = useContext(AuthContext);
    const [compteur,setCompteur]= useState(0)
    const addNewLink = () => {
        setLinkArray((prevLinkArray) => [...prevLinkArray, {link:'',platform:''}]);
        }
    
        function UpdateData() {
            LinkArray.forEach((linkItem) => {
                setUserData((prevUserData) => {
                return { ...prevUserData, [linkItem.platform]: linkItem.link };
                });
            });
            setChange((prevChange) => !prevChange);
            console.log(userData);
            }

            function filterLinksWithValue(LinkArray:Link[]) {
                // Use the filter method to create a new array with links that have a value for the 'link' property
                const filteredLinks = LinkArray.filter((linkItem) => linkItem.link !== '');
                return filteredLinks;
            }

            const [ArrayLinkLocal,setArrayLinkLocal] = useState(filterLinksWithValue(LinkArray))

            useEffect(()=>{
                setArrayLinkLocal(filterLinksWithValue(LinkArray))
            },[change])

    
    
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
                {ArrayLinkLocal.length == 0 ? (
            <Empty />
        ) : (
            ArrayLinkLocal.map((linkItem,index) => (
            <LinkT key={index} platform={linkItem.platform} link={linkItem.link} number={index} remove={setArrayLinkLocal} />
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
