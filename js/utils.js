var monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
var monthNames2 = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var weekDaysNames = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
var lastDate = Date.today();

Number.prototype.formatAmount = function() {
	var str = this.toFixed(2).toString();
	var amount = str.replace(".", ",");
	var values = amount.split(",");

	if (values.length == 1) {
		values[1] = "00";
	}

	return values[0] + "<span class='fraction'>," + values[1] + "</span>";
}
