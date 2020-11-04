const getDate = () => {
  var d = new Date();

  day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  month = d.getMonth()+1 < 9 ? "0" + d.getMonth()+1 : d.getMonth()+1;
  year = d.getFullYear();

  hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

  var date = [day, month, year].join('-');
  var time = [hour, minute, second].join(':');

  return `${date} ${time}`;
}

const Log = {
  writeRegister(uid) {
    console.log(`[INFO][${getDate()}] New user registration: ${uid}`);
  },

  writeLogin(uid) {
    console.log(`[INFO][${getDate()}] New user connection: ${uid}`);
  }
}

module.exports = Log;