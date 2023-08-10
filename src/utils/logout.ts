import Router from "next/router"
import supabase from "../../supabase"
export    const Logout =async () => {
    try{
        const { error } = await supabase.auth.signOut()
        Router.push('/login')
    }catch(error){
        console.log(error)
    }
    
}