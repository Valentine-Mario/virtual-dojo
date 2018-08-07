import React from 'react';
import { API_URL } from '../../config';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      errors: []
    }
  }

  componentDidMount(){

    fetch(`${API_URL}/account`, {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data
        })
      },
      (errors) => {
        console.log(errors);
      })

  }

  render(){
    return (
      <div>
        Home page
      </div>
    )
  }
}

export default Home
