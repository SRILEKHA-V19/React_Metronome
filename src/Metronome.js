import React, { Component } from 'react';
import logo from './logo.svg';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


class Metronome extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            playing: false,
            count: 0,
            bpm: 300,
            beatsPerMeasure: 4
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    startStop = () => {
        //this.click2.play();
        if (this.state.playing) {
            // Stop the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            })
        }
        else {
            // Start a timer with the current BPM
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState (
                {
                    count: 0,
                    playing: true 
                },
                this.playClick // to play a click immediately (after setState finishes)
            );
        }
    };

    // This arrow function needs to dynamically change the tempo as and when the user slides/changes the BPM
    handleBpmChange = event => {
        const bpm = event.target.value;
        //this.setState({ bpm });

        if(this.state.playing) {
            // Stop the old timer and start a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // Set the new BPM and reset the beat count value
            this.setState ({
                count: 0,
                bpm // != 0 since it has to be updated to the user-set value
            });
        }
        else {
            // Otherwise update the BPM alone, what was previously done
            this.setState({ bpm });
        }
    };
    
    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        //The first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        }
        else {
            this.click1.play();
        }

        // to keep track of which beat we are on
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    render() {
        const { playing, bpm } = this.state;
        //let bpm = 100; // bpm = beats per minute
        //let playing = false;

        return (
            <div>
                <h2 className = "header"> 
                    Metronome 
                </h2>
                <div className = "metronome">
                    <div className = "bpm-slider">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div> {bpm} BPM </div>
                        <input 
                            type = "range" 
                            min = "50" 
                            max = "300" 
                            value = {bpm} 
                            onChange = {this.handleBpmChange} />
                    </div>
                    <button onClick = {this.startStop}> 
                        {playing ? 'Stop' : 'Start'} 
                    </button>
                </div> 
            </div> 
        );
    }
}

export default Metronome;