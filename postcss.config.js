module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          [
            'postcss-preset-env',
            {
              features: {
                'custom-media-queries': true,
                'custom-selectors': true,
              },
            },
          ],
        ]
      : [
          // No transformations in development
        ],
};
