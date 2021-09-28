export const mockCommon = () => {
  return {
    $route: {
      path: '',
      query: {
        quickCheck: false,
      },
      params: {},
    },
    $t: (key: string) => key,
    $messaging: {
      sendWarning: () => {},
    },
    $router: {
      currentRoute: {
        path: 'test',
      },
    },
  };
};
