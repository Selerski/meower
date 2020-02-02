const form = document.querySelector('form');
const tweetElement = document.querySelector('.tweets');
const loadingElement = document.querySelector('.loading');
loadingElement.style.display = 'none';
const API_URL = 'http://localhost:3000/tweets';

listAllTweets();

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const tweet = {
    name,
    content
  };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(tweet),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      form.reset();
      form.style.display = '';
      listAllTweets();
      loadingElement.style.display = 'none';
    });
});

function listAllTweets() {
  tweetElement.innerHTML = '';
  fetch(API_URL)
    .then(response => response.json())
    .then(tweets => {
      tweets.reverse()
      tweets.forEach(tweet => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = tweet.name;

        const contents = document.createElement('p');
        contents.textContent = tweet.content;

        const date = document.createElement('small')
        date.textContent = tweet.created;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        tweetElement.appendChild(div);
      });
    });
}
