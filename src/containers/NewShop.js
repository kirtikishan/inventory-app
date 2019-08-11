import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "./NewAsset.css";
import { API } from "aws-amplify";

export default class NewShop extends Component { 

    constructor(props) {
        super(props);
    
        this.file = null;
    
        this.state = {
          isLoading: null,
          shopname: "",
          shopaddress: "",
          shoplocation: "",
        };
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const {
          shopname,
          shopaddress,
          shoplocation,
        } = this.state;
        try {
            await this.createShop({
              shopname: shopname,
              shopaddress: shopaddress,
              shoplocation: shoplocation,
            });
            this.props.history.push("/");
        }
        catch(e) {
            alert(e);
            this.setState({
                isLoading: false
            });
        }
    }

    createShop(shop){
        return API.post("shop", "/shop", {
            body: shop
        });
    }

    onChange = e => {
      if(e && e.target.name){
        this.setState({
            [e.target.id]:e.target.value
        });
      }
    }

    render() {
      const {
        shopaddress,
        shoplocation,
        shopname
      } = this.state;
        return (
          <div className="NewAsset">
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="shopname"
                placeholder="shopname" value={shopname} onChange={this.handleChange}></input>
                <input type="text" id="shopaddress"
                placeholder="shopaddress" value={shopaddress} onChange={this.handleChange}></input>
                <input type="text" id="shoplocation"
                placeholder="shoplocation" value={shoplocation} onChange={this.handleChange}></input>
                
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="small"
                type="submit"
                isLoading={this.state.isLoading}
                text="Create"
                loadingText="Creating…"
              />
            </form>
          </div>
        );
    }
}