// import Phonebook from "./phonebook/Phonebook";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PhonebookForm from "./phonebookForm/PhonebookForm";
import Filter from "./filter/Filter";
import PhonebookList from "./phonebookList/PhonebookList";
import { CSSTransition } from "react-transition-group";
import s from "./App.module.css";
import "./animation/fadeApp.css";

class App extends Component {
  state = {
    contacts: [],
    name: "",
    number: "",
    filter: "",
  };
  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addContact = (user) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { id: uuidv4(), ...user }],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.filter((contact) => contact.id !== id)],
    }));
  };

  onHandleFilterContact = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFiltertdContact = () => {
    return [
      ...this.state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
      ),
    ];
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className={s.container}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="header"
          unmountOnExit
        >
          <h2 className={s.phonebookHeader}>Phonebook</h2>
        </CSSTransition>
        <PhonebookForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames="filter"
          unmountOnExit
        >
          <Filter
            filter={this.state.filter}
            onHandleFilterContact={this.onHandleFilterContact}
          />
        </CSSTransition>

        {contacts.length >= 1 && (
          <PhonebookList
            contacts={this.getFiltertdContact()}
            deleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
