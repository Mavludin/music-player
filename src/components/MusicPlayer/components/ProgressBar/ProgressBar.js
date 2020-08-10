import React from 'react';
import classes from './ProgressBar.module.css';

export const ProgressBar = ( {timerMinutes, timerSeconds, songDuration, progressWidth} ) => {

    const onProgressClick = (e) => {
        let percent = e.nativeEvent.offsetX/e.target.offsetWidth;
        const audio = document.querySelector('audio');
        audio.currentTime = percent*audio.duration;
        const progress = document.querySelector('progress');
        progress.value = percent;
    }

    return (
        <div className={classes.ProgressBar}>
            <p>{timerMinutes}:{timerSeconds}</p>
            <div className={classes.ProgressContainer}>
                <progress onClick={(e)=>onProgressClick(e)} value={progressWidth.toString()} max="1"></progress>
            </div>
            <p>{songDuration}</p>
        </div>
    )

}