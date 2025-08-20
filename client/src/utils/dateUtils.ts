const {DateTime} = require('luxon');

function getDateTimeInMillis() {
  return DateTime.local().toMillis();
}

export default getDateTimeInMillis;

export const formatDate = ({date}: {date: string}) => {
  return DateTime.fromISO(date).toFormat('MMM dd, yyyy, hh:mm');
};
