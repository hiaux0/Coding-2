import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('ENABLE-ZOOMING', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('resources/attributes/enable-zooming'))
      .inView(`
        <div
          class="zoom-handler"
          enable-zooming="
            context: .zoom-container;
            velocity: 1
          "
        >
          <div class="zoom-container"></div>
        </div>
      `)
  });

  it('Should pass creation process', done => {
    component.create(bootstrap).then(() => {
      done();

    }).catch(e => console.log(e.toString()));
  });

  it('Should bind values correctly', done => {
    component.create(bootstrap)
    .then(() => {
      let viewModel = component.viewModel;
      expect(viewModel.context).toBe('.zoom-container');
      expect(viewModel.velocity).toBe("1");
      // ^ `"1"` is a bit strange, because I bound to `1`, a number, but the
      // test expects a string
      done();
    })
    .catch(e => console.log(e.toString()));
  });

  describe('zoom', () => {
    const mockEvent = {
      deltaY: 1,
      preventDefault: () => {}
    }

    it('Should call preventDefault', done => {
      component.create(bootstrap)
      .then(() => {
        let viewModel = component.viewModel;
        spyOn(mockEvent, 'preventDefault');

        viewModel.zoom(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        done();
      })
      .catch(e => console.log(e.toString()));
    });

    it('Should call setZoom with -1 when zooming in', done => {
      component.create(bootstrap)
      .then(() => {
        let viewModel = component.viewModel;
        mockEvent.deltaY = 1;
        spyOn(viewModel, 'setZoom');

        viewModel.zoom(mockEvent);
        expect(viewModel.setZoom).toHaveBeenCalledWith(-1);
        done();
      })
      .catch(e => console.log(e.toString()));
    });

    it('Should call setZoom with 1 when zooming out', done => {
      component.create(bootstrap)
      .then(() => {
        let viewModel = component.viewModel;
        mockEvent.deltaY = -1;
        spyOn(viewModel, 'setZoom');

        viewModel.zoom(mockEvent);
        expect(viewModel.setZoom).toHaveBeenCalledWith(1);
        done();
      })
      .catch(e => console.log(e.toString()));
    });
  });

  describe('setZoom', () => {
    it('Should set styles correctly for `contextElement`', done => {
      component.create(bootstrap).then(() => {
        let viewModel = component.viewModel;
        let zoomDirection = 2;
        viewModel.velocity = 3;
        viewModel.currentZoomValue = 4;

        let zoomLevel = 2 * 3 + 4;
        let scale = zoomLevel;
        let translate = zoomLevel;
        let newZoom = `matrix(${scale}, 0, 0, ${scale}, ${translate}, ${translate})`;

        viewModel.setZoom(zoomDirection);
        expect(viewModel.contextElement.style.transform).toBe(newZoom);
        done();

      }).catch(e => console.log(e.toString()));
    });

    it('Should set `currentZoomValue` correctly', done => {
      component.create(bootstrap).then(() => {
        let viewModel = component.viewModel;
        let zoomDirection = 2;
        viewModel.velocity = 3;
        viewModel.currentZoomValue = 4;

        let expected = 2 * 3 + 4;

        viewModel.setZoom(zoomDirection);
        expect(viewModel.currentZoomValue).toBe(expected);
        done();

      }).catch(e => console.log(e.toString()));
    });
  });

  it('Should bind values correctly', done => {
    component.create(bootstrap).then(() => {

      done();

    }).catch(e => console.log(e.toString()));
  });

  afterEach(() => {
    component.dispose();
  });
});
