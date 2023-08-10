import supabase from "../../supabase";
import Router from "next/router";

export const handleLoginWithGoogle = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                },
            })
    
        if (error) {
            console.error('Error signing in with Google:', error.message);
        } else {
            // Update state with the user data
            console.log('Logged in user:', data);
            Router.push('/');
        }
        } catch (err) {
        console.error('Error signing in with Google:');
    };}

export const handleLoginWithGithub = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                },
            })
    
        if (error) {
            console.error('Error signing in with Github:', error.message);
        } else {
            // Update state with the user data
            console.log('Logged in user:', data);
        }
        } catch (err) {
        console.error('Error signing in with Github:');
        }
    };


