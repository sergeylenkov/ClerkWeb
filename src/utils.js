window.currenciesSign = { "rub": "&#8381;", "usd": "$", "eur": "&#8364;" }
window.monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
window.monthNames2 = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
window.weekDaysNames = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

String.prototype.splice = function(start, delCount, newSubStr) {
	return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.replaceCurrencyNameWithSign = function() {
	if (currenciesSign[this.toLowerCase()]) {
		return currenciesSign[this.toLowerCase()];
	}

	return this;
}

Number.prototype.formatAmount = function(showFraction = true) {
	var str = this.toFixed(2).toString();
	var amount = str.replace('.', ',');
	var values = amount.split(',');
	var sign = '';

	if (values[0].charAt(0) == '-') {
		sign = '-';
		values[0] = values[0].substr(1);
	}

	if (values.length == 1) {
		values[1] = '00';
	}

	var length = values[0].length;

	if (length > 3) {
		values[0] = values[0].splice(values[0].length - 3, 0, ' ');
	}

	if (length > 6) {
		values[0] = values[0].splice(values[0].length - 7, 0, ' ');
	}

	if (showFraction) {
		return sign + values[0] + '<span class="fraction">,' + values[1] + '</span>';
	}

	return values[0];
}
