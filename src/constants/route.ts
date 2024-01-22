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
        root: {
            path: '/form',
            showInSidebar: false,
        },
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

    login: '/login',
    about: '/about',
}

export const removeAuthPrefix = (route: string) => route.replace('/auth', '');

export const traverseRoutes = (routeObj: any, routeFunc: (routeData: any) => void) => {
    for (const routeProp in routeObj) {
        if (isNaN(routeProp as any) === false) { continue }

        if (Object.prototype.hasOwnProperty.call(routeObj, routeProp)) {
            const routeData = (routeObj as any)[routeProp];

            routeFunc(routeData);

            if (routeObj.path == undefined) {
                traverseRoutes(routeData, routeFunc);
            }
        }
    }
}
