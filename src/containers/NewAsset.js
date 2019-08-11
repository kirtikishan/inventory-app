import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "./NewAsset.css";
import { API } from "aws-amplify";

export default class NewAsset extends Component { 

    constructor(props) {
        super(props);
    
        this.file = null;
    
        this.state = {
          isLoading: null,
          shops:[],
          assetname: "",
          assetwidth: "",
          assetheight: "",
          assetstatus: "",
          shopcenterid: "",
          shopname: ""
        };
    }

      async componentDidMount(){
        if(!this.props.isAuthenticated){
            return;
        }
        
        try {
            const shops = await this.shops();
            this.setState({shops, shopcenterid: shops[0].centerid});
        } catch(e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    shops(){
      return API.get("shop", "/shop");
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
          assetname,
          assetwidth,
          assetheight,
          assetstatus,
          shopcenterid
        } = this.state;
        try {
            await this.createAsset({
              assetname: assetname,
              assetwidth: assetwidth,
              assetheight: assetheight,
              assetstatus: assetstatus,
              shopcenterid: shopcenterid
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

    createAsset(asset){
        return API.post("assets", "/assets", {
            body: asset
        });
    }

    onChange = e => {
      if(e && e.target.name){
        this.setState({
            [e.target.id]:e.target.value
        });
      }
    }

    selectChange = e => {
      this.setState({
        shopcenterid: e.target.value,
        shopname: e.target.value
      });
    }

    getShopName(shopcenterid) {
      const {shops} = this.state;
      for(let i=0;i < shops.length ; i++) {
        if(shops[i].centerid === shopcenterid) {
          return shops[i].shopname;
        }
      }
    }

    render() {
      const {
        assetname,
        assetwidth,
        assetheight,
        assetstatus,
        shopname,
        shops
      } = this.state;
        return (
          <div className="NewAsset">
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="assetname"
                placeholder="assetname" value={assetname} onChange={this.handleChange}></input>
                <input type="text" id="assetwidth"
                placeholder="assetwidth" value={assetwidth} onChange={this.handleChange}></input>
                <input type="text" id="assetheight"
                placeholder="assetheight" value={assetheight} onChange={this.handleChange}></input>
                <input type="text" id="assetstatus"
                placeholder="assetstatus" value={assetstatus} onChange={this.handleChange}></input>
                <select value={shopname} onChange={this.selectChange}>
                  {shops.map((shop,index) => <option key={shop.centerid} value={shop.centerid}>{shop.shopname}</option>)}
                </select>
                
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