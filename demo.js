import { MongoClient } from 'mongodb';
import 'dotenv/config';

async function main(){
    const uri = process.env.DATABASE_URL
    const client = new MongoClient(uri);
    try{
        await client.connect();
        // await createListing(client, {
        //     name:'Really comfy',
        //     summary: 'nice holiday', 
        //     bedroom:1,
        //     bathroom: 1

        // })
        await upsertListingByName(client, "Very Dirty",{ name: "Very Dirty",
            bedroom: 2,
            bathroom: 2
            
       })
        //   await updateListing(client, "Sunshine",{
        //      bedroom: 2,
        //      bathroom: 2
             
        // })
        // await listDatabases(client) 
        // await createMulti(client, [{
        //     name: 'Sunshine',
        //     summary: 'Nice and clean room',
        //     bedroom: 1,
        //     bathroom: 1

        // },{
        //     name: 'Turin is beauty',
        //     summary: 'Not sure ',
        //     bedroom: 1,
        //     bathroom: 1

        // }, {
        //     name: 'Rome is the place ',
        //     summary: 'Need to check this out',
        //     bedroom: 1,
        //     bathroom: 1

        // }]);
        // await findListingByName(client, {
        //     name: 'Beautiful view'
        // })


    }catch (e){
        console.error(e)
    }finally{
        await client.close();
    }

}

main().catch(console.error)



// async function findListingByName(client, byName){
//     const result = await client.db('sample_airbnb').collection('listingsAndReviews').findOne(byName);
    
//     if(result){
//         console.log(`Listing found by the name`, byName.name)
//         console.log(result)
//     }else{
//         console.log(`No listing was found by the name`, byName.name)
//     }
// }

// async function createMulti(client, newListings){

//     const result = await client.db('sample_airbnb').collection('listingsAndReviews').insertMany(newListings);
//     console.log(`${result.insertedCount} new listings created with following id:(s)`)
//     console.log(result.insertedIds)
// }

// async function createListing(client, newListing){

//     const result = await client.db('sample_airbnb').collection('listingsAndReviews').insertOne(newListing);

//     console.log(`newListing has been created with following id: ${result.insertedId}`)
// }

// async function updateListing(client, nameOfListing, updateListing){

//     const result = await client.db('sample_airbnb').collection('listingsAndReviews').updateOne({name: nameOfListing}, {$set: updateListing});

//     console.log(`${result.matchedCount} found that many results.`)
//     console.log(`${result.modifiedCount} has been modified`)
// }
async function upsertListingByName(client, nameOfListing, updateListing, upsert){

    const result = await client.db('sample_airbnb').collection('listingsAndReviews').updateOne({name: nameOfListing}, {$set: updateListing}, {upsert:true});

    if(result.upsertedCount > 0){
        console.log(`one document(s) has been inserted with following id: ${result.upsertedId}`)
    }else{
        console.log(`${result.modifiedCount} has been modified`)
    }
   
}

// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => {
//         console.log(`- ${db.name}`)
//     });
// }