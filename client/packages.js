import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import axios from 'axios';
import Draggable from 'react-draggable';
import moment from 'moment';
import domtoimage from 'dom-to-image';
import jszip from 'jszip';
import { saveAs } from 'file-saver';
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';

export {
  React, Component,
  connect, Provider,
  combineReducers, createStore, applyMiddleware, compose,
  ReactDOM,
  BrowserRouter, Switch, Link, Route, withRouter,
  thunk,
  axios,
  Draggable,
  moment,
  domtoimage,
  jszip,
  saveAs,
  NumberFormat,
  MediaQuery
}
