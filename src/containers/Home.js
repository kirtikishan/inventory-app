import React, { Component } from "react";
import { PageHeader, ListGroup, Table, ListGroupItem, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

export default class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          assets: [],
          shops: [],
          selectValue: 'AssetName',
          filtervalue:''
        };
    }

    async componentDidMount(){
        if(!this.props.isAuthenticated){
            return;
        }
        
        try {
            const shops = await this.shops();
            const assets = await this.assets();

            this.setState({assets, shops});
        } catch(e) {
            alert(e);
        }

        this.setState({ isLoading: false });
      }

    assets() {
        return API.get("assets", "/assets");
    }

    shops(){
      return API.get("shop", "/shop");
    }

  getShopName(shopcenterid) {
    const {shops} = this.state;
    for(let i=0;i < shops.length ; i++) {
      if(shops[i].centerid === shopcenterid) {
        return shops[i].shopname;
      }
    }
  }

  getShopId(shopname) {
    const {shops} = this.state;
    for(let i=0;i < shops.length ; i++) {
      if(shops[i].shopname === shopname) {
        return shops[i].centerid;
      }
    }
  }

   renderRows(assets) {
     debugger;
     return assets.map((asset, i) =>
      <tr>
        <td>{i}</td>
        <td> <a key={asset.assetid}
                href={`/assets/${asset.assetid}`}>{asset.assetname}</a></td>
        <td>{asset.assetwidth}</td>
        <td>{asset.assetheight}</td>
        <td>{asset.assetstatus}</td>
        <td>{this.getShopName(asset.shopcenterid)}</td>
      </tr>
     );
   }

    renderAssetsList(assets) {
      return (<Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Asset Name</th>
          <th>Asset Width</th>
          <th>Asset Height</th>
          <th>Status</th>
          <th>ShoppingCenter</th>
        </tr>
      </thead>
      <tbody>
        {this.renderRows(assets)}
      </tbody>
    </Table>)
    }

    renderLander() {
      return (
        <div className="lander">
          <h1>Inventory</h1>
          <p>Inventory App</p>
          <div>
            <Link to="/login" className="btn btn-info btn-lg">
              Login
            </Link>
          </div>
        </div>
      );
    }

    selectChange = e => {
      this.setState({
        selectValue: e.target.value
      });
    }

    onFilterChange = e => {
      this.setState({
        filtervalue: e.target.value
      });
    }

    searchAsset(filter){
      return API.post("assets", "/assets/search", {
        body: filter
    });
    }

     searchByValue = async event => {
       debugger;
      event.preventDefault();
        this.setState({ isLoading: true });
        const {
          selectValue,
          filtervalue
        } = this.state;
        let shopId = 'NA';
        let assetname = 'NA';
        if(selectValue === 'ShopName' && filtervalue!==""){
           let _shopId = this.getShopId(filtervalue);
           if(_shopId) {
             shopId = _shopId;
           }else {
             shopId = "NA";
           }
        }else {
          assetname = filtervalue;
        }
        console.log('shopId', shopId);
        try {
            const searchAssets = await this.searchAsset({
              assetname: assetname === "" ? 'NA' : assetname,
              shopcenterid: shopId === "" ? "NA" : shopId,
            });
            console.log('searchAssets',searchAssets);
            debugger;
            this.setState({
              assets: searchAssets.Items,
              isLoading: false
            })
        }
        catch(e) {
            alert(e);
            this.setState({
                isLoading: false
            });
        }
    }

    renderAssets() {
      debugger;
        return (
          <div className="assets">
            <PageHeader>Your Assets</PageHeader>
            <ListGroup>
            <ListGroupItem>
              FilterBy:
              <select value={this.state.selectValue} onChange={this.selectChange} className="select-filter">
                <option value="AssetName">Asset Name</option>
                <option value="ShopName">Shop Name</option>
              </select>
              <input type="text" id="filtervalue" className="filter"
               placeholder="filtervalue" value={this.state.filtervalue} onChange={this.onFilterChange}></input>
               <Button variant="secondary" className="btn-class" onClick={this.searchByValue}>Search</Button>
            </ListGroupItem>
              <ListGroupItem>
                {!this.state.isLoading && this.renderAssetsList(this.state.assets)}
              </ListGroupItem>
              <LinkContainer
                  key="new"
                  to="/assets/new"
                >
                  <ListGroupItem>
                    <h4>
                      <b>{"\uFF0B"}</b> Create a new asset
                    </h4>
                  </ListGroupItem>
                </LinkContainer>
                <LinkContainer
                  key="new"
                  to="/shop/new"
                >
                  <ListGroupItem>
                    <h4>
                      <b>{"\uFF0B"}</b> Create a new shop
                    </h4>
                  </ListGroupItem>
                </LinkContainer>
            </ListGroup>
          </div>
        );
    }

    render() {
      debugger;
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderAssets() : this.renderLander()}
            </div>
        );
    }
}