const {DateTime} = require('luxon');

function getDateTimeInMillis() {
  return DateTime.local().toMillis();
}

export default getDateTimeInMillis;
