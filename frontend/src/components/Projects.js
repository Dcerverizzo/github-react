import React from 'react';
import $ from 'jquery';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialProjects: [],
      repos: []
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const context = this;
    $.ajax({
      url: 'http://localhost:5000/repos',
      method: 'GET',
      success: function (response) {
        context.setState({
          initialProjects: response,
          repos: response,
        });
      }
    });
  }
  handleChange({ target }) {
    if (!target.value) {
      this.setState({
        repos: this.state.initialProjects
      });
      return
    }

    const reposFiltered = this.state.initialProjects.filter(repo => {
      return repo[1].toLowerCase().includes(target.value.toLowerCase());
    });

    this.setState({
      repos: reposFiltered
    });
  }

  setColumOrder(target) {
    const context = this;
    target.value = target.currentTarget.value.toString();
    if (!target.value) {
      this.setState({
        repos: this.state.initialProjects
      });
      return
    }

    if (target.value === 'NAMEASC') {
      var reposFiltered = context.state.initialProjects.sort((a, b) => {
        return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1
      });
    } if (target.value === 'NAMEDESC') {
      var reposFiltered = context.state.initialProjects.sort((a, b) => {
        return b[1].toLowerCase() > a[1].toLowerCase() ? 1 : -1
      });
    }
    if (target.value == 'DATEASC') {
      var reposFiltered = context.state.initialProjects.sort((a, b) => {
        return new Date(a[3]).getTime() > new Date(b[3]).getTime() ? 1 : -1
      });
    } if (target.value == 'DATEDESC') {
      var reposFiltered = context.state.initialProjects.sort((a, b) => {
        return new Date(b[3]).getTime() > new Date(a[3]).getTime() ? 1 : -1
      });
    }
    else {
      context.setState({
        repos: this.state.initialProjects
      });
    }

    context.setState({
      repos: reposFiltered
    });
  }

  render() {
    return (
      <div>
        <div className="container-input">
          <input type="text" onChange={this.handleChange.bind(this)} />
        </div>
        <div className="container-list">
          <p>Repositories Github</p>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name Project
                  <button className="button-arrow" onClick={this.setColumOrder.bind(this)} value="NAMEASC">
                    <i className="bi bi-arrow-up"></i>
                  </button>

                  <button className="button-arrow" onClick={this.setColumOrder.bind(this)} value="NAMEDESC">
                    <i className="bi bi-arrow-down"></i>
                  </button>
                </th>
                <th scope="col">Last commit
                  <button className="button-arrow" onClick={this.setColumOrder.bind(this)} value="DATEASC">
                    <i className="bi bi-arrow-up"></i>
                  </button>

                  <button className="button-arrow" onClick={this.setColumOrder.bind(this)} value="DATEDESC">
                    <i className="bi bi-arrow-down" ></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.repos.map(repo =>
                <tr key={repo[0]}>
                  <td>{repo[0]}</td>
                  <td>{repo[1]} </td>
                  <td>{repo[3]} </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}