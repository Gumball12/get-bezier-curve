/* loda modules */

require([
  env.cdn['async'],
  env.cdn['pixijs'],
  env.cdn['bezierjs'],

  env.cdn['Dot'],
  env.cdn['status']
], init);

let app;

let dots = [];

function init (async, PIXI, Bezier, Dot, status) {
  async.waterfall([
    pixiInit,
    createScene,

    createHelper,
    createEvents
  ], err => {
    if (err) {
      throw err;
    }

    console.log('initialized!');
  });
  
  /* init */
  
  function pixiInit (cb) {
    let type = 'WebGL';
  
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }
  
    type += ' // I\'ll always love you Darwin ❤️❤️❤️❤️';
  
    PIXI.utils.sayHello(type);
  
    cb();
  }
  
  function createScene (cb) {
    // init scene
    app = new PIXI.Application({
      width: 512, height: 512,
      antialias: true,
      backgroundColor: 0xffffff
    });

    app.view.style = 'border: 1px solid #000';
  
    document.body.appendChild(app.view);
  
    cb();
  }

  /* create objects */

  function createHelper (cb) {
    console.log(status);
    cb();
  }

  /* handlers */
  function createEvents (cb) {
    app.view.addEventListener('pointerdown', evt => {
      const dot = new Dot({
        x: evt.x, y: evt.y
      });

      app.stage.addChild(dot);
      dots.push(dot);
    });

    cb();
  }
}
