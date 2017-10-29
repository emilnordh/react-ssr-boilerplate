export default regexp => {
  const files = Object.keys(require.cache);
  files.filter(filepath => regexp.test(filepath)).forEach(filepath => {
    delete require.cache[filepath];
  });
};
