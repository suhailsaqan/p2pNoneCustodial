const axios = require("axios");
const currencies = require("./fiat.json");
const { Order } = require("../models/order");

const isIso4217 = (code) => {
  if (code.length < 3 || code.length > 5) {
    return false;
  }
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  code = code.toLowerCase().split("");
  code.forEach((letter) => {
    if (alphabet.indexOf(letter) === -1) {
      return false;
    }
  });

  return true;
};

const getCurrency = (code) => {
  if (!isIso4217(code)) return false;
  const currency = currencies[code];
  if (!currency) return false;

  return currency;
};

const getBtcFiatPrice = async (fiatCode, fiatAmount) => {
  try {
    const currency = getCurrency(fiatCode);
    if (!currency.price) return;

    const code = currency.code.substring(0, 3);
    const response = await axios.get(`${process.env.FIAT_RATE_EP}/${code}`);
    if (!!response.data.error) {
      return 0;
    }
    const sats = (fiatAmount / response.data.btc) * 100000000;

    return parseInt(sats);
  } catch (error) {
    console.log(error);
  }
};

const getCurrenciesWithPrice = () => {
  const currenciesArr = objectToArray(currencies);
  const withPrice = currenciesArr.filter((currency) => currency.price);

  return withPrice;
};

module.exports = {
  isIso4217,
  getCurrency,
  getBtcFiatPrice,
  getCurrenciesWithPrice,
};
