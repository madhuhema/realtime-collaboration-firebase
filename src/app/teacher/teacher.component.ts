import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DbService, Draw } from '../shared/services/db.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements AfterViewInit {

  // a reference to the canvas element from our template
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400; 
  private cx: CanvasRenderingContext2D;
  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.initialize();
  }

  constructor(private dbService: DbService) { }

  initialize() {
    this.dbService.get()
    .subscribe((res: [Draw, Draw]) => {
      console.log('teacher', res);
      this.drawOnCanvas(res[0], res[1]);
    })
  }

  private drawOnCanvas(
    prevPos: Draw,
    currentPos: Draw
  ) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
}
