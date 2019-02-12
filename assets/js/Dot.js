define([
  env.cdn['pixijs'],
  env.cdn['status']
], (PIXI, status) => {
  class Dot extends PIXI.Graphics {
    constructor ({ x, y }) {
      super();

      const rad = 5;

      this.beginFill(0x000000);
      this.drawCircle(0, 0, rad);

      this.position.set(x - rad - rad / 2, y - rad - rad / 2);

      this.interactive = this.buttonMode = true;

      this.on('pointerdown', evt => {
        console.log(evt);
      });
    }
  };

  return Dot;
});
