# tweetly_backend
Node.js backend for my Twitter clone project [tweetly](https://github.com/MikeAndrson/tweetly). Used:
- [Express](https://www.npmjs.com/package/express)
- [MongoDB](https://www.mongodb.com/)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [multer](https://www.npmjs.com/package/multer)

## Setting up
Create a `.env` file in the project root, populate it with the following:
```env
MONGO_DB_URI = "YOUR MONGODB URI HERE" # Starts with "mongodb+srv://"
JWT_SECRET = "JWT SECRET HERE" # You can generate one by running "openssl rand -hex 16"
LOCAL_PORT = "PORT TO LISTEN" # e.g 8080
```

Then you can run `npm start` to test it out. It should print `connected to db` if the MongoDB connection was successful.

## Deployment
You can deploy this to a cloud platform of your choice (or a VPS/VDS even). FWIW I used [Heroku](https://www.heroku.com/).

## License
This project is licensed under **GNU General Public License v3.0**, see [LICENSE](LICENSE) for more.
