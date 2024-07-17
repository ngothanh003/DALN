const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

router.get('/chat', (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  res.render('chat', { pageTitle: 'Chat' });
});

router.post('/chat/send', (req, res, next) => {
  const { receiverId, content } = req.body;
  const senderId = req.session.user._id;

  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    content: content
  });

  newMessage.save()
    .then(() => {
      res.redirect('/chat');
    })
    .catch(err => next(err));
});

module.exports = router;
