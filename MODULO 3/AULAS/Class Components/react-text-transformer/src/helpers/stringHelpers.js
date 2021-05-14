const WITH_SPECIAL_CHARACTERS =
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

const WITHOUT_SPECIAL_CHARACTERS =
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

const VOWELS = 'aáãâäàeéêëèiíîïìoóõôöòuúûüù'.split('');

function isVowel(char) {
  return VOWELS.includes(char.toLowerCase());
}

function isNumber(char) {
  return !isNaN(char);
}

function isConsonant(char) {
  return !isVowel(char) && !isNumber(char);
}

function removeSpecialCharacters(text) {
  return text.split('').map(char => {
    const index = WITH_SPECIAL_CHARACTERS.indexOf(char);
    return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index];
  }).join('');
}

export {
  isVowel,
  isConsonant,
  removeSpecialCharacters
}
