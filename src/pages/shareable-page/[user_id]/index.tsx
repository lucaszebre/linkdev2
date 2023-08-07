import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/ShareablePage.module.css';
import IllustrationLink from '@/components/IllustrationLink';
import { Avatar } from '@mui/material';
import supabase from '../../../../supabase';
import { UserData } from '@/types/ContextType';

export interface LinkType {
  platform: string;
  link: string | null;
}

const ShareablePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [linkArray, setLinkArray] = useState<LinkType[]>([]);
  const router = useRouter();
  const { user_id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user_id) {
          // User is authenticated, check if a row exists in the "User" table
          let { data: User, error } = await supabase
            .from('User')
            .select('*')
            .eq('user_id', user_id)
            .single();

          if (User) {
            // User already has a row in the "User" table, set the user data
            setUserData(User);
            if (User.links == null) {
              setLinkArray([]);
            } else {
              setLinkArray(User.links);
            }
          } else {
            // User not found or error occurred while fetching data
            setUserData(null);
            setLinkArray([]);
          }
        }
      } catch (error) {
        console.error(error);
        setUserData(null);
        setLinkArray([]);
      }
    };

    fetchUserData();
  }, [user_id]);

  // Show loading or error message when data is not available
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.Preview}>
        <div className={styles.PreviewBackground}></div>
        <div className={styles.PreviewCenter}>
          <Avatar src={userData.avatar_url} sx={{ width: 96, height: 96 }} />
          <h1 className={styles.PreviewName}>{userData.name}</h1>
          <p className={styles.PreviewMail}>{userData.email}</p>
          <div className={styles.PreviewBody}>
            {linkArray.map((linkItem, index) => (
              <IllustrationLink
                name={linkItem.platform}
                link={linkItem.link ? linkItem.link : ''}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareablePage;

