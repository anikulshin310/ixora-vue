const API_ROUTES = {
  AUTO: '/auto',
  MODEL: (id: number) => `/model/${id}`,
  MODIFICATIONS: (id: number) => `/modif/${id}`,
  MODIFICATION_PARAMS: (id: number) => `/param/${id}`,
};

export default API_ROUTES;
