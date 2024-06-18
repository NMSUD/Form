export interface IRouteOptions {
  path: string;
  title?: string;
  emoji?: string;
  sidebarPath?: string;
  showInSidebar: boolean;
  addDividerAbove?: boolean;
  comingSoon?: boolean;
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
    community: {
      path: '/community',
      sidebarPath: '/form/community',
      emoji: '🏰',
      title: 'Community',
      showInSidebar: true,
      comingSoon: false,
    },
    builder: {
      path: '/builder',
      sidebarPath: '/form/builder',
      emoji: '👷',
      title: 'Builder',
      showInSidebar: true,
      comingSoon: true,
    },
    planetBuild: {
      path: '/planetBuild',
      sidebarPath: '/form/planetBuild',
      emoji: '🧱',
      title: 'Planetary Base',
      showInSidebar: true,
      comingSoon: true,
    },
  },
  status: {
    path: '/status',
    pathWithParams: '/status/:segment/:id',
    sidebarPath: '/status',
    emoji: '🔍',
    title: 'View submission status',
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
      id: 'id',
      code: 'code',
      message: 'message',
      detail: 'detail',
    },
  },

  login: {
    path: '/login',
    showInSidebar: false,
  },
  bugReport: {
    path: '/bug',
    emoji: '🐛',
    title: 'Bug Report',
    showInSidebar: false,
  },
  about: {
    path: '/about',
    emoji: '❓',
    title: 'About us',
    showInSidebar: true,
  },
} as const;

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
