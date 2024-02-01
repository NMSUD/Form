export interface IRouteOptions {
  path: string;
  title?: string;
  sidebarPath?: string;
  showInSidebar: boolean;
  addDividerAbove?: boolean;
}

export const routes = {
  home: {
    path: '/',
    showInSidebar: false,
  },
  actualHome: {
    path: '/home',
    showInSidebar: false,
  },
  authPrefix: {
    path: '/auth',
    showInSidebar: false,
  },
  form: {
    path: '/form',
    showInSidebar: false,
    builder: {
      path: '/builder',
      sidebarPath: '/form/builder',
      title: '👤 Builder',
      showInSidebar: true,
    },
    community: {
      path: '/community',
      sidebarPath: '/form/community',
      title: '🏘️ Community',
      showInSidebar: true,
    },
    base: {
      path: '/base',
      sidebarPath: '/form/base',
      title: '🏡 Planetary Base',
      showInSidebar: true,
    },
  },
  status: {
    path: '/status',
    pathWithParams: '/status/:segment/:id',
    sidebarPath: '/status',
    title: '🔍 View Status',
    addDividerAbove: true,
    showInSidebar: true,
    pathParam: {
      segment: 'segment',
      id: 'id',
    },
  },
  verify: {
    path: 'verify',
    showInSidebar: false,
    queryParam: {
      decision: 'decision',
    },
  },

  login: {
    path: '/login',
    showInSidebar: false,
  },
  about: {
    path: '/about',
    showInSidebar: false,
  },
};

export const removeAuthPrefix = (route: string) => route.replace('/auth', '');

export const traverseRoutes = (routeObj: any, routeFunc: (routeData: IRouteOptions) => void) => {
  for (const routeProp in routeObj) {
    if (isNaN(Number(routeProp)) === false) continue;

    if (Object.prototype.hasOwnProperty.call(routeObj, routeProp)) {
      const routeData = routeObj[routeProp];

      if (routeData.path != null) {
        routeFunc(routeData);
      }

      if (routeObj.path == undefined) {
        traverseRoutes(routeData, routeFunc);
      }
    }
  }
};
