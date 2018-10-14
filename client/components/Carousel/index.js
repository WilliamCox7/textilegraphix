import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { throttle } from 'lodash'
import './style.scss';

class Carousel extends Component {

  constructor() {
    super();
    this.state = {
      position: 0,
      sliding: false,
      direction: undefined
    }
    this.getOrder = this.getOrder.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.slide = this.slide.bind(this);
    this.handleSwipe = throttle(this.handleSwipe.bind(this), 500, { trailing: false});
  }

  componentDidMount() {
    this.carouselInterval = setInterval(() => this.next(), 4000);
  }

  componentWillUnmount() {
    if (this.carouselInterval !== undefined) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = undefined;
    }
  }

  getOrder(index) {
    if (index - this.state.position < 0) {
      return this.props.children.length - Math.abs(index - this.state.position);
    }
    return index - this.state.position;
  }

  next() {
    let position = this.state.position === this.props.children.length - 1 ? 0 : this.state.position + 1;
    this.slide('next', position);
  }

  prev() {
    let position = this.state.position === 0 ? this.props.children.length - 1 : this.state.position - 1;
    this.slide('prev', position);
  }

  slide(direction, position) {
    this.setState({sliding: true, direction, position});
    setTimeout(() => this.setState({sliding: false}), 50);
  }

  handleSwipe(swipe) {
    if (swipe === 'left') this.next();
    else if (swipe === 'right') this.prev();
    if (this.carouselInterval !== undefined) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = setInterval(() => this.next(), 4000);
    }
  }

  render() {

    let items = this.props.children.map((child, i) => {
      let index = i === 3 ? 0 : i + 1;
      let order = this.getOrder(index);
      return (
        <div className="slot flex" key={i} style={{order: order}}>
          {child}
        </div>
      );
    });

    let statusId = 'stagnate';
    if (!this.state.sliding) statusId = "not-sliding";
    else if (this.state.direction === 'prev') statusId = "dir-prev";

    return (
      <div className="Carousel">
        <Swipeable onSwipingLeft={() => this.handleSwipe('left')} onSwipingRight={() => this.handleSwipe('right')}>
          <div className="carousel-wrapper">
            <div className="carousel-container flex" id={statusId}>
              {items}
            </div>
          </div>
        </Swipeable>
      </div>
    );
  }
}

export default Carousel;
