const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const getBuildConfig = () => ({});

module.exports = (phase) => {
  const shouldAddBuildConfig =
    phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD;
  return shouldAddBuildConfig ? getBuildConfig() : {};
};
