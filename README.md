# DevProjects - Joke telling bot web app

This is an open source project from [DevProjects](http://www.codementor.io/projects). Feedback and questions are welcome!
Find the project requirements here: [Joke telling bot web app](https://www.codementor.io/projects/web/joke-telling-bot-web-app-cjd2eyrfak)

## Tech/framework used
For the frontend, use ReactJs with Vite, and for the backend, NodeJs Express
API DeepL is used for translation (at the moment it is only available for Spanish, considering that the source language is English), with some adjustments to the source and destination language in the API it can be extended to other languages, it is a matter of reviewing the API parameters (https://developers.deepl.com/docs)

## Screenshots and demo
Screenshots of your app and/or a link to your live demo

## Installation
- Once you import the repository, you need to start the backend service that is intact with the DeepL API call:
```node src/backend/server.js```

- Then we start the web app:
```npm run dev```

## License
[MIT](https://choosealicense.com/licenses/mit/)
Most open source projects use the MIT license. Feel free to choose whichever license you prefer.
