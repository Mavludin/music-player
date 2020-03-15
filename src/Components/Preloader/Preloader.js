import React from 'react';

import preloaderIcon from "../../img/vinyl.gif";

const Preloader = ( {visible, children} ) => {

    return (
        visible ?
            <div className='Preloader'>
                <img src={preloaderIcon} alt="preloader Icon"/>
            </div>
        
        : children
    ) 
}

export default Preloader;