import React from 'react';
import $ from 'jquery';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bio: "",
      avatar: "",
      followers: ""
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    var context = this;

    $.ajax({
      url: 'http://localhost:5000/',
      method: 'GET',
      success: function (response) {
        context.setState({
          name: response.name,
          bio: response.bio,
          avatar: response.avatar,
          followers: response.followers
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          <div
            className="card p-4">
            <div className=" image d-flex flex-column
            justify-content-center align-items-center">
              <button className="btn
                btn-secondary"> 
                <img src={this.state.avatar}
                  height="100" width="100" alt="profile pic"/>
              </button>
              <span className="name mt-3">{this.state.name}</span>
              <span className="idd">@dancerverizzo</span>
              <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                <span className="number">{this.state.followers}
                  <span className="follow"> Followers</span></span>
              </div>

              <div className="text mt-3">
                <span>{this.state.bio}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}