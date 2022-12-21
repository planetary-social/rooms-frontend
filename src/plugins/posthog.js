//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app, options) {
    app.config.globalProperties.$posthog = posthog.init(
      "phc_WGxyEqUxYhM1SePQGdjrxBoDgcv9qIYlkwusMFS6MK1",
      {
        api_host: "https://app.posthog.com'",
      }
    );
  },
};