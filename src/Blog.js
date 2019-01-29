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
      result: [],
      singlePost: [],
    };
    this.address = 'http://127.0.0.1:4002/posts';
  }
  getPosts(event){
    if(this.address){
      fetch(this.address,{
        method: 'GET',
        referrer: 'no-referral',
      }).then(
        res => res.json()
      ).then( 
        (result) => {
          console.log('result');
          console.log(result);
          console.log(result.data);
          if(result.status === 'SUCCESS'){
            this.setState({
              result : result.data
            });
          }else{
            this.setState({
              resultStatus : result.status,
              resultMessage : result.message,
            });
          }
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
  componentDidMount(){
    this.getPosts();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
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
            </div>
          </div>
          <div className='row fullWidth'>
            {
              this.state.result.length > 0?
                (
                    this.state.result.map((r,index)=>(
                      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 marginAuto" key={index}>
                        <div className="cardS">
                          <h3>{r.title}</h3>
                          <p>{r.description}</p>
                          <a href={"/post/"+index} className="btn btn-primary btn-block">read</a>
                        </div>
                        <br/><br/>
                      </div>
                    ))
                )
              :
                (
                  <div className="col-md-12">
                    <p>LOADING...</p>
                  </div>
                )
            }
            
          </div>
        </header>
      </div>
    );
  }
}

export default App;
