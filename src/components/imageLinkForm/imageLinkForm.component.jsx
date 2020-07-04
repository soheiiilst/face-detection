import React from 'react';
import './imageLinkForm.styles.scss';

import Input from '../input/input.component';
import Button from '../button/button.component';
import FaceRecognition from '../faceRecognition/faceRecognition.component';

class ImageLinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceLocations = clarifaiFace.map(faceLoc => {
      const { bounding_box } = faceLoc.region_info;
      return {
        leftCol: bounding_box.left_col * width,
        topRow: bounding_box.top_row * height,
        rightCol: width - bounding_box.right_col * width,
        bottomRow: height - bounding_box.bottom_row * height,
      };
    });

    return faceLocations;
  };

  displayFaceBox = boxes => this.setState({ boxes: boxes });

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  onButtonClick = () => {
    if (this.state.input) {
      this.setState({ imageUrl: this.state.input });
      fetch('https://scenic-dry-tortugas-00988.herokuapp.com/imageUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://scenic-dry-tortugas-00988.herokuapp.com/image', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.props.userId,
              }),
            })
              .then(response => response.json())
              .then(rank => {
                if (rank) {
                  this.props.loadUserRank(rank);
                }
              })
              .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(error => console.log(error));
    } else {
      alert('Please enter an image url!');
    }
  };

  render() {
    const { input, imageUrl, boxes } = this.state;
    return (
      <div>
        <p className='f3'>
          {
            'This Magic Brain will detect faces in your pictures. Give it a try.'
          }
        </p>
        <div className='center mb3'>
          <div className='group shadow-2'>
            <Input
              type='text'
              placeholder='Copy and paste image url here...'
              name='input'
              value={input}
              handleChange={this.handleChange}
              required
            />
            <div>
              <Button onClick={this.onButtonClick}>Detect</Button>
            </div>
          </div>
        </div>

        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
      </div>
    );
  }
}

export default ImageLinkForm;
