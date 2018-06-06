const router = require('./bootstrap');
const mongoose = require('mongoose');
require('dotenv').config();


const MONGO_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds151530.mlab.com:51530/spottery`;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

const userSchmea = mongoose.Schema({
  email: String,
  userId: String,
  token: String,
  refreshToken: String
});

const User = mongoose.model('User', userSchmea);

router.get('/user', (req, res) => {
  console.log('User to get', req.body.data);
  res.status(200).json({ message: 'fake got user' });
});

router.post('/me', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (!err) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: err.message });
    }
  });
});

router.post('/user', (req, res) => {
  console.log('User to store', req.body);
  const user = new User({
    email: req.body.email,
    token: req.body.idToken,
    refreshToken: req.body.refreshToken,
    userId: req.body.localId
  });
  user.save().then(dbResponse => {
    res.status(200).json({ message: `user saved successfully`, data: dbResponse });
  }).catch(err => {
    res.status(400).json({ message: err.message });
  });
});

module.exports = {
  path: '/api',
  handler: router
}
