import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Navigation from './components/Navigation/Navigation'; 
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import FaceReckon from './components/FaceReckon/FaceReckon'; 
import Signin from './components/Signin/Signin';


const app = new Clarifai.App({
  apiKey: 'cfb13279adc54804bb03596f7d36c432'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 80
    },
    line_linked: {
      distance: 175
    }    
  },
  interactivity: {
    "detect_on":"window",
    "events":{
      "onhover":{
        "enable":true,
        "mode":"repulse"
      },
      "onclick":{
        "enable":true,
        "mode":"push"
      }
    }
  }      
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgURL:'',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }   
  } 

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imgURL: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (   
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions}
        />
        <Navigation 
          onRouteChange= { this.onRouteChange }
        />
        { this.state.route === 'signin'
        ? <Signin onRouteChange= {this.onRouteChange} />
        : <div>
            <Logo />
            <Rank/>
            <ImgLinkForm 
              onInputChange= {this.onInputChange}
              onButtonSubmit= {this.onButtonSubmit}
            />
            <FaceReckon 
              box= {this.state.box}
              imgURL= {this.state.imgURL}
            />
          </div> } 
      </div>
    );
  }
};

export default App;
