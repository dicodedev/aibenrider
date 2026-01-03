export default ({ config }) => ({
  ...config,
  name: "AibenRider",
  slug: "aibenrider",
  extra: {
    ...config?.extra,
    API_URL: process.env.API_URL || "https://api.aibenmart.com/api",
    eas: {
      projectId: "c8b79991-04e1-4e3c-89c5-fffb3866860b",
    },
  },
});
