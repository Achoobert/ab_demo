const { defineConfig } = require("cypress");
module.exports = defineConfig({
   chromeWebSecurity: false,
   experimentalModifyObstructiveThirdPartyCode: true,
   defaultCommandTimeout: 12000,
   env: {
      stack: "demo_ab",
   },
   responseTimeout: 60000,
   video: false,
   experimentalWebKitSupport: true,
   // supportFile: false,
   e2e: {
      baseUrl: "http://localhost:8088/",
      excludeSpecPattern: [
         "**/test_cases/*.js",
         "**/test_setup/**",
         "**/test_setup/auth/**/*",
      ],
      specPattern: "cypress/e2e/**/*.js",
   },
});
