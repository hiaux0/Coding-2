import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

/**
 * Want to check methods in custom attribute, but not able to right now 2018-08-15 23:52:03
 */
xdescribe('CA--autocomplete--', () => {
  let component;
  let bindData = {
    value: "A",
    commandList: [
      {
        name: "Change to dark theme",
        id: "changeToDarkTheme",
        origin: "app.js darkTheme()"
      },
      {
        name: "Change to light theme",
        id: "changeToLightTheme",
        origin: "app.js lightTheme()"
      },
    ],
    key: "name",
    commandId: null,
    suggestedList: null,
  }

  beforeEach(() => {
    component = StageComponent
      .withResources('resources/attributes/autocomplete')
      .inView(
        "<div class='hio-input-container'>" +
        "  <input" +
        "    type='text'" +
        "    focus.bind='showCommandPalett'" +
        "    value='laksdj'" +
        "    autocomplete='value.bind: value; list.bind: commandList; key.bind: key; suggested-list.two-way: suggestedList'" +
        "  >" +
        "  <div" +
        "    class='hio-dropdown-container'" +
        "    ref='commandListContainerRef'" +
        "    up-down-navigation='suggested-list.bind: suggestedList;" +
        "                        command-id.two-way: commandId'" +
        "  >" +
        "    <div" +
        "      repeat.for='suggestion of suggestedList'" +
        "      class='hio-dropdown-item'" +
        "      data-command-id='${suggestion.id}'" +
        "    >" +
        "      ${suggestion.name}" +
        "    </div>" +
        "  </div>" +
        "</div>"
      )
      .boundTo(bindData);
  });

  it('Spy on fnc', (done) => {
    component.create(bootstrap).then(() => {
      let vm = component.viewModel;
      spyOn(vm, 'valueChanged')
      console.log('​vm', vm);

      vm.value = 'hi'
      vm.value = 'bye'
  
      expect(vm.valueChanged).toHaveBeenCalledWith('','')
      done();
    });
  });
})

describe('CA--autocomplete-- 0 suggestions', () => {
  let component;
  let bindData = {
    value: "A",
    commandList: [
      {
        name: "Change to dark theme",
        id: "changeToDarkTheme",
        origin: "app.js darkTheme()"
      },
      {
        name: "Change to light theme",
        id: "changeToLightTheme",
        origin: "app.js lightTheme()"
      },
    ],
    key: "name",
    commandId: null,
    suggestedList: null,
  }

  beforeEach(() => {
    component = StageComponent
      .withResources('resources/attributes/autocomplete')
      .inView(
        "<div class='hio-input-container'>" +
        "  <input" +
        "    type='text'" +
        "    focus.bind='showCommandPalett'" +
        "    value='laksdj'" +
        "    autocomplete='value.bind: value; list.bind: commandList; key.bind: key; suggested-list.two-way: suggestedList'" +
        "  >" +
        "  <div" +
        "    class='hio-dropdown-container'" +
        "    ref='commandListContainerRef'" +
        "    up-down-navigation='suggested-list.bind: suggestedList;" +
        "                        command-id.two-way: commandId'" +
        "  >" +
        "    <div" +
        "      repeat.for='suggestion of suggestedList'" +
        "      class='hio-dropdown-item'" +
        "      data-command-id='${suggestion.id}'" +
        "    >" +
        "      ${suggestion.name}" +
        "    </div>" +
        "  </div>" +
        "</div>"
      )
      .boundTo(bindData);
  });

  it('Should show correct suggestion list: 0', done => {
    component.create(bootstrap).then(() => {

      setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
        let ele = component.element;

        let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item')
        let ddListLen = hioDropdownItem.length
        console.log('​ddListLen', ddListLen);
        expect(ddListLen).toBe(0)

        done();
      }, 200)

    }).catch(e => console.log(e.toString()));
  });

  afterEach(() => {
    component.dispose();
  });
});
   
