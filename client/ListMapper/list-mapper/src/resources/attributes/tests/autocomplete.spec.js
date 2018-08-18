import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('CA--autocomplete--', () => {
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
  });

  it('Should show correct suggestion list: 0', done => {
    component.boundTo(bindData);
    component.create(bootstrap).then(() => {

      setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
        let ele = component.element;

        let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item');
        let ddListLen = hioDropdownItem.length;
        expect(ddListLen).toBe(0);

        done();
      }, 200)

    }).catch(e => console.log(e.toString()));
  });

  it('Should show correct suggestion list: 1', done => {
    let boundDataWithNewValue = {...bindData};
    boundDataWithNewValue.value = "dark";
    component.boundTo(boundDataWithNewValue);
    // debugger;
    component.create(bootstrap).then(() => {
      // debugger;
      setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
        let ele = component.element;
        
        let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item');
        let ddListLen = hioDropdownItem.length;
        // debugger;
        expect(ddListLen).toBe(1);

        for (let itemIndex = 0; itemIndex < ddListLen; itemIndex++) {
          let actual = hioDropdownItem[itemIndex].innerText;
          let expected = bindData.commandList[itemIndex].name;
          expect(actual).toBe(expected);
        }

        done();
        }, 400);
    }).catch(e => console.log(e.toString()));
  });

  it('Should show correct suggestion list: 2', done => {
    let boundDataWithNewValue = { ...bindData };
    boundDataWithNewValue.value = "Change";
    component.boundTo(boundDataWithNewValue);

    component.create(bootstrap).then(() => {
      setTimeout(() => { // Why setTimeout? --> https://github.com/aurelia/testing/issues/70
        let ele = component.element;

        let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item');
        let ddListLen = hioDropdownItem.length;
        expect(ddListLen).toBe(2)

        for (let itemIndex=0; itemIndex<ddListLen; itemIndex++) {
          let actual = hioDropdownItem[itemIndex].innerText;
          let expected = bindData.commandList[itemIndex].name;
          expect(actual).toBe(expected);
        }

        done();
      },600)
    }).catch(e => console.log(e.toString()));
  });

  it('Should throw Error "Key not present"', done => {
    let boundDataWithNewValue = { ...bindData };
    boundDataWithNewValue.key = "foo";
    component.boundTo(boundDataWithNewValue);

    // Note: omitting `manuallyHandleLifecycle` results in karma timeout
    component.manuallyHandleLifecycle().create(bootstrap)
      .then(() => {})
      .then(() => component.bind())
      .then(() => {})
      .then(() => component.attached())
      .catch(e => {
        if (e.message === 'Key not present') done();
      });
  });

  afterEach(() => {
    component.dispose();
  });
});

//dasdasdasadasddasdas