import React from 'react';
import { fetchGet } from '../../api';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      errors: []
    }
  }

  componentDidMount(){

    /**HAND ALL REQUEST TO THE SERVER AND POPULATE DATA FROM THE DATABASE */
    fetchGet('account')
      .then((data) => {
        console.log(data);
        this.setState({
          data
        })
      },
      (errors) => {
        console.log(errors);
        this.setState({
          errors
        })
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
