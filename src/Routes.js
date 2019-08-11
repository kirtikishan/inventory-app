import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import NewAsset from "./containers/NewAsset";
import Authorized from "./components/Authorized";
import UnAuthorized from "./components/UnAuthorized";
import AppliedRoute from "./components/AppliedRoute";
import NewShop from "./containers/NewShop";
import EditInventory from "./containers/EditInventory";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnAuthorized path="/login" exact component={Login} props={childProps} />
    <Authorized path="/assets/new" exact component={NewAsset} props={childProps} />
    <Authorized path="/assets/:id" exact component={EditInventory} props={childProps} />
    <Authorized path="/shop/new" exact component={NewShop} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
