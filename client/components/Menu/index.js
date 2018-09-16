import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SocialMedia from '../../components/SocialMedia';
import { getAsset } from '../../modules';
import './style.scss';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="close flex jc-fe ai-c">
          <h1>MENU</h1>
          <img onClick={this.props.toggleMenu} src={getAsset('close-x-black')} />
        </div>
        <div className="links flex jc-sa fd-c ai-c">
          <Link onClick={this.props.toggleMenu} to="/">HOME</Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="products">PRODUCTS</Link>
          <hr />
          {/*
          <Link onClick={this.props.toggleMenu} to="blog">BLOG</Link>
          <hr />
          */}
          <Link onClick={this.props.toggleMenu} to="about">ABOUT</Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="support">SUPPORT</Link>
          <hr />
          <SocialMedia color="white" />
        </div>
      </div>
    );
  }
}

export default Menu;
