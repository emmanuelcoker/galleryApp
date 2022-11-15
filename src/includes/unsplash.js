const configuration = {
  access_key: "j-g8EyJm7urGWjcgWBQDK2Iu_cgcVm9zKojQSt6QQXM",
  secret_key: "MM67KM1z4NoB8qhoin5uj0MTfElH3zK4a43q-GNYR40",
  order_by: "latest",
  per_page: 20,
  page: 1,
  photo_url: "https://api.unsplash.com/photos/",
  search_url: "https://api.unsplash.com/search/photos",
};

const photos_configuration = {
  urlWithAccessKey: (url) => {
    return (
      url +
      "?client_id=" +
      configuration.access_key +
      "&page=" +
      configuration.page +
      "&per_page=" +
      configuration.per_page
    );
  },

  getUrl: () => {
    return photos_configuration.urlWithAccessKey(configuration.photo_url);
  },
  //search by id
  search: (id) => {
    return (
      configuration.photo_url + id + "?client_id=" + configuration.access_key
    );
  },

  //search by query
  searchByQuery: (query) => {
    return (
      configuration.search_url +
      "?client_id=" +
      configuration.access_key +
      "&query=" +
      query +
      "&page=" +
      configuration.page +
      "&per_page=" +
      configuration.per_page
    );
  },
};

export { photos_configuration, configuration };
