import React from "react";
import s from "./PhonebookListItem.module.css";

export default function PhonebookListItem({ id, name, number, deleteContact }) {
  return (
    <li className={s.item}>
      <span className={s.name}>{name} </span>
      <div className={s.box}>
        <span>{number} </span>
        <button id={id} onClick={() => deleteContact(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
