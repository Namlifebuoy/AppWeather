import React, {useState, useEffect} from 'react';
import ImageView from 'react-native-image-viewing';

const ImageViewScreen = props => {
  const [state, setState] = useState([]);
  useEffect(() => {
    let data = state;
    props?.img?.map(item => {
      data.push({uri: item});
      setState(data.concat());
    });
  }, [props]);
  return (
    <ImageView
      images={state}
      imageIndex={0}
      visible={props?.showImage}
      doubleTapToZoomEnabled={true}
      animationType={'slide'}
      onRequestClose={() => {
        setState([]);
        props?.setShowImage(false);
        props?.setImg();
      }}
    />
  );
};

export default ImageViewScreen;
