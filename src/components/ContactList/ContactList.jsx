import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../Redux/contactsSlice';
import ContactListItem from '../ContactListItem';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter.value);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredContacts.length > 0 ? (
        <ul>
          {filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p className={css.filterNoContacts}>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
