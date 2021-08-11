const User = require('../models/user');
const jwt = require('jsonwebtoken');

const mailgun = require('mailgun-js');
// const DOMAIN = `${process.env.MAILGUN_DOMAIN}`;
const DOMAIN = 'sandbox1a6eb1eb6a8344e19b17ac8c74a3ca82.mailgun.org';
const mg = mailgun({
  // apiKey: process.env.MAILGUN_APIKEY,
  apiKey: '1545752cad12e9ad1489e68f799e65c3-9ad3eb61-390e38ba',
  domain: DOMAIN,
});

const signup = (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists!' });
    }

    const token = jwt.sign({ name, email, password }, process.env.JWT_TOKEN, {
      expiresIn: '20m',
    });

    const data = {
      from: 'noreplay@hello.com',
      to: email,
      subject: 'Account Activation Link by rsshonjoydas',
      html: `
        <h2>Please click on given link to activate your account</h2>
        <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
      `,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({
          error: err.message,
        });
      }
      return res.json({
        message: 'Email has been sent, kindly activate your account',
      });
    });
  });
};

const activateAccount = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: 'Incorrect or Expire link.' });
      }
      const { name, email, password } = decodedToken;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          return res
            .status(400)
            .json({ error: 'User with this email already exists!' });
        }
        let newUser = new User({ name, email, password });
        newUser.save((err, success) => {
          if (err) {
            console.log('Error to signup: ', err);
            return res.status(400).json({ error: 'Error activating account' });
          }
          res.json({
            message: 'Signup successful!',
          });
        });
      });
    });
  } else {
    return res.json({ error: 'Authentication failed!' });
  }
};

module.exports = { signup, activateAccount };
