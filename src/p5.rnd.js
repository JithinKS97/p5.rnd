import DBox from "./p5.dbox";

class RndBox {
  constructor({ x, y, s, drawInside, mousePressed }) {
    this.rBox = new DBox({ x: x + s / 2, y: y + s / 2, s: 12, fill: 255 });
    this.dBox = new DBox({
      x,
      y,
      s,
      drawInside,
      mousePressedInside: this.dBoxMousePressedInside,
      mousePressedOutside: this.dBoxMousePressedOutside,
    });

    this.rBox.setConstraint(true);

    this.dragCalled = false;
    this.resizeCalled = false;

    this.mousePressed = mousePressed;
  }

  dBoxMousePressedInside = () => {
    if (this.mousePressed) {
      this.mousePressed();
    }
    this.dBox.setVisible(true);
    this.rBox.setVisible(true);
  };

  dBoxMousePressedOutside = () => {
    if (!this.rBox.isMouseInsideBox()) {
      this.dBox.setVisible(false);
      this.rBox.setVisible(false);
    }
  };

  display() {
    this.dBox.display();
    if (this.resizeCalled) {
      this.rBox.display();
    }
  }

  drag() {
    this.dragCalled = true;
    this.dragDBox();
  }

  resize() {
    this.resizeCalled = true;
    this.dragRBox();
  }

  dragDBox() {
    if (this.dragCalled) {
      this.dBox.drag();
      if (this.dBox.isBeingDragged) {
        this.rBox.setPos({
          x: this.dBox.x + this.dBox.s / 2,
          y: this.dBox.y + this.dBox.s / 2,
        });
      }
    }
  }

  dragRBox() {
    if (this.resizeCalled) {
      this.rBox.drag();
      if (this.rBox.isBeingDragged) {
        this.dBox.setSideLength({
          s: 2 * (this.rBox.x - this.dBox.x),
        });
      }
    }
  }

  isSelected = () => {
    return this.dBox.isVisible;
  };

  clearEvents() {
    this.rBox.clearEventListeners();
    this.dBox.clearEventListeners();
  }

  getPos() {
    return [this.dBox.x, this.dBox.y];
  }

  setPos({ x, y }) {
    this.dBox.setPos({ x, y });
  }

  getSize() {
    return this.dBox.s;
  }

  isDragged() {
    return this.dBox.isBeingDragged;
  }
}

p5.prototype.RndBox = RndBox;
