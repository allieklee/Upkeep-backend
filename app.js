//This defines a GET endpoint /api/searchCards that takes a 
// query parameter name and returns an array of cards that match
// the search term.

// To make a request to this endpoint from your frontend, you can 
// use the fetch API or a library like axios. 

const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const app = express();

const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));


app.get('/api/searchCards', async (req, res) => {
  const name = req.query.name;
  try {
    const response = await axios.get('https://api.scryfall.com/cards/search', {
      params: {
        q: name,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });

    const cards = response.data.data.map((card) => {
      return {
        name: card.name,
        imageUrl: card.image_uris.small,
      };
    });

    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server-error');
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});