import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'rhvec802',
    dataset: 'production',
  },
  // Hostname for the Sanity-hosted Studio → https://forexdrilling.sanity.studio
  studioHost: 'forexdrilling',
  deployment: {
    appId: 't4e5bmp478o0tarewrrfjok1',
  },
});
