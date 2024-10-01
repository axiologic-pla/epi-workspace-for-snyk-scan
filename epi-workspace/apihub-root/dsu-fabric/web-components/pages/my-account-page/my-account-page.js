import {changeSidebarFromURL, copyToClipboard} from "../../../utils/utils.js";

const openDSU = require("opendsu");
const config = openDSU.loadAPI("config");
const scAPI = openDSU.loadAPI("sc");

export class MyAccountPage {
  constructor(element, invalidate) {
    this.invalidate = invalidate;

    this.did = "";
    this.envData = {"in-progress": "Environment data is being read..."};
    this.appVersion = "version data is loading...";

    this.invalidate(async () => {
      await this.fetchAccountData();
    });
  }

  beforeRender() {
  }

  afterRender() {
    changeSidebarFromURL();
    this.renderSettingsContainer();
  }

  async copyText() {
    copyToClipboard(this.did)
  }

  downloadDebug() {
    try {
      let logData = JSON.parse($$.memoryLogger.dump());
      let formattedJSON = JSON.stringify(logData, null, 4);
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(formattedJSON);
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "debugLog.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (err) {
      webSkel.notificationHandler.reportUserRelevantError("Something went wrong on download.", err);
    }
    return;
  }

  getAppBuildVersion(str) {
    //the purpose of regex is to extract the json part from
    const regex = /{[\s\S]*}/gm;

    let matches;
    while ((matches = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matches.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      if (matches.length) {
        //found it...
        let envJSON = matches[0];
        try {
          envJSON = JSON.parse(envJSON);
        } catch (err) {
          console.log("Failed to properly parse environment file for app version extraction. Switching to fallback method");
          continue;
        }
        return envJSON["appBuildVersion"];
      }
    }

    //this code should not be reached... but I'll let it here for fallback for the moment.
    let appBuildVersionText = str.split(",").find(item => item.includes("appBuildVersion"));
    let version = appBuildVersionText.split(":")[1];
    version = version.trim();
    if (version.indexOf("}") !== -1) {
      version = version.replaceAll("}", "");
    }
    return version;
  }

  renderSettingsContainer() {
    const environmentContainer = document.querySelector('#environmentContainer');
    let environmentDataElement = environmentContainer.querySelector('#environmentData');
    if (environmentDataElement) {
      environmentDataElement.remove();
    }
    environmentDataElement = document.createElement('div');
    environmentDataElement.id = "environmentData";
    environmentDataElement.language = "json";
    environmentDataElement.innerHTML = `<pre><code>${JSON.stringify(this.envData, null, 4)}</code></pre>`;
    environmentContainer.appendChild(environmentDataElement);
  }


  async fetchAccountData() {
    try {
      let did = await scAPI.getMainDIDAsync();
      this.did = did;

      let envFile = await $$.promisify(config.readEnvFile)();
      //hide keySSI properties from display in ui
      delete envFile["enclaveKeySSI"];
      delete envFile["sharedEnclaveKeySSI"];
      //---------- get app version from server env file
      delete envFile["appBuildVersion"];
      const environmentJsPath = new URL("environment.js", window.top.location);
      const response = await fetch(environmentJsPath);
      const appEnvContent = await response.text();
      this.envData = envFile;
      this.appVersion = this.getAppBuildVersion(appEnvContent);
    } catch (err) {
      webSkel.notificationHandler.reportUserRelevantError("Failed to get wallet data", err);
    }
  }
}