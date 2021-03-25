/* eslint class-methods-use-this: "off" */
import { Component } from 'react';
import throttle from 'lodash.throttle';

export default class Scroller extends Component {
  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      this.__debouncedScrollHandler = throttle(() => this.__scrollHandler__(), 200);
      document.addEventListener('scroll', this.__debouncedScrollHandler);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.__debouncedScrollHandler);
  }

  getDocHeight() {
    const D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight,
    );
  }

  getTrackLength() {
    const trackLength = this.getDocHeight() - this.winheight;
    return trackLength;
  }

  amountscrolled() {
    const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let pctScrolled = 0;
    const trackLength = this.getTrackLength();
    if (trackLength === 0) {
      pctScrolled = 0;
    } else {
      pctScrolled = Math.floor((scrollTop / trackLength) * 100);
    }
    return pctScrolled;
  }

  __scrollHandler__() {
    this.props.onPageScroll(this.amountscrolled());
  }

  render() {
    return null;
  }
}