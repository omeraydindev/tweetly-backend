# tweetly_backend
Node.js backend for Tweetly.

## Setting up
Create a `.env` file in the project root, populate it with the following:
```env
MONGO_DB_URI = "YOUR MONGODB URI HERE" # Starts with "mongodb+srv://"
JWT_SECRET = "JWT SECRET HERE" # You can generate one by running "openssl rand -hex 16"
LOCAL_PORT = "PORT TO LISTEN" # e.g 8080
```

Then run `npm start`. That's pretty much it.
