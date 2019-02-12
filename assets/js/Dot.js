define([
  env.cdn['pixijs'],
  env.cdn['status']
], (PIXI, status) => {
  class Dot extends PIXI.Graphics {
    constructor ({ x, y, removeCallback }) {
      super();

      const rad = 5;

      this.beginFill(0x000000);
      this.alpha = 0.6;
      this.drawCircle(0, 0, rad);

      this.position.set(x - rad - rad / 2, y - rad - rad / 2);

      this.removeCallback = removeCallback;

      this.interactive = this.buttonMode = true;

      this.on('pointerdown', handleDragStart)
        .on('pointerup', handleDragEnd)
        .on('pointerupoutside', handleDragEnd)
        .on('pointermove', handleDragMove)
        .on('pointerover', handleOver)
        .on('pointerout', handleOut);
    }
  };

  function handleDragStart () {
    this.dragging = true;

    if (status.getter('mode') === 'remove') {
      this.removeCallback();
    }
  }

  function handleDragEnd () {
    this.dragging = false;
  }

  function handleDragMove (evt) {
    if (status.getter('mode') === 'move' && this.dragging === true) {
      const newPosition = evt.data.getLocalPosition(this.parent);

      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }

  function handleOver () {
    const mode = status.getter('mode');
    if (mode === 'move' || mode === 'remove') {
      this.alpha = 0.9;
    }
  }

  function handleOut () {
    const mode = status.getter('mode');
    if (mode === 'move' || mode === 'remove') {
      this.alpha = 0.6;
    }
  }

  return Dot;
});
