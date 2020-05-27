const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../../config/app').jwt;
const authHelper = require('../helpers/authHelper');

const Token = mongoose.model('Token');
const User = mongoose.model('User');

const updateTokens = userId => {
  console.log('userId', { userId });
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();

  return authHelper.replaceDbRefreshToken(refreshToken.id, userId).then(() => {
    return {
      accessToken,
      refreshToken: refreshToken.token,
      expiresInAccessToken: tokens.access.expiresIn,
      expiresInRefreshToken: tokens.refresh.expiresIn,
    };
  });
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  res.set('Access-Control-Allow-Origin', '*');
  User.findOne({ email })
    .exec()
    .then(user => {
      if (!user) {
        res.status(401).json({ massage: 'user does not exists' });
      }
      const isValid = bCrypt.compareSync(password, user.password);

      if (isValid) {
        updateTokens(user._id).then(tokens => {
          res.json(tokens);
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then(user => {
      if (user) {
        res.status(401).json({ massage: 'user exists' });
      } else {
        const saltRounds = 10;
        const salt = bCrypt.genSaltSync(saltRounds);
        const hash = bCrypt.hashSync(password, salt);

        User.create({ name, email, password: hash })
          .then(createdUser => {
            res.json(createdUser);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'invalid token!' });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token!' });
      return;
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then(token => {
      if (token === null) {
        throw new Error('Invalid token!');
      }

      return updateTokens(token.userId);
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({ message: err.message }));
};

module.exports = {
  signIn,
  refreshTokens,
  register,
};
