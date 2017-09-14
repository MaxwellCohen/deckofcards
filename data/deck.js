var Card = require('./card');
var fs = require('fs');
var request = require('request');

var filePath = 'deckData/';

class Deck {
  constructor() {
    //creates a generic deck data
    var initData = {
      deck: [],
      id: null
    }
    Object.assign(this, initData);
  }

  makeNewDeck(shuffle, cb) {
    //makes a new deck that can be suffled or not;
    this.makeID((err) => {
      if (!err) {
        if (shuffle) {
          this.shuffle(this.id, cb)
        } else {
          this.makeCards();
          var orderArray = Array.apply(null, {
            length: 52
          }).map(Number.call, Number)
          this.recordOrder(orderArray, err, cb);
        }
      } else {
        cb(err);
      }
    });
  }

  getSuitArray() {
    //provides a list of suites
    return ['C', 'D', 'H', 'S'];
  }

  getValueArray() {
    //provides a list of card values
    return ['2', '3', '4', '5', '5', '6', '7', '8', '9', 'J', 'K', 'Q', 'A'];
  }

  makeCards() {
    this.deck = [];
    this.getSuitArray().forEach((suit) => {
      this.getValueArray().forEach((value) => {
        this.deck.push(new Card(suit, value))
      });
    });
  }

  makeID(cb) {
    var dir = this.getIdPath('');
    fs.readdir(dir, (err, files) => {
      var id = files.length + 1;
      fs.exists(this.getIdPath(id), (exists) => {
        var error = true;
        if (!exists) {
          error = false;
          this.id = id
        }
        cb(error);
      });
    });
  }

  recordOrder(orderArray, err, cb) {
    var filepath = this.getIdPath(this.id);
    if (this.id && !err) {
      console.log(filepath);
      fs.writeFile(filepath, JSON.stringify(orderArray), (err) => {
        cb(err);
      })
    } else {
      //could not make because of no id
      cb(null);
    }
  }

  getIdPath(id) {
    return filePath + id;
  }

  getDeckFromID(id, numberOfCards, cb) {
    var filePath = this.getIdPath(id);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        this.err = 'could not find file';
        return cb(true)
      }
      this.id = id;
      var orderArray = JSON.parse(data);
      if (orderArray.length === 0) {
        this.shuffle(id, (err) => {
          if (!err) {
            this.getDeckFromID(id, numberOfCards, cb)
          } else {
            this.err = 'could not re shuffle deck';
            return cb(true)
          }
        })
      } else {
        this.makeCards();
        this.reOrderDeck(orderArray);
        if (numberOfCards) {
          this.deck = this.deck.slice(0, numberOfCards);
          orderArray.splice(0, numberOfCards);
          this.recordOrder(orderArray, err, cb);
        } else {
          cb(null, this)
        }
      }
    });
  }

  reOrderDeck(orderArray) {
    var newDeck = orderArray.map((index) => {
      return this.deck[index];
    });
    this.deck = newDeck;
  }

  shuffle(id, cb) {
    this.id = id;
    var url = 'http://applicant.pointsource.us/api/random/5989d1c64016a7661a534e38'
    var quaryObject = {
      min: 1,
      max: 52,
      num: 52
    }
    request({
      url: url,
      qs: quaryObject
    }, (err, response, body) => {
      if (err) {
        console.log(err);
        return cb(true);
      }
      var body = JSON.parse(body);
      var orderArray = body.numbers;
      orderArray = orderArray.map((el) => {
        return el - 1;
      })
      this.makeCards();
      this.reOrderDeck(orderArray);
      this.recordOrder(orderArray, err, cb);
      console.log("Get response: " + body.numbers.length);
    });
  }
}

module.exports = Deck;