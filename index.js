const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const options = program.opts();

console.log(options);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.log(contacts);
      break;

    case "get":
      const searchedContact = await getContactById(id);
      return console.log(searchedContact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(addedContact);
      break;

    case "remove":
      const removedContact = removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
