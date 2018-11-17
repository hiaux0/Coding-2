import {bindable} from 'aurelia-framework';
import paper from 'paper';
import './ts-svg.less'

const tool = new paper.Tool();

export class TsSvg {
  @bindable value = 'TsSvg';

  bind() {
    paper.setup(this.paperCanvas);
    // let path;
    // path = this.demo0(paper);
    // path = this.demo1(paper);
    // this.what(paper);
    // Create a new path once, when the script is executed:
    let myPath = new paper.Path();
    myPath.strokeColor = 'black';


    // This function is called whenever the user
    // clicks the mouse in the view:
    tool.onMouseDown = (event) => {
			// console.log("​TsSvg -> tool.onMouseDown -> event", event)
      // Add a segment to the path at the position of the mouse:
      myPath.add(event.point);
    }
  }

  what(paper) {
    var tool=new paper.Tool();
    var path;
    path=new paper.Path();
    // Define a mousedown and mousedrag handler
    tool.onMouseDown=function( event ) {
      path.strokeColor='black';
      path.add( event.point );
    };
    // path=new paper.Path();
    tool.onMouseDrag=function( event ) {
      path.add( event.point );
    };
    return {path,path};
  }

  demo0 (paper) {
    return new paper.Path.Circle( {
      center: paper.view.center,
      radius: 30,
      strokeColor: 'black'
    });
  }

  demo1 ( paper ) {
    var path=new paper.Path();
    path.strokeColor='black';
    path.add( new paper.Point( 30,75 ) );
    path.add( new paper.Point( 30,25 ) );
    path.add( new paper.Point( 80,25 ) );
    path.add( new paper.Point( 80,75 ) );
    path.closed=true;
    // Select the path, so we can see its handles:
    path.fullySelected=true;
    // Create a copy of the path and move it 100pt to the right:
    var copy=path.clone();
    copy.fullySelected=true;
    copy.position.x+=100;
    // Smooth the segments of the copy:
    copy.smooth();
    return path;
  }

}
