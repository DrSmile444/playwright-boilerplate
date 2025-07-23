import pluginSecurity from 'eslint-plugin-security';

// eslint-plugin-security
// ESLint rules for Node Security
// This project will help identify potential security hotspots,
// but finds a lot of false positives which need triage by a human.
export default [pluginSecurity.configs.recommended];
