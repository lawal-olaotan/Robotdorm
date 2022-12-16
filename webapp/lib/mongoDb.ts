import  {MongoClient} from 'mongodb'; 

const URI= process.env.MONGO_URI;
   


 const options:any = {}


 let ClientPromise:Promise<MongoClient>

 if(!process.env.MONGO_URI){
     throw new Error('Please add your mongo URI')
 }

     let client = new MongoClient(URI,options)
     ClientPromise = client.connect(); 


    if(!global._MongoClientPromise){
        client = new MongoClient(URI,options); 
        global._mongoClientPromise = client.connect(); 
    }
    ClientPromise = global._mongoClientPromise
 


export default ClientPromise
