import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('SIMPLE LIST', function() {
  let component;
  let bindObject = {
    listData: [
      {
        "content": "A",
        "position": 0,
        "htmlElement": {}
      },
      {
        "content": "B",
        "position": 1,
        "htmlElement": {}
      },
      {
        "content": "C",
        "position": 2,
        "htmlElement": {}
      },
    ]
  }
  beforeEach(() => { 
    component = StageComponent
      .withResources(PLATFORM.moduleName('resources/elements/simple-list'))
      .inView(`
        <simple-list list-data.bind='listData'>
        </simple-list>`
      )
      .boundTo(bindObject)
  });  

  it('sortAscending should set variable correctly', (done) => {
    component.create(bootstrap).then(() => {
      let vm = component.viewModel;
      vm.sortAscending();
      expect(vm.direction).toBe('ascending')

      done();
    });
  });

  it('sortDescending should set variable correctly', (done) => {
    component.create(bootstrap).then(() => {
      let vm = component.viewModel;
      vm.sortDescending();
      expect(vm.direction).toBe('descending')

      done();
    });
  });

  it('Should get changes after user drag drop ended', (done) => {
    component.create(bootstrap).then(() => {
      let expectation = [
        { content: "C 2", position: 0, },
        { content: "B 1", position: 1, },
        { content: "A 0", position: 2, },
      ];
      let vm = component.viewModel;
      let direction = vm.direction;

      if (direction === 'descending') {
        let newListData = vm.getDragDropChanges();

        for (let listItemIndex in newListData) {
          let actualContent = newListData[listItemIndex].content;
          let expectedContent = expectation[listItemIndex].content;
          expect(actualContent).toBe(expectedContent);

          let actualPosition = newListData[listItemIndex].position;
          let expectedPosition = expectation[listItemIndex].position;
          expect(actualPosition).toBe(expectedPosition);
        }
      }
      done();
    }) 
  })
})

/**
 * sortAscending
 * getDragDropChanges 
 * sortDescending
 */