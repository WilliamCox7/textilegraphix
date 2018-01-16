import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import thunk from 'redux-thunk';
import axios from 'axios';
import { Parallax, Background } from 'react-parallax';
import Draggable from 'react-draggable';

export {
  React, Component, connect, Provider, combineReducers, createStore, applyMiddleware,
  compose, ReactDOM, Router, Route, hashHistory, thunk, axios, Parallax, Background,
  Draggable
}
