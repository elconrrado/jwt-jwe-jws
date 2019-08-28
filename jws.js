const he = require("he");
const jose = require("node-jose");

class AuthService {
  constructor() {
    this.publicKey = {};
    this.privateKey = {};
  }

  async generateKeys() {
    const keyStore = jose.JWK.createKeyStore()
    const kid = Math.floor(new Date().getTime() / 1000).toString();
    const props = {
      kid,
      alg: "RS256",
      key_ops: ["sign", "verify"],
      use: "sig"
    };
    const key = await keyStore.generate("RSA", 2048, props);
    this.publicKey = key.toJSON();
    this.privateKey = key;
  }

  async sign(payload) {
    const token = await jose.JWS.createSign({
      compact: true,
      protect: '*'
    }, this.privateKey).final(JSON.stringify(payload), 'utf8');
    return token;
  }

  async verify(token) {
    const key = await jose.JWK.asKey(this.publicKey, 'public');
    const result = await jose.JWS.createVerify(key).verify(token)
    return JSON.parse(result.payload);
  }
}

const authService = new AuthService();

authService.generateKeys().then(signature => {
  return authService.sign({ name: "Marlon Conrado", sub: "123213sd12" });
}).then(token => {
  console.log(`Token: ${token}`);
  console.log('');
  return authService.verify(token);
}).then(payload => {
  console.log(payload);
});
