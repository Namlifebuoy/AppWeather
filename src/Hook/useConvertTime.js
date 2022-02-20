import React from 'react';
import {View, Text} from 'react-native';

const useConvertTime = props => {
  const now = new Date().getTime();
  const timeOrigin = now - props?.timeCreate;
  //(timeOrigin - timeOrigin%(1000 * 60))/(1000 * 60)
  //   const time = (props?.now - props?.timeCreate) / (1000 * 60);
  let time = (timeOrigin - (timeOrigin % (1000 * 60))) / (1000 * 60);
  if (time <= 1) {
    return 'Ngay bây giờ';
  } else if (time < 60) {
    return `${time} phút trước`;
  } else if (time < 60 * 24) {
    time = (timeOrigin - (timeOrigin % (1000 * 60 * 60))) / (1000 * 60 * 60);
    // const time2 = time.split('.');
    return `${time} tiếng trước`;
  } else {
    const time3 =
      (timeOrigin - (timeOrigin % (1000 * 60 * 60 * 24))) /
      (1000 * 60 * 60 * 24);
    return `${time3} ngày trước`;
  }
};

export default useConvertTime;