describe('CA--autocomplete-- 1 suggestion', () => {
  let component;
  let bindData = {
    value: "dark",
    commandList: [
      {
        name: "Change to dark theme",
        id: "changeToDarkTheme",
        origin: "app.js darkTheme()"
      },
      {
        name: "Change to light theme",
        id: "changeToLightTheme",
        origin: "app.js lightTheme()"
      },
    ],
    key: "name",
    commandId: null,
    suggestedList: null,
  }

  beforeEach(() => {
    component = StageComponent
        .withResources('resources/attributes/autocomplete')
        .inView(
          "<div class='hio-input-container'>" +
          "  <input" +
          "    type='text'" +
          "    focus.bind='showCommandPalett'" +
          "    value='laksdj'" +
          "    autocomplete='value.bind: value; list.bind: commandList; key.bind: key; suggested-list.two-way: suggestedList'" +
          "  >" +
          "  <div" +
          "    class='hio-dropdown-container'" +
          "    ref='commandListContainerRef'" +
          "    up-down-navigation='suggested-list.bind: suggestedList;" +
          "                        command-id.two-way: commandId'" +
          "  >" +
          "    <div" +
          "      repeat.for='suggestion of suggestedList'" +
          "      class='hio-dropdown-item'" +
          "      data-command-id='${suggestion.id}'" +
          "    >" +
          "      ${suggestion.name}" +
          "    </div>" +
          "  </div>" +
          "</div>"
        )
        .boundTo(bindData);
  });

  it('Should show correct suggestion list: 1', done => {
      component.create(bootstrap).then(() => {

        setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
          let ele = component.element;

          let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item')
          let ddListLen = hioDropdownItem.length
          expect(ddListLen).toBe(1)

          for (let itemIndex=0; itemIndex<ddListLen; itemIndex++) {
            let actual = hioDropdownItem[itemIndex].innerText;
            let expected = bindData.commandList[itemIndex].name;
            expect(actual).toBe(expected);
          }

          done();
        }, 300)
        
      }).catch(e => console.log(e.toString()));
  });

  afterEach(() => {
    component.dispose();
  });
});
   
describe('CA--autocomplete-- 2 suggestions', () => {
  let component;
  let bindData = {
    value: "Change",
    commandList: [
      {
        name: "Change to dark theme",
        id: "changeToDarkTheme",
        origin: "app.js darkTheme()"
      },
      {
        name: "Change to light theme",
        id: "changeToLightTheme",
        origin: "app.js lightTheme()"
      },
    ],
    key: "name",
    commandId: null,
    suggestedList: null,
  }

  beforeEach(() => {
    component = StageComponent
        .withResources('resources/attributes/autocomplete')
        .inView(
          "<div class='hio-input-container'>" +
          "  <input" +
          "    type='text'" +
          "    focus.bind='showCommandPalett'" +
          "    value='laksdj'" +
          "    autocomplete='value.bind: value; list.bind: commandList; key.bind: key; suggested-list.two-way: suggestedList'" +
          "  >" +
          "  <div" +
          "    class='hio-dropdown-container'" +
          "    ref='commandListContainerRef'" +
          "    up-down-navigation='suggested-list.bind: suggestedList;" +
          "                        command-id.two-way: commandId'" +
          "  >" +
          "    <div" +
          "      repeat.for='suggestion of suggestedList'" +
          "      class='hio-dropdown-item'" +
          "      data-command-id='${suggestion.id}'" +
          "    >" +
          "      ${suggestion.name}" +
          "    </div>" +
          "  </div>" +
          "</div>"
        )
        .boundTo(bindData);
  });

  it('Should show correct suggestion list: 2', done => {
      component.create(bootstrap).then(() => {

        setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
          let ele = component.element;

          let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item')
          let ddListLen = hioDropdownItem.length
          expect(ddListLen).toBe(2)

          for (let itemIndex=0; itemIndex<ddListLen; itemIndex++) {
            let actual = hioDropdownItem[itemIndex].innerText;
            let expected = bindData.commandList[itemIndex].name;
            expect(actual).toBe(expected)
          }

          done();
        }, 400)
        
      }).catch(e => console.log(e.toString()));
  });

  afterEach(() => {
    component.dispose();
  });
});

