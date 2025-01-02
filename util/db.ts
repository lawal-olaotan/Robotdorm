import ClientPromise from '../lib/mongoDb';
import { ObjectId } from 'mongodb';


export type User = {
    _id:ObjectId,
    email:string,
    name:string,
    isPremium?:boolean,
    emailVerified?:boolean | null | string,
}

export type UserResponse = boolean | User;


 export const db = ()=> {

    const start = async(collectionId:string)=> {
        const client = (await ClientPromise).db();
        const collection = client.collection(collectionId)
        return collection
    }

    const getUserByEmail = async(email:string):Promise<UserResponse> =>  {
        const db = await start('users');
        const userDetails = await db.findOne( { email} ) 
        if(!userDetails) return false
        return userDetails as User
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

    const deleteResourcesById = async(userId:string) => {

        const resources = [
            {
                collectionName: 'lists',
                filter:{postedBy:userId},
                type:'multiple'
            }, 
            {
                collectionName: 'access',
                filter:{userId},
                type:'single'
            }, 
            {
                collectionName: 'summaries',
                filter:{postedBy:userId},
                type:'multiple'
            }, 
            {
                collectionName: 'users',
                filter:{_id: new ObjectId(userId)},
                type:'single'
            }, 
            {
                collectionName: 'sessions',
                filter:{userId: new ObjectId(userId)},
                type:'multiple'
            }, 
        ]

        resources.forEach(async(resource)=> {
            const db = await start(resource.collectionName);
            if(resource.type === 'multiple' ) return await db.deleteMany(resource.filter)
            await db.deleteOne(resource.filter)
        })
    }

    return{
        getUserByEmail,
        getAccessbyId,
        saveUserAccess,
        deleteResourcesById
    }


}