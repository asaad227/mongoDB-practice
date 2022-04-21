import { Router } from 'express';
import {deleteListingByName} from '../../demo.js'
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = Router();

// This will help us connect to the database
import { getDb } from '../db/conn.js';

// This section will help you get a list of all the records.
recordRoutes.get('/listings', async function (_req, res) {
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
          payload: result
          
        });
      }
    });
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
recordRoutes.delete('/listings/:id', async function(req, res) {
  const dbConnect = await getDb();
  const id = Number(req.params.id)
  const deleted = await deleteListingByName(dbConnect, id);
     res.json({
          
          success: true,
          payload: deleted
          
        });
});

export default recordRoutes;
