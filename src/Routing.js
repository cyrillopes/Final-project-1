import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./component/home/Home";
import Listing from "./component/listing/ListingApi";
import Details from "./component/details/Details";
import PlaceOrder from "./component/orders/PlaceOrder";
import ViewOrder from "./component/orders/ViewOrders";
import Footer from "./component/Footer";
import Login from "./component/login/Login";
import Register from "./component/login/Register";

const Routing = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/listing/:mealId"} component={Listing} />
        <Route exact path={"/details"} component={Details} />
        <Route exact path={"/placeOrder/:restName"} component={PlaceOrder} />
        <Route exact path={"/viewOrders"} component={ViewOrder} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/register"} component={Register} />

        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default Routing;
