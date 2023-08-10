import supabase from "../../supabase"
export const getUrl = async (path:string) => {
    try{
    const { data } = supabase
    .storage
    .from('Avatar')
    .getPublicUrl(path)
    return data.publicUrl
    }catch(error){
        console.error('can not get the url ')
    }
}



