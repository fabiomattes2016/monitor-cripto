const CronJob = require("cron").CronJob;
const Binance = require("binance-api-node").default;
const {
	apiKey,
	apiSecret,
	symbol,
	interval,
	shortTermPeriod,
	longTermPeriod,
} = require("./config");
const {
	calculateMovingAverage,
	calculateSupportLevel,
	calculateResistanceLevel,
	calculateRSI,
	calculateMACD,
	saveLog,
} = require("./utils");

const client = Binance({ apiKey, apiSecret });

async function runTradingBot() {
	console.clear();

	const ticker = await client.prices({ symbol });
	const currentPrice = parseFloat(ticker[symbol]);
	console.log("Preço atual:", currentPrice);

	const candles = await client.candles({
		symbol,
		interval,
		limit: longTermPeriod,
	});

	const shortTermMA = calculateMovingAverage(candles, shortTermPeriod);
	const longTermMA = calculateMovingAverage(candles, longTermPeriod);
	console.log("Média móvel de curto prazo:", shortTermMA);
	console.log("Média móvel de longo prazo:", longTermMA);

	const supportLevel = calculateSupportLevel(candles);
	const resistanceLevel = calculateResistanceLevel(candles);
	console.log("Nível de Suporte:", supportLevel);
	console.log("Nível de Resistência:", resistanceLevel);

	const rsi = calculateRSI(candles);
	console.log("RSI:", rsi);

	const macd = calculateMACD(candles);
	console.log("MACD:", macd);

	// Lógica de compra e venda baseada nas condições

	if (
		shortTermMA > longTermMA &&
		currentPrice <= supportLevel &&
		rsi < 30 &&
		macd > 0
	) {
		console.log(
			"Tendência de alta, preço próximo ou abaixo do suporte, RSI abaixo de 30, MACD positivo. Realizando compra..."
		);
		saveLog(new Date(), "Compra", currentPrice.toFixed(2));
		// Coloque aqui a lógica para realizar uma ordem de compra
	} else if (
		shortTermMA < longTermMA &&
		currentPrice >= resistanceLevel &&
		rsi > 70 &&
		macd < 0
	) {
		console.log(
			"Tendência de baixa, preço próximo ou acima da resistência, RSI acima de 70, MACD negativo. Realizando venda..."
		);
		// Coloque aqui a lógica para realizar uma ordem de venda
		saveLog(new Date(), "Venda", currentPrice.toFixed(2));
	} else {
		console.log("Aguardando condições adequadas para negociação...");
	}
}

runTradingBot().catch((err) => {
	console.error(err);
});

// Configurar o cronômetro para executar a função a cada 1 minuto
const job = new CronJob("*/1 * * * *", runTradingBot, null, true, "UTC");
job.start();
