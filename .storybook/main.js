const CircularDependencyPlugin = require("circular-dependency-plugin");
const path = require("path");
const fs = require("fs");

function getStorybookConfig({ tsconfig, stories }) {
  const addons = [
    {
      name: "@storybook/addon-docs",
      options: {
        actions: false,
        controls: false,
      },
    },
  ];

  return {
    stories,
    addons,
    webpackFinal(config) {
      config.module.rules.push(
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                configFile: tsconfig,
              },
            },
          ],
        },
        {
          test: /\.m\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]_[hash:8]",
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            "sass-loader",
          ],
        }
      );

      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /node_modules/,
        })
      );
      const packageJsonPath = path.resolve(__dirname, "../", "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
      if (packageJson.name) {
        config.resolve.alias[packageJson.name] = `src/index.ts`;
      }

      return config;
    },
  };
}

module.exports = getStorybookConfig({
  tsconfig: path.resolve(__dirname, "../tsconfig.stories.json"),
  stories: ["../stories/**/*.stories.tsx"],
});
