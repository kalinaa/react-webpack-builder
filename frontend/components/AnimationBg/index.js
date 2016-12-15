'use strict';

import './style.scss'

export default class AnimationBg extends React.Component {
  constructor(props) {
    super(props);

    this.state = { animationCompleted: true };
  }

  componentDidMount() {
    this.animationTimer = setTimeout(::this.startAnimation, 0);
    this.animationStopInterval = setInterval(::this.stopAnimation, this.props.animationDuration);
    this.animationStartInterval = setInterval(::this.startAnimation, parseInt(this.props.animationDuration) + 10);
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimer);
    clearInterval(this.animationStopInterval);
    clearInterval(this.animationStartInterval);
  }

  startAnimation() {
    this.setState({ animationCompleted: false });
  }

  stopAnimation() {
    this.setState({ animationCompleted: true });
  }

  render() {
    return (
      <div className={`animation-bg ${!this.state.animationCompleted ? 'animation-bg_animate' : ''}`}>
        <div className="animation-bg__item animation-bg_violet"></div>
        <div className="animation-bg__item animation-bg_red"></div>
        <div className="animation-bg__item animation-bg_mint"></div>
        <div className="animation-bg__item animation-bg_sunflower"></div>
        <div className="animation-bg__item animation-bg_purple"></div>
        <div className="animation-bg__item animation-bg_royal-blue"></div>
        <div className="animation-bg__item animation-bg_orange"></div>
        <div className="animation-bg__item animation-bg_aqua"></div>
      </div>
    )
  }
}