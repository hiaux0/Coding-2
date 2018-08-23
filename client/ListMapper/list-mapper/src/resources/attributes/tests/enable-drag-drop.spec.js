// import {StageComponent} from 'aurelia-testing';
// import {bootstrap} from 'aurelia-bootstrapper';
// import {PLATFORM} from 'aurelia-pal';
// import interact from 'interactjs';
// import {triggerDragAndDrop} from '../../../../test/test-helpers/drag-drop-events';
// // https://github.com/andywer/drag-mock
// // Note that I changed the index.js file in the root dir
// import dragMock from 'drag-mock';
// console.log('​dragMock', dragMock);

// fdescribe('CA--enable-drag-drop', () => {
//   let component;
//   let bindingContext = {
//     listData: [
//       {
//         "content": "C-a :",
//         "position": 0
//       },
//       {
//         "content": "C-b :",
//         "position": 1
//       },
//       {
//         "content": "C-c :",
//         "position": 2
//       },
//     ]
//   };

//   beforeEach(() => {
//     component = StageComponent
//       .withResources(
//         PLATFORM.moduleName('resources/attributes/enable-drag-drop')
//       )
//       .inView(`
//         <ul
//           class='simple-list and foo bar'
//           enable-drag-drop
//         >
//           <span class="item-container draggable" id="okok">
//             <li contenteditable ref="shortcut.htmlElement">
//               C-a : 0
//             </li>
//             <span class="dropzone"></span>
//           </span>
//           <span class="item-container draggable">
//             <li contenteditable ref="shortcut.htmlElement">
//               C-b : 1
//             </li>
//             <span class="dropzone"></span>
//           </span>
//           <span class="item-container draggable">
//             <li contenteditable ref="shortcut.htmlElement">
//               C-c : 2
//             </li>
//             <span class="dropzone"></span>
//           </span>
//         </ul>
//       `)
//       .boundTo(bindingContext)

//     // console.log(Object.keys(component))
//   })

//   it('`interact draggable` should set context correctly', (done) => {
//     component.create(bootstrap).then(() => {
//       let vm = component.viewModel;
//       let interactable = vm.initDraggable();
//       let context = interactable.context();
//       let expectedClassList = context.au['enable-drag-drop'].viewModel.element.classList;

//       /** What I want to test here is whether interact received the correct context */
//       expect(expectedClassList.length).toBe(5);
//       expect(expectedClassList[2]).toBe('foo');

//       done();
//     });
//   });

//   it('`interact draggable` should set restrictions correctly', (done) => {
//     component.create(bootstrap).then(() => {
//       let vm = component.viewModel;
//       let interactable = vm.initDraggable();
//       let options = interactable.options;
//       let drag = options.drag;
//       let restrict = drag.restrict;

//       expect(restrict.restriction).toBe('.simple-list');
//       done();
//     });
//   });

//   it('`interact draggable` should set restrictions rect correctly', (done) => {
//     component.create(bootstrap).then(() => {
//       let vm = component.viewModel;
//       let interactable = vm.initDraggable();
//       let options = interactable.options;
//       let drag = options.drag;
//       let restrict = drag.restrict;

//       let expectedRect = { top: 0, left: 0, bottom: 1, right: 1 };

//       expect(restrict.elementRect.top).toBe(expectedRect.top);
//       expect(restrict.elementRect.left).toBe(expectedRect.left);
//       expect(restrict.elementRect.bottom).toBe(expectedRect.bottom);
//       expect(restrict.elementRect.right).toBe(expectedRect.right);
//       done();
//     });
//   });


//   afterEach(() => {
//     component.dispose();
//   })

// });
