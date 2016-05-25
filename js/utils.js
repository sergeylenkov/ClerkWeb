var monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
var monthNames2 = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var weekDaysNames = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
var lastDate = Date.today();
var currenciesSign = { "rub": "&#8381;", "usd": "$", "eur": "&#8364;" }

Number.prototype.formatAmount = function(showFraction = true) {
	var str = this.toFixed(2).toString();
	var amount = str.replace(".", ",");
	var values = amount.split(",");

	if (values.length == 1) {
		values[1] = "00";
	}

	if (values[0].length > 3) {
		values[0] = values[0].splice(values[0].length - 3, 0, " ");
	}

	if (showFraction) {
		return values[0] + "<span class='fraction'>," + values[1] + "</span>";
	}

	return values[0];
}

String.prototype.splice = function(start, delCount, newSubStr) {
	return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function replaceCurrencyNameWithSign(name) {
	if (currenciesSign[name.toLowerCase()]) {
		return currenciesSign[name.toLowerCase()];
	}

	return name;
}
