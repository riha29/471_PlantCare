// backend/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./config/plantcare-cb7d8-firebase-adminsdk-tx3bn-da55f7123c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
