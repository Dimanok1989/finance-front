import { Route, Switch } from "react-router-dom";

import Main from "./../components/Main";

const Routes = () => {
    return <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/moneybox" component={Main} />
        <Route path="*" component={() => <div><b>404</b> Not Found</div>} />
    </Switch>
}

export default Routes;