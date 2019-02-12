define([env.cdn['dat.gui']], dat => {
  const gui = new dat.GUI();

  const state = {
    mode: 'add'
  };

  const instances = {
    mode: gui.add(state, 'mode', ['add', 'move', 'delete']).onChange(mode => {
      console.log(mode);
    })
  };

  function mutation (name, value) {
    instances[name].setValue(value);
  }

  function getter (name) {
    return state[name];
  }

  return { GUI: gui, mutation, getter };
});
