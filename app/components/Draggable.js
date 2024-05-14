import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated } from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value) => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan.setValue({ x: 0, y: 0 });
      }
    });
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.circle]} />;
  }

  componentDidMount() {
    // This is where you would perform any initialization that requires interaction with the DOM or subscription to external services.
    // If you need to fetch data, make AJAX requests, or perform any asynchronous operation, this is the place to do it.
  }

  componentWillUnmount() {
    // This method is called immediately before the component is removed from the DOM. 
    // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions.
  }
}

const CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});
