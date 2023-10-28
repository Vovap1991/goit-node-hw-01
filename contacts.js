const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });

  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contactToFind = contacts.find((contact) => contact.id === contactId);

  if (contactToFind) {
    return contactToFind;
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const contactToRemove = contacts.find((contact) => contact.id === contactId);

  if (!contactToRemove) {
    throw new Error("Contact not found");
  }

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await writeContacts(updatedContacts);

  return contactToRemove;
}

async function addContact(name, email, phone) {
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
}
