import { Swipe } from './swipe';

interface GesturePayload {
  swipe: Swipe;
  occuredNode?: Node;
}

export class SwipeGestureRecognizer {
  private touches: Touch[];
  private onSwipeCallback: (payload: GesturePayload) => void;

  static attach(target: Node): SwipeGestureRecognizer {
    const self = new SwipeGestureRecognizer();
    target.addEventListener('touchstart', (e: TouchEvent) => {
      self.touches = [];
      self.accumulateTouches(e);
    });
    target.addEventListener('touchmove', (e: TouchEvent) => {
      self.accumulateTouches(e);
    });
    target.addEventListener('touchend', (e: TouchEvent) => {
      self.accumulateTouches(e);
      const swipe = Swipe.fromTouches(self.touches);
      let occuredNode: Node = e.target instanceof Node ? <Node>e.target : null;
      self.onSwipeCallback({ swipe, occuredNode });
    });
    return self;
  }

  constructor() {
    this.touches = [];
    this.onSwipeCallback = () => {};
  }

  private accumulateTouches(e: TouchEvent): void {
    const l = e.changedTouches.length;
    for (let i = 0; i < l; i++) {
      this.touches.push(e.changedTouches[i]);
    }
  }

  on(eventName: string, cb: (payload: GesturePayload) => void) {
    this.onSwipeCallback = cb;
  }
}
