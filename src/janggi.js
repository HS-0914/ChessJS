import Module from "ffish-es6";
let ffish = null;

ffish = new Module().then((loadedModule) => {
  ffish = loadedModule;
  console.log(`initialized ${ffish} ${loadedModule}`);
});
