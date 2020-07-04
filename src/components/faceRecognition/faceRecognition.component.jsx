import React from 'react';
import './faceRecognition.styles.scss';

let faceId = 0;

const FaceRecognition = ({ imageUrl, boxes }) => (
  <div className='center ma'>
    <div className='absolute mt2'>
      <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto' />
      {boxes.map(box => {
        return (
          <div
            key={++faceId}
            className='bounding-box'
            style={{
              top: box.topRow,
              left: box.leftCol,
              bottom: box.bottomRow,
              right: box.rightCol,
            }}
          ></div>
        );
      })}
    </div>
  </div>
);

export default FaceRecognition;
