// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

// If using .ts instead of .mjs, you can use the following comment to suppress the error
// @ts-expect-error - No type definitions available for anchor-pki
const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {};

export default withAutoCert(nextConfig);
