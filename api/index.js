const router = require('./bootstrap');

router.get('/user', (req, res) => {
  console.log('User to get', req.body.data);
  res.status(200).json({ message: 'fake got user' });
});

router.post('/user', (req, res) => {
  console.log('User to store', req.body);
  res.status(200).json({ message: `user fake stored`, data: req.body });
});

module.exports = {
  path: '/api',
  handler: router
}
