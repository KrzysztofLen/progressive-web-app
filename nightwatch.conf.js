const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CHROME_CANARY = "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary";

module.exports = {
  "src_folders" : ["e2e"],
  "output_folder" : "e2e",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : true,
    "host": "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./bin/chromedriver",
      "webdriver.gecko.driver" : "./bin/geckodriver"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost:3002/",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : true,
        "path" : "./e2e/screenshots/"
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "marionette": true,
        "acceptInsecureCerts": true
      }
    },

    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "marionette": true,
        "chromeOptions": {
          "args": [
            "--headless"
          ],
          "binary": CHROME
        }
      }
    },

    "edge" : {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge"
      }
    }
  }
};
