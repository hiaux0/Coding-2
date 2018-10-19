// A: B, C
// B: A, D
// C: D
// D: X, Y, C

// 1. person forwards message to contact list
// next persons repeat, if they did not receive message yet
//   have to keep track of each person --> Object with unique key
// What is longest based on contactMap?
//    count (???)

/**
 * @typedef {{name: String, contactList: ContactList, msgReceived:}} Person
 * @typedef {Array<Person>} ContactList
 */

[
  "Trungni",
  "Younjin",
  "Chi",
  "Minhsam",
  "Jimmy",
  "Lei"
]

let chi = {
  name: "Chi",
  contactList: [
    {}
  ],
  msgReceived: false,
}
let minhsam = {
  name: "Minhsam",
  contactList: [
    {}
  ],
  msgReceived: false,
}
let trungni = {
  name: "Trungni",
  contactList: [
    {}
  ],
  msgReceived: false,
}
let jimmy = {
  name: "Jimmy",
  contactList: [
    {}
  ],
  msgReceived: false,
}
let lei = {
  name: "Lei",
  contactList: [
    {}
  ],
  msgReceived: false,
}
let younjin = {
  name: "Younjin",
  contactList: [
    {}
  ],
  msgReceived: false,
}


let contactMap = [
  { ...lei, contactList: [jimmy] },
  { ...minhsam, contactList: [chi, younjin] },
  { ...jimmy, contactList: [trungni] },
  { ...chi, contactList: [lei, minhsam, chi, jimmy] },
  { ...trungni, contactList: [lei] },
  { ...younjin, contactList: [lei] },
]

/** * * @param {Person} person */
const getName = (person) => {
  return person.name
}

/** * @param {ContactList} contactList */
const getNames = (contactList) => {
  let names = contactList.map((contact) => contact.name);
  return names;
}

const findContact = (contactName, contactMap) => {
  return contactMap
    .find((key) => {
      let { name } = key;
      if (name === contactName) return true;
      return false;
    });
}

const findContactIndexInMap = (contactName, contactMap) => {
  return contactMap
    .findIndex((key) => {
      let { name } = key;
      if (name === contactName) return true;
      return false;
    });

}

let numOfMessagesSent = 0
let numOfMessagesForwarded = 0
let numOfPersonsSendingAMessage = 0

/**
 * @param {Person} person
 */
const forwardMessage = (person, contactMap) => {
  numOfPersonsSendingAMessage++
  person.msgReceived = true;
  let {contactList} = person;

  contactList.forEach((nextSender) => {
    numOfMessagesSent++;

    let foundContact = findContact(nextSender.name, contactMap);

    if (!foundContact.msgReceived) {
      numOfMessagesForwarded++
      let indexInMap = findContactIndexInMap(foundContact.name, contactMap)
      contactMap[indexInMap].msgReceived = true;

      forwardMessage(foundContact, contactMap);
    } else {
      return 'dont send msg';
    }
  });
}

forwardMessage(contactMap[0], contactMap);
numOfMessagesSent /*?*/
numOfMessagesForwarded /*?*/
numOfPersonsSendingAMessage /*?*/