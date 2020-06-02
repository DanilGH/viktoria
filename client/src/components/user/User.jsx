import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { addUser, clearErrors, editUser, getUser } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Минимум 2 символа!')
    .max(50, 'Не должно быть больше 50 символов!')
    .required('Имя обязательно!'),
  middlename: Yup.string()
    .min(2, 'Минимум 2 символа!')
    .max(50, 'Не должно быть больше 50 символов!')
    .required('Отчество обязательно!'),
  lastname: Yup.string()
    .min(2, 'Минимум 2 символа!')
    .max(50, 'Не должно быть больше 50 символов!')
    .required('Фамилия обязательна!'),
  phone: Yup.string()
    .required('Телефон обязателен!'),
});

class User extends Component {

  constructor(props) {
    super(props);

    this.initialValues = {
      id: '',
      firstname: '',
      middlename: '',
      lastname: '',
      phone: '',
    }
  }

  componentDidMount() {
    if (!this.props.newUser) {
      if (this.props.match.params.id) {
        this.props.getUser(this.props.match.params.id);
      }
    }
  }

  handleSubmit() {
    return values => {
      new Promise((resolve) => {
        if (this.props.newUser) {
          this.props.addUser({
            user: values
          }).then((data) => {
            resolve(data)
          })
        } else {
          this.props.editUser({
            user: values
          }).then((data) => {
            resolve(data)
          })
        }
      }).then(() => {
        if (!this.props.errors.message) {
          window.location.replace('/')
        }
      })
    }
  }

  render() {
    const {user, loading} = this.props.user;

    if (!this.props.newUser) {
      if (user) {
        this.initialValues = {
          id: user.id,
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          phone: user.phone,
        }
      }
    }

    if (!this.props.newUser && (user === null || loading)) {
      return <Spinner/>;
    } else {
      return (
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-4">
              {this.props.newUser ? <h1>Создать пользователя</h1> : <h1>Редактировать пользователя</h1>}
              {
                this.props.errors.message && <div className="alert alert-danger" role="alert">
                  {this.props.errors.message}
                </div>
              }
              <Formik
                initialValues={this.initialValues}
                validationSchema={SignupSchema}
                onSubmit={this.handleSubmit()}
              >
                {({errors, touched}) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstname">Имя</label>
                      <Field name="firstname" className="form-control" aria-describedby="firstnameHelp"/>
                      {errors.firstname && touched.firstname ? (
                        <small id="firstnameHelp" className="form-text text-danger">
                          {errors.firstname}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="middlename">Отчество</label>
                      <Field name="middlename" className="form-control" aria-describedby="middlenameHelp"/>
                      {errors.middlename && touched.middlename ? (
                        <small id="middlenameHelp" className="form-text text-danger">
                          {errors.middlename}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Фамилия</label>
                      <Field name="lastname" className="form-control" aria-describedby="lastnameHelp"/>
                      {errors.lastname && touched.lastname ? (
                        <small id="lastnameHelp" className="form-text text-danger">
                          {errors.lastname}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Телефон</label>
                      <Field name="phone"
                             className="form-control"
                             aria-describedby="phoneHelp"/>
                      {errors.phone && touched.phone ?
                        <small id="phoneHelp" className="form-text text-danger">
                          {errors.phone}
                        </small> : null}
                    </div>
                    {
                      this.props.newUser ?
                        <button type="submit"
                                className="btn btn-primary">
                          Создать
                        </button> :
                        <button type="submit"
                                className="btn btn-primary">
                          Сохранить
                        </button>
                    }
                    <Link to="/"
                          className="btn btn-outline-primary ml-2"
                          onClick={() => {
                            this.props.clearErrors()
                          }}>
                      Назад
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      );
    }
  }
}

User.propTypes = {
  addUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, {addUser, getUser, editUser, clearErrors})(User);