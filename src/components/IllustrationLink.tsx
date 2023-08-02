import React from 'react'
import Image from 'next/image'
import styles from "@/styles/IllustrationLink.module.css"
import CustomSVG from './CustomSvg'
import { colorType } from '@/utils/ColorLink'
    const IllustrationLink = (props:{
        name:string
        link:string
    }) => {
    return (
        <a href={props.link} target='_blank'>
            <div className={styles.IllustrationLink} style={{background:colorType(props.name)}}>
                <div className={styles.IllustrationLinkDiv1}>
                    <Image src={`/assets/images/icon-${props.name}.svg`} alt='logo' width={16} height={16} />
                    <span className={styles.IllustrationLinkSpan}>{props.name}</span>
                </div>
                <Image src={'/assets/images/icon-arrow-right.svg'} alt='arrow-right' width={16} height={16} />
            </div>
        </a>
    )
    }

    export default IllustrationLink
