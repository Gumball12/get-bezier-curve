define([env.cdn['dat.gui']], dat => {
  const gui = new dat.GUI();

  const inputFile = document.createElement('input');
  inputFile.style = 'display: none;';
  inputFile.type = 'file';
  inputFile.accept = 'image/*';

  inputFile.addEventListener('change', () => {
    if (inputFile.files.length === 0) {
      return;
    }

    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', evt => {
      if (evt.target.readyState === FileReader.DONE) {
        const target = document.querySelector('canvas');
        target.style = `background-image: url(${evt.target.result});`;
      }
    });

    const blob = file.slice(0, file.size);
    reader.readAsDataURL(blob);
  });

  // state and methods
  const state = {
    mode: 'add'
  };

  const methods = {
    changeBackground () {
      inputFile.click();
    }
  }

  // instances
  const instances = {
    mode: gui.add(state, 'mode', ['add', 'move', 'remove']).onChange(mode => {
      console.log(mode);
    }),
    changeBackground: gui.add(methods, 'changeBackground').name('change background')
  };

  // tools
  function mutation (name, value) {
    instances[name].setValue(value);
  }

  function getter (name) {
    return state[name];
  }

  return { GUI: gui, mutation, getter };
});
