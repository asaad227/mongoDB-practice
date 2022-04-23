import express from 'express';
import pkg from 'mongodb';
const { ObjectId } = pkg;
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
import { getDb } from '../db/conn.js';

// This section will help you get a list of all the records.
recordRoutes.get('/listings', async function (req, res) {
  const dbConnect = await getDb();
  dbConnect
    .collection('listingsAndReviews')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json({
          success: true,
          payload: result,
        });
      }
    });
});
recordRoutes.get('/listings/:id', async (req, res)=>{
  const dbConnect = await getDb();
  const findById = await dbConnect.collection('listingsAndReviews').findOne({_id: ObjectId(req.params.id)})

  if(findById){
    res.json({
          
      success: true,
      payload: findById,
      
    });
  }else{
    res.json({
      success: false,
      payload: `No valid Id was found`,
    })
  }
});

// async function createListing( newListing){
//   const dbConnect = await getDb();
//       const result = await dbConnect.collection('listingsAndReviews').insertOne(newListing);
  
//       console.log(`newListing has been created with following id: ${result.insertedId}`)
//   }
recordRoutes.post('/listings', async (req, res)=>{
  const dbConnect = await getDb();
      const result = await dbConnect.collection('listingsAndReviews').insertOne({newListing: req.body});
  
      console.log(`newListing has been created with following id: ${result.insertedId}`)

res.json({
  success: true,
  payload: result,
})
});

// // This section will help you create a new record.
// recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
//   const dbConnect = getDb();
//   const matchDocument = {
//     listing_id: req.body.id,
//     last_modified: new Date(),
//     session_id: req.body.session_id,
//     direction: req.body.direction,
//   };

//   dbConnect
//     .collection('matches')
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send('Error inserting matches!');
//       } else {
//         console.log(`Added a new match with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });
// });

// This section will help you update a record by id.
// recordRoutes.route('/listings/updateLike').post(function (req, res) {
//   const dbConnect = getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection('listingsAndReviews')
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//       }
//     });
// });

// This section will help you delete a record.
recordRoutes.delete('/listings/delete/:id', async (req, res)=> {
  const dbConnect = await getDb();
  const deleted = await dbConnect.collection('listingsAndReviews').deleteOne({_id: ObjectId(req.params.id)})
     
  if(deleted){
    res.json({
          
      success: true,
      payload: deleted,
      
    });
  }else{
    res.json({
      success: false,
      payload: `No valid Id was found`
    })
  }
  
  
});



recordRoutes.put('/listings/update/:id', async (req, res) => {
 
const dbConnect = await getDb();
const updated = await dbConnect.collection('listingsAndReviews').findOneAndUpdate({_id: ObjectId(req.body.id)}, {$set: req.body}) 

if(updated){
    res.json({
          
      success: true,
      payload: updated,
      
    });
  }else{
    res.json({
      success: false,
      payload: `It was not updates`
    })
  }
  
  
});


export default recordRoutes;