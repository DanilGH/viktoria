import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
import Spinner from '../common/Spinner';
import SimpleButton from "../button/SimpleButton";
import { getUsers, deleteUser } from '../../actions/userActions';

class Users extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this)
  }

  componentDidMount() {
    this.props.getUsers(1)
  }

  deleteUser(id) {
    new Promise((resolve) => {
      this.props.deleteUser(id)
      resolve()
    }).then(() => {
      this.props.getUsers(this.props.user.pagination.page)
    })
  }

  handlePageClick = number => {
    this.props.getUsers(number)
  };

  render() {
    const {users, loading, pagination} = this.props.user
    const {page, countPages, nextPage, prePage} = pagination

    let pages = [...new Array(countPages)].map((v, i) => {
      return {
        number: i + 1
      }
    });

    let userContent

    if (users === null || loading) {
      userContent = <Spinner/>
    } else {
      userContent = (
        <table className="table table-hover">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col">Фамилия</th>
            <th scope="col"
                className="text-center">
              Телефон
            </th>
            <th scope="col"
                className="text-center">
              Действия
            </th>
          </tr>
          </thead>
          <tbody>
          {
            users.map(
              user => (
                <tr key={user.id}>
                  <th scope="row"
                      className="font-weight-light">
                    {user.id}
                  </th>
                  <td>{user.firstname}</td>
                  <td>{user.middlename}</td>
                  <td>{user.lastname}</td>
                  <td className="text-center">
                    {user.phone}
                  </td>
                  <td className="d-flex justify-content-center">
                    <Link to={`/users/${user.id}`}
                          className="btn btn-outline-primary btn-sm">
                      <i className="fa fa-edit"/>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm ml-2"
                            onClick={() => this.deleteUser(user.id)}>
                      <i className="fa fa-trash-o"/>
                    </button>
                  </td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
      )
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="text-center">Пользователи</h1>
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <SimpleButton className="btn btn-primary"
                            link='/users/create'>
                Добавить
              </SimpleButton>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {userContent}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-md-center">
                  <li className={"page-item" + (prePage < 1 ? " disabled" : "")}>
                      <span className="page-link"
                            aria-label="Previous"
                            onClick={this.handlePageClick.bind(this, prePage)}>
                        <span aria-hidden="true">&laquo;</span>
                      </span>
                  </li>
                  {pages.map(i => {
                    return <li className={"page-item" + (i.number === page ? " active" : "")}
                               key={i.number}>
                      <span className="page-link" onClick={this.handlePageClick.bind(this, i.number)}>
                        {i.number}
                      </span>
                    </li>
                  })}
                  <li className={"page-item" + (nextPage >= countPages ? " disabled" : "")}>
                      <span className="page-link"
                            aria-label="Next"
                            onClick={this.handlePageClick.bind(this, nextPage)}>
                        <span aria-hidden="true">&raquo;</span>
                      </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUsers, deleteUser})(Users);