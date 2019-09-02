var jwt = require('jsonwebtoken');
var fs = require('fs');

class AuthService {

  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  signToken(payload) {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(payload, this.privateKey, { algorithm: 'RS256' });
      return resolve(token);
    });
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.publicKey, (error, payload) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(payload);
        }
      })
    });
  }
}

const publicKey = fs.readFileSync('pub.key.pem');
const privateKey = fs.readFileSync('priv.key.pem');
const auth = new AuthService(publicKey, privateKey);

auth.signToken({ name: 'Marlon Conrado' }).then((token) => {
  console.log(`Token: ${token}`);
  console.log('');
  return auth.verifyToken(token);
}).then((payload) => {
  console.log(`Payload: ${JSON.stringify(payload)}`);
});