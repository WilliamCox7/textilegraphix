import { moment } from '../../../packages';

const endOfYear = [
  'December 23rd', 'December 24th', 'December 25th', 'December 26th',
  'December 27th', 'December 28th', 'December 29th', 'December 30th',
  'December 31st', 'January 1st', 'January 2nd'
];

export default function setDelivery(offset) {
  var today = moment();
  var year = today.get('year');
  if (today.get('month') === 11) {
    year = today.add(1, 'years').get('year');
  }
  var deliveryDay = moment(today).add(offset, 'days');
  var estDelDay = deliveryDay.format('MMMM Do');
  if (JSON.stringify(endOfYear).indexOf(estDelDay) > -1) {
    deliveryDay = moment("01-03-"+year);
  }
  var weekday = deliveryDay.weekday();
  if (weekday === 0) { deliveryDay.add(1, 'days'); }
  else if (weekday === 6) { deliveryDay.add(2, 'days'); }
  var displayedDay = deliveryDay.format('MMMM Do');
  return displayedDay;
}
