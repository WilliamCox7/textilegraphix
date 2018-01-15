import { Component } from '../../packages';
import { template, construct } from './modules';
import './Home.scss';

class Home extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }
}

export default Home;
