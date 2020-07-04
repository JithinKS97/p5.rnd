export default class DBox {
  constructor({
    x,
    y,
    s,
    drawInside,
    mousePressedInside = () => {},
    mousePressedOutside = () => {},
    fill,
  }) {
    this.x = x;
    this.y = y;
    this.s = s;

    this.isBeingDragged = false;

    _renderer.elt.addEventListener("mousedown", this.mousePressed);
    _renderer.elt.addEventListener("mouseup", this.mouseReleased);

    DBox.isAnyBeingDragged = false;

    this.fill = fill;

    // Special properties //

    this.drawInside = drawInside;
    this.isConstrained = false;
    this.isActive = false;
    this.isVisible = false;

    // Mouse press events

    this.mousePressedInside = mousePressedInside;
    this.mousePressedOutside = mousePressedOutside;
  }

  clearEventListeners = () => {
    _renderer.elt.removeEventListener("mousedown", this.mousePressed);
    _renderer.elt.removeEventListener("mouseup", this.mouseReleased);
  };

  keyPressed = (e) => {
    if (e.key === "Delete") {
      DBox.setIsAnyBeingDragged(false);
    }
  };

  mousePressed = () => {
    if (this.isMouseInsideBox()) {
      this.mousePressedInside();
      if (!DBox.canBeDragged()) {
        return;
      }
      this.isBeingDragged = true;
    } else {
      this.mousePressedOutside();
    }
  };

  mouseReleased = () => {
    this.isBeingDragged = false;
    DBox.setIsAnyBeingDragged(false);
  };

  display = () => {
    rectMode(CENTER);
    stroke(255);
    push();
    translate(this.x, this.y);
    this.drawContentInside();
    this.drawBox();
    pop();
  };

  drawBox = () => {
    if (this.isVisible) {
      if (this.fill) {
        fill(this.fill);
      } else {
        noFill();
      }
      strokeWeight(2);
      square(0, 0, this.s);
    }
  };

  drawContentInside() {
    if (this.drawInside) {
      push();
      this.drawInside({ s: this.s });
      pop();
    }
  }

  drag = () => {
    if (this.isBeingDragged) {
      this.x += mouseX - pmouseX;
      if (this.isConstrained) {
        this.y += mouseX - pmouseX;
      } else {
        this.y += mouseY - pmouseY;
      }
    }
  };

  isMouseInsideBox = () => {
    return this.isPtInside(mouseX, mouseY);
  };

  isPtInside = (x, y) => {
    return (
      x < this.x + this.s / 2 &&
      x > this.x - this.s / 2 &&
      y < this.y + this.s / 2 &&
      y > this.y - this.s / 2
    );
  };

  setConstraint = (isConstrained) => {
    this.isConstrained = isConstrained;
  };

  setPos = ({ x, y }) => {
    this.x = x;
    this.y = y;
  };

  setSize = (s) => {
    this.s = s;
  };

  getPos = () => {
    return [this.x, this.y];
  };

  getSize = () => {
    return this.s;
  };

  setVisible = (isVisible) => {
    this.isVisible = isVisible;
  };

  ////////////////////////////////////
  ///////// Static methods //////////
  //////////////////////////////////

  static canBeDragged = () => {
    if (DBox.isAnyBeingDragged) {
      return false;
    } else {
      DBox.setIsAnyBeingDragged(true);
      return true;
    }
  };

  static setIsAnyBeingDragged = (isAnyDragging) => {
    DBox.isAnyBeingDragged = isAnyDragging;
  };
}
