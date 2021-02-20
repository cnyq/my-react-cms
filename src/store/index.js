const modulesFiles = require.context('./modules', true, /\.js$/);
const store = {}

modulesFiles.keys().forEach((modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  store[moduleName] = value.default;
  return store
}, {});

export default store