
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './src/login';
import Register from './src/register';
import Root from './src/root';
import Home from './src/home';
import Update from './src/update';
import LandView from './src/landview';
import LandDetails from './src/landdetails';

const Route = () => (
 <Router styles={{ alignItem: 'center' }}>
      <Scene
       key="root"
       navigationBarStyle={{ backgroundColor: '#1c313a' }}
       titleStyle={{ color: '#FFF' }}
      >
     <Scene key="main" component={Root} title="Welcome Friend" type="reset" initial />
     <Scene key="register" component={Register} title="Join us now!" />
     <Scene key="login" component={Login} title="Log In" />
     <Scene key="home" component={Home} title="Welcome User" type="reset" />
     <Scene key="update" component={Update}title="Account Details" />
     <Scene
      key="landview"
      component={LandView}
      title="Land Details"
      onRight={() => Actions.landdetails()}
       rightTitle="Add"
     />
    <Scene key="landdetails" component={LandDetails}title=" Enter Land Details" />
    </Scene>
</Router>
  );


export default Route;
