  to start run "npm start"
  this will run on http://localhost:3000/
  
  This is an app to get a deck of cards it has the following end points 
  POST /deck/new will return a full deck of cards if you provide the an JSON option
    {"shuffle": true} to get a shuffled deck.

  GET /deck/:uid will return a full deck of cards
  POST /deck/:uid will give you a chance to deal the deck by posting a JSON option 
  {"count": number of cards you want}. the deck will reshuffle after all cards are dealt out