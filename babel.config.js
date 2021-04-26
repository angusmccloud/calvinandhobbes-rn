module.exports = {
  presets: ['module:metro-react-native-babel-preset', ["@babel/preset-env", { "targets": { "node": "current" } }]],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./app'],
        extensions: ['.tsx', '.ios.tsx', '.android.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          assets: './app/assets',
          components: './app/components',
          containers: './app/containers',
          environment: './app/environment',
          models: './app/models',
          services: './app/services',
          styles: './app/styles',
          utils: './app/utils',
          views: './app/views',
        },
      }
    ],
    'react-native-reanimated/plugin'
  ]
}