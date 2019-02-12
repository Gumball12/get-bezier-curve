/* loda modules */

require([
  env.cdn['async'],
  env.cdn['pixijs'],
  env.cdn['lodash'],

  env.cdn['Dot'],
  env.cdn['status']
], init);

let app;

let startPosition, dps;

function init (async, PIXI, _, Dot, status) {
  async.waterfall([
    pixiInit,
    createScene,

    createEvents,

    setTicker
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
      transparent: true
    });
  
    document.body.appendChild(app.view);

    // output target
    const outputTarget = document.createElement('p');
    
    const outputTargetButton = document.createElement('button');
    outputTargetButton.innerText = 'get bezier curve!';
    outputTargetButton.style = 'display: block;';

    outputTargetButton.addEventListener('click', () => {
      // solve position for use
      const output = _.reduce(dps, (r, dp, ind) => {
        r.push(..._.map(dp, _.parseInt));

        return r;
      }, []);

      outputTarget.innerText = `${_.map(startPosition, _.parseInt)}\n${_.chunk(output, 6).join('\n')}`;
    });

    document.body.appendChild(outputTargetButton);
    document.body.appendChild(outputTarget);
  
    cb();
  }

  /* handlers */

  function createEvents (cb) {
    app.view.addEventListener('pointerdown', evt => {
      if (status.getter('mode') === 'add') {
        const dot = new Dot({
          x: evt.x, y: evt.y,
          removeCallback () {
            app.stage.removeChild(this);
          }
        });
  
        app.stage.addChild(dot);
      }
    });

    cb();
  }

  function setTicker (cb) {
    const isDot = el => el instanceof Dot;

    const curve = new PIXI.Graphics();
    app.stage.addChild(curve);

    const line = new PIXI.Graphics();
    app.stage.addChild(line);

    app.ticker.add(() => {
      // solve position
      const dotsPosition = [];

      _.flowRight(
        _.curryRight(_.forEach)(el => dotsPosition.push(el.x, el.y)),
        _.filter
      )(app.stage.children, isDot);

      startPosition = _.slice(dotsPosition, 0, 2);
      dps = _.flowRight(
        _.curryRight(_.filter)(el => el.length === 6),
        _.curryRight(_.chunk, 2)(6),
        _.slice
      )(dotsPosition, 2);

      // draw curve
      curve.clear();
      curve.lineStyle(3, 0x000000);
      curve.moveTo(...startPosition);
      _.forEach(dps, dp => curve.bezierCurveTo(...dp));

      // draw line
      line.clear();
      line.lineStyle(1, 0x000000);
      line.moveTo(...startPosition);
      _.forEach(_.flowRight(_.curryRight(_.chunk, 2)(2), _.flattenDeep)(dps), dp => {
        line.lineTo(...dp);
      });
    });

    cb();
  }
}
