import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes , Route} from 'react-router-dom';
import Home from './components/Home';
import CommonProducts from './components/CommonProduct';
import UncommonProduct from './components/UncommonProduct';
import UncommonProject from './components/UncommonProjects';
import Login from './components/Login';
import Category from './components/Category';
import Product from './components/Product';
import Producer from './components/Producer';
import User from './components/User';
import States from './components/States';
import Account from './components/Account';
import AccountManage from './components/AccountManage';
import Adduncommon from './components/Adduncommon';
import Addcommon from './components/Addcommon';
import Updateuncommon from './components/Updateuncommon';
import Updatecommon from './components/Updatecommon';
import ProductImages from './components/ProductImages';
import CommonProduct2 from './components/CommonProduct2';
import CreateBy from './components/CreateBy';
import { fetchCommon } from './redux/commonSlice';
import store from './redux/store/store'
import { Provider } from 'react-redux';
import UncommonProduct2 from './components/UncommonProduct2';
import Test from './components/Test';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/common/:pid' element={<CommonProducts/>}/>
      <Route path='/createBy' element={<CreateBy/>}/>
      <Route path='/common2' element={<CommonProduct2/>}/>
      <Route path='/uncommon/:pid' element={<UncommonProduct/>}/>
      <Route path='/uncommon2' element={<UncommonProduct2/>}/>
      <Route path='/test/:pid' element={<Test/>}/>
      <Route path='/project' element={<UncommonProject/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/producer' element={<Producer/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/state' element={<States/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/accountManage' element={<AccountManage/>}/>
      <Route path='/adduncommon' element={<Adduncommon/>}/>
      <Route path='/addcommon' element={<Addcommon/>}/>
      <Route path='/updateuncommon' element={<Updateuncommon/>}/>
      <Route path='/updatecommon' element={<Updatecommon/>}/>
      <Route path='/productimages' element={<ProductImages/>}/>
    </Routes>
  </Router>,
  </Provider>
</React.StrictMode>
);

function Mains(){
  return(
    <div>
      <h1>Hello Welcom</h1>
      <a href='/home'>Home</a>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
store.dispatch(fetchCommon())
