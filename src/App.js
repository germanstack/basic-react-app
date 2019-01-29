import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      resultStatus: '',
      resultMessage: '',
    };
    this.address = '';
    this.result = [];
    this.submitAddress = this.submitAddress.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
  }
  submitAddress(event){
    console.log(this.state.value);
    event.preventDefault();
    this.address = this.state.value;
    if(this.address){
      fetch('https://blockchain.info/rawaddr/'+this.address,{
        method: 'GET',
        mode: 'no-cors',
        referrer: 'no-referral',
        headers: {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(
        res => res
      ).then( 
        (result) => {
          console.log('result');
          console.log(result);
        },
        (error) => {
          console.log('error');
          console.log(error);
        }
      );
    }else{
      this.setState({
        resultStatus: 'error',
        resultMessage: 'Address is required',
      });
    }
  }
  changeAddress(event){
    this.setState({value:event.target.value});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className='row fullWidth'>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 marginAuto">
              <br/><br/>
              <div>
                {
                  this.state.resultMessage === ''?
                    (<div></div>)
                  :
                    (
                      <div>
                        {
                          this.state.resultStatus === 'error'?
                            (<div><span className="alert alert-danger">{this.state.resultMessage}</span><br/><br/></div>)
                          :
                            (<div><span></span></div>)
                        }
                        {
                          this.state.resultStatus === 'success'?
                            (<div><span className="alert alert-success">{this.state.resultMessage}</span><br/><br/></div>)
                          :
                            (<div><span></span></div>)
                        }
                        {
                          this.state.resultStatus === 'warning'?
                            (<div><span className="alert alert-warning">{this.state.resultMessage}</span><br/><br/></div>)
                          :
                            (<div><span></span></div>)
                        }
                      </div>
                    )
                }
              </div>
              <form onSubmit={this.submitAddress} className="text-center">
                <input className="form-input fullWidth" type="text" name="address" placeholder="Enter LPC Wallet Address" value={this.state.value} onChange={this.changeAddress} />
                <br/><br/>
                <button type="submit" className="btn btn-success btn-block">SUBMIT</button>
              </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
