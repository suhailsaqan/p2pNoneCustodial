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
};
