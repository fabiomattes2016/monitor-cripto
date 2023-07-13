const fs = require("fs");

// Função para salvar o resultado em um arquivo de log
function saveLog(timestamp, type, price) {
	const log = `${timestamp.toISOString()},${type},${price}\n`;
	fs.appendFile("bot.log", log, (err) => {
		if (err) throw err;
		console.log("Resultado salvo no log: ", log);
	});
}

// utils.js
// Função para calcular a EMA (Exponential Moving Average)
function calculateEMA(prices, period) {
	const emaArray = [];
	const multiplier = 2 / (period + 1);
	for (let i = 0; i < prices.length; i++) {
		if (i === 0) {
			emaArray[i] = prices[i];
		} else {
			emaArray[i] =
				(prices[i] - emaArray[i - 1]) * multiplier + emaArray[i - 1];
		}
	}
	return emaArray[prices.length - 1];
}

function calculateMovingAverage(candles, period) {
	const closePrices = candles.map((candle) => parseFloat(candle.close));
	const slicedPrices = closePrices.slice(-period);
	const sum = slicedPrices.reduce((a, b) => a + b, 0);
	return sum / period;
}

function calculateSupportLevel(candles) {
	const lows = candles.map((candle) => parseFloat(candle.low));
	return Math.min(...lows);
}

function calculateResistanceLevel(candles) {
	const highs = candles.map((candle) => parseFloat(candle.high));
	return Math.max(...highs);
}

// Função para calcular o RSI (Índice de Força Relativa)
function calculateRSI(candles) {
	const closePrices = candles.map((candle) => parseFloat(candle.close));
	const changes = closePrices
		.slice(1)
		.map((price, i) => price - closePrices[i]);
	const gain = changes.filter((change) => change > 0);
	const loss = changes.filter((change) => change < 0);
	const averageGain = gain.reduce((sum, value) => sum + value, 0) / gain.length;
	const averageLoss = Math.abs(
		loss.reduce((sum, value) => sum + value, 0) / loss.length
	);
	const rs = averageGain / averageLoss;
	const rsi = 100 - 100 / (1 + rs);
	return rsi;
}

// Função para calcular o MACD (Moving Average Convergence Divergence)
function calculateMACD(candles) {
	const closePrices = candles.map((candle) => parseFloat(candle.close));
	const ema12 = calculateEMA(closePrices, 12); // EMA de 12 períodos
	const ema26 = calculateEMA(closePrices, 26); // EMA de 26 períodos
	const macd = ema12 - ema26;
	return macd;
}

module.exports = {
	calculateMovingAverage,
	calculateSupportLevel,
	calculateResistanceLevel,
	calculateRSI,
	calculateMACD,
	saveLog,
};
