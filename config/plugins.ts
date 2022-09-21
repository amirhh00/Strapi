export default ({ env }) => {
  const plugins: any = {
    "users-permissions": {
      config: {
        jwtSecret: env("JWT_SECRET"),
      },
    },
    graphql: {
      enabled: env("NODE_ENV") === "development",
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
          tracing: env("NODE_ENV") === "development",
          introspection: env("NODE_ENV") === "development",
        },
      },
    },
    "entity-relationship-chart": {
      enabled: true,
      config: {
        // By default all contentTypes and components are included.
        // To exlclude strapi's internal models, use:
        exclude: [
          "strapi::core-store",
          "webhook",
          "admin::permission",
          "admin::user",
          "admin::role",
          "admin::api-token",
          "plugin::upload.file",
          "plugin::i18n.locale",
          "plugin::users-permissions.permission",
          "plugin::users-permissions.role",
        ],
      },
    },
    reports: {
      enabled: true,
      resolve: "./src/plugins/reports",
    },
  };

  const useCloudinary = typeof env("CLOUDINARY_NAME") === "string";
  if (useCloudinary) {
    plugins.upload = {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    };
  }

  return plugins;
};
