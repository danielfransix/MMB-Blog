// babel.config.js
module.exports = {
  presets: ["next/babel"],
  plugins: [
    // This is the new, correct plugin reference
    ["@locator/babel-jsx/dist", {
      env: "development"
    }]
  ]
};