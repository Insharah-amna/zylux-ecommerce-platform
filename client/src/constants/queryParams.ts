import {PAGINATION_LIMIT} from './generals';

export const QUERY_PARAMS = {
  category: {
    searchOptions: {
      search: '',
      searchKeys: ['name'],
    },
    pageOptions: {
      page: 1,
      limit: PAGINATION_LIMIT,
    },
    filters: {},
  },

  dashboardProducts: {
    searchOptions: {
      search: '',
      searchKeys: ['name'],
    },
    pageOptions: {
      page: 1,
      limit: PAGINATION_LIMIT,
    },
    filters: {},
  },

  homeProducts: {
    searchOptions: {},
    pageOptions: {
      page: 1,
      limit: 8,
    },
    filters: {},
  },

  shopProducts: {
    searchOptions: {
      search: '',
      searchKeys: [],
    },
    pageOptions: {
      page: 1,
      limit: 15,
    },
    filters: {
      minPrice: 0,
      maxPrice: 0,
      category: [],
    },
  },

  orders: {
    pageOptions: {
      page: 1,
      limit: 15,
    },
  },
};
