import 'axios';
import axios from 'axios';

export const getAllFiles = () => {
  // 10.0.2.2 ip address for android emulator only
  // consider using ngrok for ios emulator.
  // have to change to own server next time
  return axios
    .post('https://itiapinodejs.herokuapp.com/files/getFiles')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
