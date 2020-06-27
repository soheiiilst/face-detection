import React from 'react';
import './imageLinkForm.styles.scss';
import Clarifai from 'clarifai';
import Input from '../input/input.component';
import Button from '../button/button.component';
import FaceRecognition from '../faceRecognition/faceRecognition.component';

const app = new Clarifai.App({
  apiKey: 'c8f5f26c14bd4740acc81e74253461c5',
});

class ImageLinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = box => this.setState({ box: box });

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  onButtonClick = () => {
    if (this.state.input) {
      this.setState({ imageUrl: this.state.input });
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response =>
          this.displayFaceBox(this.calculateFaceLocation(response))
        )
        .catch(error => console.log(error));
    }
  };

  render() {
    const { input, imageUrl, box } = this.state;
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

        <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>
    );
  }
}

export default ImageLinkForm;
