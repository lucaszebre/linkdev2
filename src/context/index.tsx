import React, { createContext, useEffect, useState } from 'react';
import  supabase  from '../../supabase'; // Import your Supabase client here
import Router from 'next/router';
import { User,UserAppMetadata,UserMetadata} from '@supabase/supabase-js';
import {LinkType,UserData} from '@/types/ContextType'
import { createLinkArray } from '@/utils/CreateLinkArray';
export type AuthContext = { // Type for context
    userData:any
    setUserData:React.Dispatch<React.SetStateAction<any[]>>
    Navbutton: string; // Delete block state
    setNavButton: React.Dispatch<React.SetStateAction<string>>;
    LinkArray:LinkType[],
    setLinkArray:React.Dispatch<React.SetStateAction<LinkType[]>>;
    change:boolean,
    setChange:React.Dispatch<React.SetStateAction<boolean>>
}
// Create the initial context
export const AuthContext = createContext<AuthContext>({
    LinkArray:[],
    setLinkArray:() => {},
    Navbutton: '',
    setNavButton: () => {},
    userData:[],
    setUserData:()=>{},
    setChange:()=>{},
    change:false
    
    
});

// Create the AuthContextProvider component
export const AuthContextProvider = (props: { children: React.ReactNode })=> {
  // State to keep track of the current user
    const [change,setChange] = useState(false)
    const [userData,setUserData] = useState<any[]>([])
    const [Navbutton,setNavButton] = useState('Links')
    const [LinkArray,setLinkArray] = useState<LinkType[]>([])
    // Function to fetch the current user from Supabase

    const onAuthStateChange = async () =>{
        try{
            const { data:{user},}=await supabase.auth.getUser()
            if(user && window.location.hostname=='/login'){
                Router.push('/')
            }
        }
        catch(error){
            console.log(error)
        }finally{

        }
    }
    
    const onMounted = async () => {
        try {
          // Check if the user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
            if (user) {
            // User is authenticated, check if a row exists in the "User" table
            let { data: User, error } = await supabase
                .from('User')
                .select('*')
                .eq('user_id', user.id)
                .single();
            if (User) {
              // User already has a row in the "User" table, set the user data
                setUserData(User);
                if(User.links==null){
                    setLinkArray([])
                }else{
                    setLinkArray(User.links)
                }
                console.log(User)
            } else {
              // User doesn't have a row, create a new one with the GitHub URL
            try {
                const { data, error } = await supabase
                    .from('User')
                    .insert({ user_id: user.id,email:user.email })
                    .select();
                console.log(user.email)
                
                console.log(data);
                console.error(error);
                } catch (error) {
                    console.error(error);
                }
                }
            }
            } catch (error) {
            console.error(error);
        }
        };

        const onUpdate = async () => {
        try {
          // Check if the user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
            if (user) {
            // User is authenticated, update the data of the user 
            try{
                const { data, error } = await supabase
                .from('User')
                .update(userData)
                .eq('user_id', user.id)
                .select()
                    if(error){
                        console.error(error)
                    }else{
                       console.log(data)
                    }
            }catch(error){
                console.error(error)
            }
        }else{
            console.error('user not log in')
        }
    }catch{

    }
}

const onDelete = async () => {

}
        
        
        



    

    // useEffect to fetch the current user on component mount
        useEffect(() => {
            onAuthStateChange();
            onMounted();

        }, []);

        useEffect(() => {
            onUpdate();
        }, [change]);

        // Function to check if the user is connected (authenticated)
        

        return (
        <AuthContext.Provider
            value={{
                LinkArray,
                setLinkArray,
                setNavButton,
                Navbutton,
                userData,
                setUserData,
                setChange,
                change,
            }}
        >
            {props.children}
            </AuthContext.Provider>
        );
    };

export default AuthContextProvider
