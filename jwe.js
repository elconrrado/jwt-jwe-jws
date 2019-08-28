const he = require("he");
const jose = require("node-jose");

class AuthService {

  constructor() {
    this.publicKey = {};
    this.privateKey = {};
  }

  async generateKeys() {
    const keyStore = jose.JWK.createKeyStore();
    const kid = Math.floor(new Date().getTime() / 1000).toString();
    const props = {
      kid,
      use: "enc",
      alg: "RSA-OAEP-256",
      key_ops: ['encrypt', 'wrapKey', 'decrypt', 'unwrapKey', 'verify']
    };
    const key = await keyStore.generate("RSA", 2048, props);
    this.publicKey = key.toJSON();
    this.privateKey = key;
  }

  async encrypt(payload) {
    const strPayload = JSON.stringify(payload);
    const token = await jose.JWE.createEncrypt(
      { format: "compact", contentAlg: "A256CBC-HS512" },
      {
        key: this.publicKey,
        header: {
          kid: this.publicKey.kid
        }
      }
    )
      .update(JSON.stringify(strPayload), "binary")
      .final();
    return token;
  }

  async decrypt(encPayload) {
    const decodedToken = await jose.JWE.createDecrypt(this.privateKey).decrypt(
      encPayload
    );
    return JSON.parse(decodedToken.payload.toString('utf8'));
  }
}

const authService = new AuthService();
authService.generateKeys().then(() => {
  return authService.encrypt({ name: 'Marlon', lastName: 'Conrado' });
}).then(token => {
  console.log(`Token: ${token}`);
  console.log('');
  return authService.decrypt(token);
}).then(payload => {
  console.log(`Payload: ${payload}`);
})
