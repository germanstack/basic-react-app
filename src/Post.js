import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      resultStatus: '',
      resultMessage: '',
      result: [],
      singlePost: [],
    };
    this.key = props.location.pathname;
    console.log(props);
    this.address = 'http://127.0.0.1:4002'+this.key;
  }
  getPost(event){
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
          if(result.status === 'SUCCESS'){
            this.setState({
              singlePost : result.data
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
  handlePost(post){
    this.setState({singlePost:post});
    console.log(post);
  }
  componentDidMount(){
    this.getPost();
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <div className='row fullWidth'>
            {
              this.state.singlePost?
                (
                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 marginAuto text-left">
                    <div className="cardS">
                      <h3>{this.state.singlePost.title}</h3>
                      <p>{this.state.singlePost.body}</p>
                    </div>
                    <br/><br/>
                  </div>
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
    )
  }
}

export default Post;