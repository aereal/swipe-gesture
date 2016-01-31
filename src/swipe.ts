export enum Axis {
  Horizontal,
  Vertical
}

enum HorizontalDirection {
  Left  = 2 << 1,
  Right = 2 << 2,
}

enum VerticalDirection {
  Up   = 3 << 1,
  Down = 3 << 2,
}

type Direction = HorizontalDirection | VerticalDirection;

export class Swipe {
  private touches: Touch[];

  static fromTouches(touches: Touch[]): Swipe {
    let self = new Swipe();
    self.touches = touches;
    return self;
  }

  get horizontalDistance(): number {
    const from: Touch = this.touches[0];
    const to: Touch = this.touches[this.touches.length - 1];

    return Math.abs(from.clientX - to.clientX);
  }

  get verticalDistance(): number {
    const from: Touch = this.touches[0];
    const to: Touch = this.touches[this.touches.length - 1];

    return Math.abs(from.clientY - to.clientY);
  }

  get horizontalDirection(): HorizontalDirection {
    const from: Touch = this.touches[0];
    const to: Touch = this.touches[this.touches.length - 1];

    return from.clientX > to.clientX ? HorizontalDirection.Left : HorizontalDirection.Right;
  }

  get verticalDirection(): VerticalDirection {
    const from: Touch = this.touches[0];
    const to: Touch = this.touches[this.touches.length - 1];

    return from.clientY > to.clientY ? VerticalDirection.Up : VerticalDirection.Down;
  }

  get axis(): Axis {
    return this.horizontalDistance > this.verticalDistance ? Axis.Horizontal : Axis.Vertical;
  }

  get direction(): Direction {
    return this.horizontalDistance > this.verticalDistance ? this.horizontalDirection : this.verticalDirection;
  }
}
