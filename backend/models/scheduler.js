// scheduler.js
const cron = require('node-cron');
const axios = require('axios');

// Run every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  try {
    console.log('Running daily notification job...');
    await axios.post('http://localhost:1000/api/emails/send-notifications');
    console.log('Notifications sent successfully.');
  } catch (error) {
    console.error('Error in daily notification job:', error.message);
  }
});
