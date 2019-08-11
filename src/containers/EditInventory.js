import React, { Component } from "react";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./NewAsset.css";

export default class EditInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: null,
        assetname: null,
        assetheight: null,
        assetwidth: null,
        assetstatus: null,
    };
  }

  async componentDidMount() {
    try {
      const asset = await this.getAsset();
      
      this.setState({
        assetname: asset.assetname,
        assetheight: asset.assetheight,
        assetwidth: asset.assetwidth,
        assetstatus: asset.assetstatus,
      });
    } catch (e) {
      alert(e);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
    const asset = {
        assetname: this.state.assetname,
        assetheight: this.state.assetheight,
        assetstatus: this.state.assetstatus,
        assetwidth: this.state.assetwidth
    };

    try{
        await this.saveAsset(asset);
        this.setState({ isLoading: false });
        this.props.history.push("/");
    }
    catch(e){
        alert(e);
        this.setState({ isLoading: false });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}
  getAsset() {
    return API.get("assets", `/assets/${this.props.match.params.id}`);
  }

  saveAsset(asset) {
    return API.put("assets", `/assets/${this.props.match.params.id}`, {
      body: asset
    });
  }

  render() {
    const {
        assetname,
        assetheight,
        assetwidth,
        assetstatus
      } = this.state;
    return (
        <div className="NewAsset">
        {assetname && <div>
            <form onSubmit={this.handleSubmit}>
            <input type="text" id="assetname" disabled
            placeholder="assetname" value={assetname} onChange={this.handleChange}></input>
            <input type="text" id="assetwidth"
            placeholder="assetwidth" value={assetwidth} onChange={this.handleChange}></input>
            <input type="text" id="assetheight" 
            placeholder="assetheight" value={assetheight} onChange={this.handleChange}></input>
            <input type="text" id="assetstatus"
            placeholder="assetstatus" value={assetstatus} onChange={this.handleChange}></input>
            
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="small"
            type="submit"
            isLoading={this.state.isLoading}
            text="Edit"
            loadingText="Editing.."
          />
        </form>
        <p>you cannnot edit name, please edit other params</p>
        </div>}
        
      </div>
        );
  }
}
