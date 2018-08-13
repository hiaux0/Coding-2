// import {StageComponent} from 'aurelia-testing';
// import {bootstrap} from 'aurelia-bootstrapper';
   
// describe('MyAttribute', () => {
//   let component;

//   beforeEach(() => {
//     component = StageComponent
//         .withResources('src/ressources/attributes/autocomplete')
//         .inView(
//           '<input type="text" focus.bind="showCommandPalett" value.bind="value"' +
//           'autocomplete="value.bind: value;' +
//           'list.bind: simpleCommand;' +
//           'key.bind: key;' +
//           'suggested-list.two-way: suggestedList"' +
//           '>'
//         )
//         .boundTo({ color: 'blue' });
//   });

//   it('should set the background color to provided color', done => {
//       component.create(bootstrap).then(() => {
//         done();
//       }).catch(e => console.log(e.toString()));
//   });

//   afterEach(() => {
//     component.dispose();
//   });
// });