module.exports = {
  streams: [
    {
      name: 'vertex',
      size: 2,
    },
    {
      name: 'texcoord',
      size: 2,
    },
    {
      name: 'diffuse',
      size: 4,
    },
  ],
  passes: [
    {
      vs: require('./baseWithTexture.vertex.shader'),
      fs: require('./baseWithTexture.fragment.shader'),
    },
  ],
};
