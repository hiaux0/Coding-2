//https://stackoverflow.com/questions/32444454/testing-a-class-with-a-bindable-field-in-aurelia

import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('CE -- input-dropdown --' , () => {
  let component;
  let bindData = {
    simpleCommandList: [
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
    showCommandPalett: true,
    key: 'name',
    commandId: null,
  };

  beforeEach(() => {
    window.DEBUG_MODE = {
      commandPalett: true,
    }
    
    component = StageComponent
      .withResources(
        PLATFORM.moduleName('resources/common/elements/input-dropdown'),
        PLATFORM.moduleName('resources/attributes/autocomplete'),
      )
      .inView(`
        <input-dropdown
          command-list.bind="simpleCommandList" 
          show-command-palett.bind="showCommandPalett"
          key.bind="key"
          command-id.two-way="commandId"
        >
        </input-dropdown>
      `)
      .boundTo(bindData);
  });

  /**
   * Note that the below unit tests only checks if we get something if the users types into the component, the actual autocomplete is tested in its seperate test file `autocomplete.spec.js`
   */
  it('Should show something when user types in the input', (done) => {
    component.boundTo(bindData);
    component.create(bootstrap).then(() => {
      
      setTimeout(() => {
        let ele = component.element;
        let hioDropdownItem = ele.getElementsByClassName('hio-dropdown-item')
        let ddListLen = hioDropdownItem.length

        expect(ddListLen).toBe(2)
        done();
      }, 200)
    });
  });

  xit('Should not show anything if `key` has no match', (done) => {
    component.boundTo({...bindData, key: 'nothing'});
    component.create(bootstrap).then(() => {
      let t = () => {}
      expect(t).toThrow('s')
    });
  });

  // it('Should receive the correct `commandId`', () =>{
  //   component.create(bootstrap).then(() => {
  //     // TODO
  //     expect(0).toBe(2);
  //   })
  // })

  it('Focus input if input-dropdown appears', (done) => {
    component.create(bootstrap).then(() => {
      let ele = component.element;
      let input = ele.getElementsByTagName('input')[0];

      expect(input).toBe(document.activeElement)
      done();
    });
  });

  it('Not Focus input if `showCommandPalett` is false', (done) => {
    component.create(bootstrap).then(() => {
      component.viewModel.showCommandPalett = false;

      setTimeout(() => {
        let ele = component.element;
        let input = ele.getElementsByTagName('input')[0];

        expect(input).not.toBe(document.activeElement)
        done();
      }, 100);
    });
  });

  afterEach(() => {
    component.dispose();
  })
});
