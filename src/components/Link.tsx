import React,{useState,useContext} from 'react'
import styles from '@/styles/Link.module.css'
import Image from 'next/image'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CustomSVG from './CustomSvg';
import { AuthContext } from '@/context';
import { MenuItem, Select, SelectChangeEvent,Button } from '@mui/material'
const Link = (props:{
    number:number,
    platform:string,
    link:string,
}) => {
    const [Platform, setPlatform] = React.useState('github');
    const { LinkArray, setLinkArray,setUserData,userData } = useContext(AuthContext);

    function RemoveLinkArray(index: number) {
      
        // Make sure the index is within bounds
        if (index >= 0 && index < LinkArray.length) {
          // Create a new array by excluding the item at the specified index
          const updatedLinkArray = LinkArray.filter((_, i) => i !== index);
          // Update the state with the new array
          setLinkArray(updatedLinkArray);
        }
      }
      function ChangePlatform(i: number, plat: string) {
        if (i >= 0 && i < LinkArray.length) {
          // Create a new array by updating the link property of the item at the specified index
          const updatedLinkArray = LinkArray.map((link, index) =>
            index === i ? { ...link, platform:plat } : link
          );
          // Update the state with the new array
          setLinkArray(updatedLinkArray);
        }
      }
      function ChangeLink(i: number, lien: string) {
        if (i >= 0 && i < LinkArray.length) {
          // Create a new array by updating the link property of the item at the specified index
          const updatedLinkArray = LinkArray.map((link, index) =>
            index === i ? { ...link, link: lien } : link
          );
          // Update the state with the new array
          setLinkArray(updatedLinkArray);
        }
      }
      
        const handleChangeLink = (event: { target: { value: any; }; }) => {
            const lienValue = event.target.value;
            ChangeLink(props.number, lienValue);
        };
     
    
  const handleChange = (event: SelectChangeEvent) => {
        setPlatform(event.target.value)
       ChangePlatform(props.number, event.target.value);
  };
    return (
        <div className={styles.Link}>
            <div className={styles.LinkHeader}>
                <div className={styles.LinkHeaderDiv1}>
                    <Image src={'/assets/images/icon-drag-and-drop.svg'} alt='drag-and-drop' width={20} height={20} />
                    <span className={styles.LinkNumber}>
                        Link #{props.number}
                    </span>
                </div>
                <button onClick={()=>{
                    RemoveLinkArray(props.number)
                }} className={styles.LinkRemove}>
                    Remove
                </button>
            </div>
            <div className={styles.LinkBody}>
                <label className={styles.LinkLabel} htmlFor="">
                    Platform
                </label>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Platform}
                label="Platform"
                onChange={handleChange}
                fullWidth
            >
                <MenuItem  value={'github'}><Button startIcon={<GitHubIcon/>}>Github</Button></MenuItem>
                <MenuItem value={'frontend-mentor'}><Button startIcon={<CustomSVG choice='frontendmentor' color='#1976d2'/>}>Frontend Mentor</Button></MenuItem>
                <MenuItem value={'twitter'}><Button startIcon={<TwitterIcon/>}>Twitter</Button></MenuItem>
                <MenuItem value={'linkedin'}><Button startIcon={<LinkedInIcon/>}>Linkedin</Button></MenuItem>
                <MenuItem value={'youtube'}><Button startIcon={<YouTubeIcon/>}>Youtube</Button></MenuItem>
                <MenuItem value={'facebook'}><Button startIcon={<FacebookIcon/>}>Facebook</Button></MenuItem>
                <MenuItem value={'twitch'}><Button startIcon={<CustomSVG choice='twicht' color='#1976d2' />}>Twicht</Button></MenuItem>
                <MenuItem value={'devto'}><Button startIcon={<CustomSVG choice='devto' color='#1976d2'/>}>Dev.to</Button></MenuItem>
                <MenuItem value={'codewars'}><Button startIcon={<CustomSVG choice='codewars' color='#1976d2'/>}>Codewars</Button></MenuItem>
                <MenuItem value={'codepen'}><Button startIcon={<CustomSVG choice='codepen' color='#1976d2'/>}>Codepen</Button></MenuItem>
                <MenuItem value={'freecodecamp'}><Button startIcon={<CustomSVG choice='freecodecamp' color='#1976d2'/>}>freeCodeCamp</Button></MenuItem>
                <MenuItem value={'gitlab'}><Button startIcon={<CustomSVG choice='gitlab' color='#1976d2'/>}>Gitlab</Button></MenuItem>
                <MenuItem value={'hashnode'}><Button startIcon={<CustomSVG choice='hashnode' color='#1976d2'/>}>Hashnode</Button></MenuItem>
                <MenuItem value={'stack-overflow'}><Button startIcon={<CustomSVG choice='stack-overflow' color='#1976d2' />}>Stack Overflow</Button></MenuItem>
            </Select>
                <label className={styles.LinkLabel} htmlFor="">Link</label>
                <div className={styles.LinkWrapperInput}>
                    <Image className={styles.LinkIcon} src={'/assets/images/icon-link.svg'} alt='icon-link' width={16} height={16} />
                    <input onChange={handleChangeLink} className={styles.LinkInput} type="text" />
                </div>
            </div>
        </div>
    )
}

export default Link
