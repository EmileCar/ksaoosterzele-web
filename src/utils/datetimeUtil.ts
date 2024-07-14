/**
* Deze functie zet de DateTime vanuit de database om naar een leesbare string.
* @param {string} dateTimeString - De DateTime string afkomstig van de database.
* @returns {string} De geformatteerde leesbare DateTime string.
**/
export const formatDateTime = (datetime: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Brussels',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date(datetime);
  return new Intl.DateTimeFormat('nl-NL', options).format(date);
}

/**
 * Deze functie zet de DateTime vanuit een input om naar database DateTime value.
 * @param {Date} date - De DateTime string afkomstig van een input.
 * @returns {string} De geformatteerde DateTime string voor de database.
**/
export const formatCustomDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
}

export const formatCustomDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Deze functie controleert of een DateTime vanuit de database in het verleden ligt.
 * @param {string} dateTimeString - De DateTime string afkomstig van de database.
 * @returns {boolean} Of de DateTime in het verleden ligt.
 **/
export const isDatabaseDateTimeInPast = (dateTimeString: string): boolean => {
  const date = new Date(dateTimeString);
  return date < new Date();
}

/**
 * Deze functie controleert of een Date of die in het verleden ligt.
 * @param {Date} date - De DateTime string afkomstig van de database.
 * @returns {boolean} Of de DateTime in het verleden ligt.
 **/
export const isDateTimeInPast = (date: Date): boolean => {
  return date < new Date();
}

/**
 * Deze functie zet een input date om naar een database date. !GEEN DATETIME!
 * @param {string} date - De input date string.
 * @returns {string} De geformatteerde database date string.
 **/
export const convertInputDateToDatabaseDate = (date: Date): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deze functie zet een Date om naar een leesbare date.
 * Bv. "Dinsdag 1 januari"
 * @param {Date} date - De database date string.
 * @returns {string} De geformatteerde input date string.
 * */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('nl-NL', options).format(new Date(date));
};

/**
 * Deze functie zet een Date om naar een leesbare tijd.
 * Bv. "19u00"
 * @param {Date} date - De database date string.
 * @returns {string} De geformatteerde input time string.
 * */
export const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('nl-NL', options).format(new Date(date));
};

export const formatDateToInputDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDateToInputDate = (date: Date): string => {
  console.log(date)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};