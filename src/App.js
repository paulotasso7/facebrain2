import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Navigation from './components/Navigation/Navigation'; 
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import FaceReckon from './components/FaceReckon/FaceReckon'; 


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
  constructor () {
    super();
    this.state = {
      input: '',
      imgURL:''
    }
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
   this.setState({imgURL: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(
      function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },

      function(err) {
        // console.log(err);
      }
    );
  }
  
  render() {
    return (   
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank/>
        <ImgLinkForm 
        onInputChange= {this.onInputChange}
        onButtonSubmit= {this.onButtonSubmit}
        />
        <FaceReckon 
        imgURL= {this.state.imgURL}
        />
      </div>
    );
  }
};

export default App;
