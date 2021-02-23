const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    res.send({quote: getRandomElement(quotes)});
});

app.get('/api/quotes', (req, res, next) => {
    const result = quotes.filter(author => {
        return author.person === req.query.person;
    });
    if(req.query.person){
        res.send({quotes: result});
    }
    else{
        res.send({quotes: quotes});
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;

    if(newQuote !== '' && newPerson !== ''){
        quotes.push({quote: newQuote, person: newPerson});
        res.send({quote: newQuote, person: newPerson});
    }
    else{
        res.status(400).send();
    }
})