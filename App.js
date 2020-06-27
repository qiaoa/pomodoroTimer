import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const defaultState = {
    min: 0,
    sec: 10,
    onCount: true, //true = currently counting, false = paused counting
    onWork: true, //true = on work timer, false = on break timer
};

class Timer extends Component {
    constructor() {
        super()
        this.state = defaultState
    }

    render() {
        //format mm:ss
        return (
            <View>
                <Text style={styles.text}>
                    {this.state.onWork ? 'work' : 'break'}
                    {' timer\n'}
                    {this.state.min}:{this.state.sec < 10 ? `0${this.state.sec}` : this.state.sec}
                </Text>
                <Button onPress={this.toggleCount} title={this.state.onCount ? 'Pause' : 'Start'}/>
                <Button onPress={this.reset} title='Reset'/>
            </View>
        );
    }

    componentDidMount() {
        // this.timer = this.updateTimer()
        //update the timer every 1 second
        this.timer = setInterval(this.incrementTimer, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    // fixme change onWork to onWork: !prevState.onWork
    incrementTimer = () => {
        this.setState(prevState => ( //fixme clarify logic - figure out how to add if else
            prevState.sec > 0 ? {sec: prevState.sec - 1} : prevState.min > 0 ? {
                sec: 59,
                min: prevState.min - 1,
            } : prevState.onWork ? { //change to break timer
                sec: 5,
                min: 0,
                onWork: false,
            } : { //change to work timer
                sec: 10,
                min: 0,
                onWork: true,
            }
        ))
    }

    toggleCount = () => {
        if (this.state.onCount) { //currently counting, need to pause
            clearInterval(this.timer)
        } else { //currently paused, need to continue counting
            // this.timer = this.updateTimer()
            this.timer = setInterval(this.incrementTimer, 1000)
        }
        this.setState(prevState => ({
            onCount: !prevState.onCount,
        }))
    }

    reset = () => {
        if(!this.state.onCount){//if paused, need to restart timer
            // this.timer = this.updateTimer()
            this.timer = setInterval(this.incrementTimer, 1000)
        }
        this.setState(defaultState);
    }

    // updateTimer = () => {
    //     //update the timer every 1 second
    //     setInterval(this.incrementTimer, 1000)
    // }
}

export default class App extends Component {
    render() {
        return (<View style={styles.container}>
            <Timer/>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        margin: 12,
        fontSize: 22,
        fontWeight: "100",
    },
});
