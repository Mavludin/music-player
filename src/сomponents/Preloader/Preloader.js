import React from 'react';
import classes from './Preloader.module.css';

import preloaderIcon from "../../img/vinyl.gif";

const Preloader = ( {visible, children} ) => {

    return (
        visible ?
            <div className={classes.Preloader}>
                <img src={preloaderIcon} alt="preloader Icon"/>
            </div>
        
        : children
    ) 
}

export default Preloader;