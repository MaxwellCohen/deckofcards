var Deck = require('../data/deck');
var express = require('express');
var router = express.Router();

// makes a new deck and returns a full deck
router.post('/new', function (req, res, next) {
  var deck = new Deck();
  deck.makeNewDeck(req.body.shuffle, (err) => {
    returnDeck(err, res, deck, 'could not make deck');
  });
});

router.get('/:uid', function (req, res, next) {
  var deck = new Deck();
  deck.getDeckFromID(req.params.uid, null ,(err) => {
    returnDeck(err, res, deck, deck.err);
  });
});

router.post('/:uid', function (req, res, next) {
  var deck = new Deck();
  deck.getDeckFromID(req.params.uid, parseInt(req.body.count) ,(err) => {
    returnDeck(err, res, deck, deck.err);
  });
});

function returnDeck(err, res, deck, errMsg) {
  if (!err) {
    res.json(deck);
  } else {
    res.json({
      err: errMsg
    })
  }
}


module.exports = router;