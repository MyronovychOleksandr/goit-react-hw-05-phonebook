import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import PhonebookListItem from "./phonebookListItem/PhonebookListItem";
import s from "./PhonebookList.module.css";

const PhonebookList = ({ contacts, deleteContact }) => {
  return (
    <TransitionGroup component="ul" className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <CSSTransition key={id} timeout={250} classNames={s}>
          <PhonebookListItem
            id={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

// PhonebookList.propTypes = {
//   deleteContact: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ),
// };

export default PhonebookList;
