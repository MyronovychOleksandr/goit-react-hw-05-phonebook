import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import Alert from "./alert/Alert";
import s from "./PhonebookForm.module.css";
import "../animation/animationAlert.css";

const initialState = {
  name: "",
  number: "",
  valideteForm: false,
};

class PhonebookForm extends Component {
  state = { ...initialState };

  // PropTypes = {
  //   addContact: PropTypes.func.isRequired,
  //   contacts: PropTypes.arrayOf(
  //     PropTypes.exact({
  //       name: PropTypes.string.isRequired,
  //       number: PropTypes.string.isRequired,
  //       id: PropTypes.string.isRequired,
  //     })
  //   ),
  // };

  onHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    const isExistContact = this.props.contacts.some((contact) => {
      return contact.name === this.state.name;
    });
    if (isExistContact) {
      this.setState({ ...initialState, valideteForm: true });
      setTimeout(this.onChangeValideteForm, 2000);
      return;
    }
    const user = { ...this.state };
    this.props.addContact(user);
    this.setState({ ...initialState });
  };

  onChangeValideteForm = () => {
    this.setState({ valideteForm: !this.state.valideteForm });
  };

  render() {
    const { valideteForm } = this.state;
    return (
      <>
        <CSSTransition
          in={valideteForm}
          classNames="alert"
          timeout={500}
          unmountOnExit
        >
          <Alert text="Contact is already exist" />
        </CSSTransition>
        <form className={s.form} onSubmit={this.onHandleSubmit}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              value={this.state.name}
              required
              onChange={this.onHandleChange}
            />
          </label>
          <label className={s.label}>
            Number
            <input
              className={s.input}
              type="tel"
              name="number"
              value={this.state.number}
              required
              onChange={this.onHandleChange}
            />
          </label>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default PhonebookForm;
