const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
let i = 0;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bikes-rental-a4d84-default-rtdb.firebaseio.com",
});

router.get("/", (req, res) => {
  if (!req.query.uid) {
    return res.status(404).send("Invalid route");
  }
  if (req.query.uid) {
    admin
      .auth()
      .deleteUser(req.query.uid)
      .then(() => {
        res.status(200).send("User Deleted From Firebase Auth");
      })
      .catch(function (error) {
        res.status(501).send(error);
      });
  }
});

router.get("/process", (req, res) => {
  if (i === 150) {
    i=0;
    res.send({
      statusCode: "200",
      statusMessage: "Processing Completed successfully",
    });
  } else {
    res.send({
      statusCode: "102",
      statusMessage: `Processing Started(or In Progress)`
    });
    i+=25;
  }
});
module.exports = router;
