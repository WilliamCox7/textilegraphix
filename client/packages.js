import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import axios from 'axios';
import Draggable from 'react-draggable';
import moment from 'moment';
import jszip from 'jszip';
import { saveAs } from 'file-saver';
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';
import Vimeo from 'react-vimeo';
import html2canvas from 'html2canvas';
import SwipeableViews from 'react-swipeable-views';

export {
  React, Component,
  connect, Provider,
  combineReducers, createStore, applyMiddleware, compose,
  ReactDOM, ReactDOMServer,
  BrowserRouter, Switch, Link, Route, withRouter,
  thunk,
  axios,
  Draggable,
  moment,
  jszip,
  saveAs,
  NumberFormat,
  MediaQuery,
  Vimeo,
  html2canvas,
  SwipeableViews
}
