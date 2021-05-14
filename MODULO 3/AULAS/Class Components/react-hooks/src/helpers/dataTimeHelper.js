function leftPad(value, count = 2, char = '0') {
  value = value.toString();
  let newValue = value;

  if (value.length < count) {
    for (let i = 0; i < count - value.length; i++) {
      newValue = char + value;
    }
  }

  return newValue;
}

function getNewTimestamp() {
  const now = new Date();

  return `
    ${now.getFullYear()}/${leftPad(now.getMonth() + 1)}/${leftPad(now.getDate())}
    ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}
  `;
}

export {
  leftPad,
  getNewTimestamp
}
