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
  { ...lei, contactList: [jimmy, minhsam] },
  { ...minhsam, contactList: [chi, younjin] },
  { ...jimmy, contactList: [trungni] },
  { ...chi, contactList: [lei, minhsam, chi, jimmy] },
  { ...trungni, contactList: [lei] },
  { ...younjin, contactList: [lei] },
]
// console.log('TCL: contactMap', contactMap);

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

/**
 * @param {Person} person
 */
const forwardMessage = (person, contactMap) => {
  person.msgReceived = true;
  // console.log("1. ", person.name, "is forwarding the message to his contact list:")
  // console.log(getNames(person.contactList))
  /**
   * @param {ContactList} contactList;
   */
  let { contactList } = person;

  /**
   * @param {Person} contact
   */
  contactList.forEach((nextSender) => {
    numOfMessagesSent++;
    console.log('2. For each nextSender in the contactList of', person.name);
    // console.log('2.1 Continue to forward the message, if message was not received yet');
    // console.log('2.2 Next sender is: ', nextSender.name)
    // console.log('2.3 With contact list ', nextSender.contactList);

    // console.log('TCL: forwardMessage -> contactMap', contactMap);
    let foundContact = findContact(nextSender.name, contactMap);

    // console.log('3. ', "The next sender from", person.name, " contact list is", foundContact.name);

    // console.log('4. Check if', foundContact.name, "already has received the msg")
    if (!foundContact.msgReceived) {
      numOfMessagesForwarded++
      // console.log('4I. The msg was not received yet by: ', foundContact.name);
      // console.log('Foward and set flag `msgReceived` to true for ', foundContact.name);
      let indexInMap = findContactIndexInMap(foundContact.name, contactMap)
      // console.log('TCL: forwardMessage -> indexInMap', indexInMap);
      contactMap[indexInMap].msgReceived = true;
      // console.log('5. TCL: forwardMessage -> contactMap', contactMap);
      // console.log('------------------------------')

      forwardMessage(foundContact, contactMap);
    } else {
      // console.log('4II.', foundContact.name, "has already received the msg, so don't send");
      return 'dont send msg';
    }
  });
}

forwardMessage(contactMap[0], contactMap);
// contactMap /*?*/
numOfMessagesSent /*?*/
numOfMessagesForwarded /*?*/
