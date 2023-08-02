import React, { createContext, useEffect, useState } from 'react';
import  supabase  from '../../supabase'; // Import your Supabase client here
import Router from 'next/router';
import { User } from '@supabase/supabase-js';
import {Link,UserData} from '@/types/ContextType'
export type AuthContext = { // Type for context
    userData:UserData
    setUserData:React.Dispatch<React.SetStateAction<UserData>>
    currentUser:User
    Navbutton: string; // Delete block state
    setNavButton: React.Dispatch<React.SetStateAction<string>>;
    LinkArray:Link[],
    setLinkArray:React.Dispatch<React.SetStateAction<Link[]>>
}
// Create the initial context
export const AuthContext = createContext<AuthContext>({
    LinkArray:[],
    setLinkArray:() => {},
    currentUser:{
        id: '',
        app_metadata: undefined,
        user_metadata: undefined,
        aud: '',
        created_at: ''
    },
    Navbutton: '',
    setNavButton: () => {},
    userData:{
        name: '',
        email: '',
    },
    setUserData:()=>{}
    
    
});

// Create the AuthContextProvider component
export const AuthContextProvider = (props: { children: React.ReactNode })=> {
  // State to keep track of the current user
  const [userData,setUserData] = useState<UserData>({name:'',
email:''})
    const [currentUser, setCurrentUser] = useState(null);
    const [Navbutton,setNavButton] = useState('Links')
    const [LinkArray,setLinkArray] = useState<Link[]>([])
    // Function to fetch the current user from Supabase

    const onAuthStateChange = async () =>{
        try{
            const { data:{user},}=await supabase.auth.getUser()
            if(user){
                setCurrentUser(user)
                Router.push('/customize')
            }
        }
        catch(error){
            console.log(error)
        }finally{

        }
    }
    const addNewLink = (newLink: Link) => {
        setLinkArray((prevLinkArray) => [...prevLinkArray, newLink]);
        };
    

    // useEffect to fetch the current user on component mount
        useEffect(() => {
            onAuthStateChange();
        }, []);

        // Function to check if the user is connected (authenticated)
        

        return (
        <AuthContext.Provider
            value={{
                currentUser,
                LinkArray,
                setLinkArray,
                setNavButton,
                Navbutton,
                userData,
                setUserData
            }}
        >
            {props.children}
            </AuthContext.Provider>
        );
    };

export default AuthContextProvider
