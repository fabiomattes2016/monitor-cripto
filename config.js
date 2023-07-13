require("dotenv").config();

module.exports = {
	apiKey: process.env.API_KEY,
	apiSecret: process.env.API_SECRET,
	symbol: "XRPUSDT", // Símbolo de negociação a ser usado
	interval: "1d", // Intervalo de velas a ser utilizado
	shortTermPeriod: 5, // Período da média móvel de curto prazo
	longTermPeriod: 20, // Período da média móvel de longo prazo
};
