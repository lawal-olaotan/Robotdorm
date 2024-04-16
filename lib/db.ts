import ClientPromise from './mongoDb';


 export const db = ()=> {

    const start = async(collectionId:string)=> {
        const client = (await ClientPromise).db();
        const collection = client.collection(collectionId)
        return collection
    }

    const getUserByEmail = async(email:string) => {
        const db = await start('users');
        const userDetails = await db.findOne( { email} ) 
        if(!userDetails) return false
        return userDetails

    }

    const getAccessbyId = async(userId:string)=> {
        const db = await start('access');
        const  accessDetails = await db.findOne({userId})
        if(!accessDetails) return false
        return accessDetails
    }

    const saveUserAccess = async(userAccessObject:any)=> {
        const db = await start('access')
        const userAccessDoc = await db.insertOne(userAccessObject)
        if(!userAccessDoc) return false
        return true;
    }

    return{
        getUserByEmail,
        getAccessbyId,
        saveUserAccess
    }


}