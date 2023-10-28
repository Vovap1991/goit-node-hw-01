const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

function writeContacts(contacts) {
  try {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  } catch (error) {
    console.error(error);
  }
}

async function listContacts() {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();

    const contactToFind = contacts.find((contact) => contact.id === contactId);

    if (contactToFind) {
      return contactToFind;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();

    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await writeContacts(updatedContacts);

    if (!contactToRemove) {
      return null;
    } else {
      return contactToRemove;
    }
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();

    const contactToAdd = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };

    contacts.push(contactToAdd);

    await writeContacts(contacts);

    return contactToAdd;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
