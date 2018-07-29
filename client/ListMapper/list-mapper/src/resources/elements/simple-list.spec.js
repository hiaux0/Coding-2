import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('SIMPLE LIST', function() {
  let component;
  let bindObject; 
  beforeEach(function(){ 
    component = StageComponent
      .withResources('simple-list')
      .inView('<simple-list></simple-list>')
      .boundTo(bindObject)
  })   

  it('Should render simple list with items', function() {
    
    expect(1).to(2)
  })
})