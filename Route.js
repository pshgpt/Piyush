/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Login from './src/login';
import Register from './src/register';
import Root from './src/root';
import Home from './src/home';
import Update from './src/update';

const Route = () => (
 <Router styles={{ alignItem: 'center' }}>
    <Scene key="root" navigationBarStyle={{backgroundColor: '#1c313a'}} titleStyle={{color : "#FFF"}}>
     <Scene key="main" component={Root} title="Welcome Friend" type="reset" initial />
     <Scene key="register" component={Register} title="Join us now!" />
     <Scene key="login" component={Login} title="Log In"/>
     <Scene key="home" component={Home} title="Welcome User" type="reset" />
     <Scene key="update" component={Update}title="Account Details" />
    </Scene>
</Router>
  );


export default Route;
