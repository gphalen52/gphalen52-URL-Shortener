require('dotenv').config();
//test
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


function dataManagement(action, input) {
  const filePath = path.join(__dirname, 'public', 'data.json');

  // Check if the file exists, create it if not
  if (!fs.existsSync(filePath)) {
    try {
      // Create an empty file if it does not exist
      fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
      console.log('File created successfully.');
    } catch (err) {
      console.error('Error creating the file:', err);
    }
  }
}


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
