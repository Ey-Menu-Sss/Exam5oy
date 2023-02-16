// react ...
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

// styles ...
import './styles/registerPage.module.scss'
import './styles/dashboardPage.module.scss'
import './styles/main.scss' 
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/boxicons/css/boxicons.min.css" 

axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
let token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["x-auth-token"] = `${token}`;
// App file ...
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer/>
  </Router>,
)
