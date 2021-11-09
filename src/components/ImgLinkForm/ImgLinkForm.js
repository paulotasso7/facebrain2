import React from "react";
import './ImgLinkForm.css';


const ImgLinkForm = ({onInputChange, onButtonSubmit }) => {
    return(
        <div >
            <p className='f3'>
                {'This Magic Brain detect faces in pictures'}
            </p>
            <div className='center'> 
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center br4' type='text' onChange= {onInputChange}/>
                    <button 
                    className='w-30 grow  f4 link ph3 br4 pv2 dib white bg-dark-pink'
                    onClick = {onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );

}

export default ImgLinkForm;