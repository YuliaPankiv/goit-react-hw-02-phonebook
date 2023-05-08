import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from '../filter/Filter';
import { ContactList } from '../contactList/ContactList';
import ContactForm from '../form/ContactForm';
import { Container } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  addNewContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };
    this.setState(prev => {
      let isFind = prev.contacts.find(({ name }) => name === newContact.name);

      if (!isFind) {
        return { contacts: [...prev.contacts, newContact] };
      } else {
        return alert(`${data.name} is already in contacts.`);
      }
    });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  handleChangeFilter = e => this.setState({ filter: e.currentTarget.value });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  // }
  // if(parsedContacts) {
  //   this.setState({ contacts: parsedContacts });
  // }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
