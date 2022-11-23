import React from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { useState, useMemo } from 'react';
import useLocalStorage from '../Hooks/useLokalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'Redux/store';
import { deleteContact } from 'Redux/store';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filterQuery, setFilterQuery] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`contact ${name} already in contacts`);
      return;
    }
    setContacts(state => [...state, { name, number }]);
  };

  const deleteContact = contactName => {
    setContacts(prevState =>
      prevState.filter(contact => contact.name !== contactName)
    );
  };

  const changeFilter = evt => {
    setFilterQuery(evt.currentTarget.value);
  };

  const getVisibleContacts = useMemo(() => {
    const normilizedFilter = filterQuery.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  }, [contacts, filterQuery]);

  const value = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <h1 className={css.titlePhonebook}>Phonebook</h1>
      <Form />
      <Filter value={filterQuery} onChange={changeFilter} />
      <h2 className={css.contactList}>Contacts</h2>
      {contacts.length > 0 && (
        <ContactList
          contacts={value}
          onDeleteContact={dispatch(deleteContact())}
        />
      )}
    </div>
  );
}
