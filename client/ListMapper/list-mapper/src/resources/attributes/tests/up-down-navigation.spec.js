import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';
import {keyPress} from '../../../../test/test-helpers/key-event';

describe('CA--up-down-navigation--', () => {
  let component;
  let bindingContext = {
    suggestedList: [
      {
        name: "Change to dark theme",
        id: "changeToDarkTheme",
        origin: "app.js darkTheme()"
      },
      {
        name: "Change random",
        id: "random",
        origin: "here random"
      },
      {
        name: "Change to light theme",
        id: "changeToLightTheme",
        origin: "app.js lightTheme()"
      },
    ],
  };

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('resources/attributes/up-down-navigation'))
      .inView(
        "<div" +
          "class='hio-dropdown-container' " +
          "ref='commandListContainerRef' " +
          "up-down-navigation='suggested-list.bind: suggestedList; " +
                              "command-id.two-way: commandId'" +
        ">" +
          "<div " +
            "repeat.for='suggestion of suggestedList' " +
            "class='hio-dropdown-item'" +
            "data-command-id='${suggestion.id}'" +
          ">" +
            "${suggestion.name}" +
          "</div>" +
        "</div>"
      )
      .boundTo(bindingContext)
  });

  it('Should show correct suggestion list: 2', done => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item')
      let ddListLen = hioDropdownItem.length

      expect(ddListLen).toBe(3);
      done();
    }).catch(e => console.log(e.toString()));
  });

  it('Show correct highlight if `KEY_UP` was pressed', (done) => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let dropdownItems = ele.getElementsByClassName('hio-dropdown-item');

      keyPress(38);
      keyPress(38);
      keyPress(38);

      for (let itemIndex = 0; itemIndex < dropdownItems.length; itemIndex++) {
        let dropdownItem = dropdownItems[itemIndex];
        if (itemIndex === 0) {
          expect(dropdownItem.classList.contains('active')).toBe(true);
          continue;
        }
        expect(dropdownItem.classList.contains('active')).toBe(false);
      }

      done();
    });
  });

  it('Show correct highlight if `KEY_UP` was pressed at top of the list', (done) => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let dropdownItems = ele.getElementsByClassName('hio-dropdown-item');

      keyPress(38);

      for (let itemIndex = 0; itemIndex < dropdownItems.length; itemIndex++) {
        let dropdownItem = dropdownItems[itemIndex];
        if (itemIndex === 2) {
          expect(dropdownItem.classList.contains('active')).toBe(true);
          continue;
        }
        expect(dropdownItem.classList.contains('active')).toBe(false);
      }

      done();
    });
  });

  it('Show correct highlight if `KEY_DOWN` was pressed', (done) => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let dropdownItems = ele.getElementsByClassName('hio-dropdown-item');

      keyPress(40);

      for (let itemIndex = 0; itemIndex < dropdownItems.length; itemIndex++) {
        let dropdownItem = dropdownItems[itemIndex];
        if (itemIndex === 1) {
          expect(dropdownItem.classList.contains('active')).toBe(true);
          continue;
        }
        expect(dropdownItem.classList.contains('active')).toBe(false);
      }

      done();
    });
  });

  it('Show correct highlight if `KEY_DOWN` was pressed at bottom of the list', (done) => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let dropdownItems = ele.getElementsByClassName('hio-dropdown-item');

      keyPress(40);
      keyPress(40);
      keyPress(40);

      for (let itemIndex = 0; itemIndex < dropdownItems.length; itemIndex++) {
        let dropdownItem = dropdownItems[itemIndex];
        if (itemIndex === 0) {
          expect(dropdownItem.classList.contains('active')).toBe(true);
          continue;
        }
        expect(dropdownItem.classList.contains('active')).toBe(false);
      } 

      done();
    });
  });

  it('Should return correct commandId on `ENTER`', (done) => {
    component.create(bootstrap).then(() => {
      keyPress(38);
      keyPress(13);

      let vm = component.viewModel; 
      let commandId = vm.commandId;

      expect(commandId).toBe('changeToLightTheme');
      done();
    });
  });

  afterEach(() => {
    component.dispose();
  })

});