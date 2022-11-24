import css from '../ContactList/ContactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts } from 'Redux/selectors';
import { getStatusFilter } from 'Redux/selectors';
import { statusFilters } from 'Redux/constants';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'Redux/contactsSlice';

// export const TaskList = () => {
//   const contacts = useSelector(getContacts);
//   const statusFilter = useSelector(getStatusFilter);
// const visibleTasks = getVisibleTasks(tasks, statusFilter);

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const statusFilter = useSelector(getStatusFilter);

  const dispatch = useDispatch();

  const onDeleteContact = evt => {
    dispatch(deleteContact(evt));
  };

  console.log(contacts);

  return (
    <ul className={css.contactList}>
      {contacts.length > 0 &&
        contacts.map(({ name, number }) => (
          <li className={css.contacts__item} key={nanoid()}>
            <p className={css.contacts__name}>{name}</p>
            <p className={css.contacts__number}>{number}</p>
            <button
              type="button"
              className={css.delete__btn}
              onClick={() => onDeleteContact(name)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
