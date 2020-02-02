const express = require('express');
const app = express();
const cors = require('cors');
const monk = require('monk');

const db = monk('localhost/twitter');
const tweets = db.get('tweets');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Tweet!'
  });
});

app.get('/tweets', (req,res) => {
    tweets.find()
    .then(tweets=> {
        console.log(tweets)
        res.json(tweets);
    })
});

function isValid(tweet) {
  return (
    tweet.name &&
    tweet.name.toString().trim() !== '' &&
    tweet.content &&
    tweet.content.toString().trim() !== ''
  );
}
app.post('/tweets', (req, res) => {
  if (isValid(req.body)) {
    const tweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString(), 
      created: new Date()
    };
    tweets.insert(tweet).then(createdTweet => {
      res.json(createdTweet);
    });
  } else {
    res.status(422);
    res.json({
      message: 'Hey, name and content are required'
    });
  }
});

app.listen(3000, () => {
  console.log('Connection established on port 3000');
});
