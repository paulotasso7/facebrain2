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
import Register from './components/Register/Register';


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
          route: 'signin',
          isSignedIn: false,
          user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: ''
          }
      }
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
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
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {  
        this.setState({imgURL: this.state.input});
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then((response) => { 
        this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => console.log(err));
    }
  
    onRouteChange = (route) => {
        if (route === 'signout') {
        this.setState({isSignedIn: false})
        } else if (route === 'home') {
        this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, route, box, imgURL} = this.state;  
        return (
            <div className="App">
                <Particles 
                className='particles'
                params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange= { this.onRouteChange }/>
                { route === 'home'
                ?   <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImgLinkForm 
                        onInputChange= {this.onInputChange}
                        onButtonSubmit= {this.onButtonSubmit}
                        />
                        <FaceReckon 
                        box= {box}
                        imgURL= {imgURL}
                        />
                    </div>
                : ( 
                route === 'signin'
                ? <Signin onRouteChange= {this.onRouteChange} loadUser={this.loadUser}/>
                : <Register onRouteChange= {this.onRouteChange} loadUser={this.loadUser}/>
                )
                } 
            </div>
        );
    }
};

export default App;
