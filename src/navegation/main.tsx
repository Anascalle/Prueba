import { createBrowserRouter } from 'react-router-dom';
import LandingScreen from '../screens/Landing/Landing';
import DetailScreen from '../screens/Detail/Detail';
import Main from '../screens/Main/Main';
import RegisterScreen from '../screens/Register/Register';
import LoginScreen from '../screens/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <LandingScreen/>, 
  },
  {
    path: '/login', 
    element: <LoginScreen/>, 
  },
  {
    path: '/signup', 
    element: <RegisterScreen/>, 
  },
  {
    path: '/main/:userId', 
    element: <Main/>, 
  },
  {
    path: '/detail/:id', 
    element: <DetailScreen/>, 
  },
  
]);