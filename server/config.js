module.exports = {
  port: 9000,
  db: {
    prod: "mongodb://blank",
    test: "mongodb://localhost/test",
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiry: "7d",
  },
  sendgrid: {
    // apiKey: process.env.API_KEY,
    // verifiedEmail: process.env.EMAIL,
    // address: process.env.ADDRESS
    apiKey: "key",
    verifiedEmail: "email@email.com",
    address: "http://localhost:3000/",
  },
};
