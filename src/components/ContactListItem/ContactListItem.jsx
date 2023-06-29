import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../Redux/contactsSlice';
import css from './ContactListItem.module.css';
import Contact from './icons/contacts.png';
import Delete from './icons/delete.png';

const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.contactItem}>
      <img src={Contact} alt="Contact Icon" className={css.contactIcon} />
      <p className={css.contactName}>{name}:</p>
      <p className={css.contactNumber}>{number}</p>
      <button
        className={css.contactButton}
        type="button"
        onClick={() => {
          dispatch(deleteContact(id));
        }}
      >
        <img src={Delete} alt="Delete Icon" className={css.deleteIcon} />
      </button>
    </li>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

