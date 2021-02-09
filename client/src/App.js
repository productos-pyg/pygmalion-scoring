import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { layoutActions, userActions } from "./redux/actions";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import Topbar from "./components/layout/Topbar";
import { TranslatorProvider } from "react-translate";
import Button from './components/Button';

class App extends Component{
 
 
    _getLayout(lang){
        return (<TranslatorProvider translations={require('./assets/i18n/'+lang+'.json')}>
            <div>
                <Button name="login"/>
                <Button name="create_account"/>
            </div>
        </TranslatorProvider>)
    }
 
    render(){
        let url  = window.location.href;
        if(url.search('/en') !== -1){
            return this._getLayout('en')
        }else{
            return this._getLayout('es');
        }
    }
}
 
export default App;

const App = ({ loadUser, toggleSidenav, toggleSidenavAction }) => {
  if (localStorage.getItem("token")) {
    loadUser();
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Topbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

const mapStateToPros = (state) => ({
  toggleSidenav: state.layout.toggleSidenav,
});

const actionCreators = {
  loadUser: userActions.loadUser,
  toggleSidenavAction: layoutActions.toggleSidenavAction,
};

export default connect(mapStateToPros, actionCreators)(App);
