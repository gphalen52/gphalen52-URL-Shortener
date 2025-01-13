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

let file=fs.readFileSync(filepath)

async function saveData(filePath, action, input) {
  if (action !== 'save data' || input == null) {
    return; 
  }

  try {
    
    let data = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err; 
      }
    }
    const isDuplicate = data.some(d => d.original_url === input.original_url);
    if (isDuplicate) {
      console.log('Input already exists, skipping save.');
      return; 
    }

    data.push(input);

    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data saved successfully.');
  } catch (err) {
    console.error('Error saving data:', err.message);
  }
}

 if (action === 'load data' && input === null) {
  
  if (!file || file.length === 0) return;

  try {
    
    return JSON.parse(file);
  } catch (error) {
    
    console.error('Invalid JSON:', error);
    return;
  }
}

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
