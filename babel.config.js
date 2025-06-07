module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  // Ignore TypeScript files for now
  ignore: [
    '**/*.ts',
    '**/*.tsx',
  ],
};