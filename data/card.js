// class to handle cards
class Card {
    constructor(suitCode, valueCode) {
        this.suiteCode = suitCode;
        this.valueCode = valueCode;
        this.fullNameCode =  valueCode + suitCode;
        this.fullSuiteName = this.getFullSuiteName(suitCode);
        this.fullValueName = this.getFullValueName(valueCode);
        this.image = `https://deckofcardsapi.com/static/img/${suitCode + valueCode}.png`
    }

    getCardObj () {
        return {
        suiteCode : this.suiteCode,
        valueCode : this.valueCode,
        fullNameCode : this.fullNameCode,
        fullSuiteName : this.fullSuiteName,
        fullValueName : this.fullValueName,
        image: this.image

        }
    }
    getFullSuiteName(suit) {
       var fullSuiteName = {C: 'CLUBS', D:'DIAMONDS', H:'HEARTS', S:'SPADES'};
       return fullSuiteName[suit];
    }
    getFullValueName(value) {
       var fullValueName = {
           '2':'2',
           '3':'3',
           '4':'4',
           '5':'5',
           '5':'5',
           '6':'6',
           '7':'7',
           '8':'8',
           '9':'9',
           'J':'JACK',
           'Q':'QUEEN',
           'K':'KING',
           'A':'ACE'
    }
       return fullValueName[value];
    }
}

module.exports = Card;