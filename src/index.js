import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { withRouter } from 'react-router';
import store from './store';
import Header from './components/Header';
// import routes from './routes';
import './index.css';

const Home = lazy(() => import('./containers/Home/Home'));
const Upload = lazy(() => import('./containers/Upload/Upload'));
const Results = lazy(() => import('./containers/Results/Results'));

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route path="/results" component={Results} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  rootElement
);


// routes, lazy loading
// redux -> function routes
// redux-thunk for async calls
// responsive site
