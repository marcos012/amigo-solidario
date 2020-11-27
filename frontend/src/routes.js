import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CasosListagem from './pages/CasosListagem';
import NewIncident from './pages/CasoFormulario';

const Router = () => {
    return ( 
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={CasosListagem} />    
                <Route path="/login" component={Login} />
                <Route path="/register" component={Cadastro} />
                <Route path="/casos/new" component={NewIncident} />    
            </Switch>  
        </BrowserRouter>
    );
}
 
export default Router;