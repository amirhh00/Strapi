export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const disabledGraphQlApis = [
      "api::order.order",
      "api::customer.customer",
      "api::order-item.order-item",
      "api::product.product",
      "api::sample.sample",
      "api::sample-follow-up.sample-follow-up",
    ];
    disabledGraphQlApis.forEach((apiStr) => {
      strapi
        .plugin("graphql")
        .service("extension")
        .shadowCRUD(apiStr)
        .disable();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
