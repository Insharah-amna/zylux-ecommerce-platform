const { DateTime } = require("luxon");

function getDateTimeInMillis() {
	return DateTime.local().toMillis();
}

module.exports = { getDateTimeInMillis };
