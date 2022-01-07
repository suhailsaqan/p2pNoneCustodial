module.exports = {
  port: 9000,
  db: {
    prod: "mongodb:blank",
    test: "mongodb://localhost/reddit_test",
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
    },
  },
};
