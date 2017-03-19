module.exports = {
  streams: [
    {
      name: 'vertex',
      size: 2
    },
    null,
    {
      name: 'diffuse',
      size: 4
    },
  ],
  passes: [
    {
      vs: require('./base.vertex.shader'),
      fs: require('./base.fragment.shader'),
    },
  ],
};
