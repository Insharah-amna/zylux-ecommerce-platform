const {DateTime} = require('luxon');

function getDateTimeInMillis() {
  return DateTime.local().toMillis();
}

export default getDateTimeInMillis;

export const formatDate = ({date}: {date: string}) => {
  return DateTime.fromISO(date).toFormat('MMM dd, yyyy, hh:mm a');
};

export const getDate = () => {
  return DateTime.local().toFormat('EEE, dd MMMM yyyy');
};

export const getTime = (date: string) => {
  return DateTime.fromISO(date).toFormat('hh:mm a');
};
