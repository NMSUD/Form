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
    status: {
        path: '/status',
        pathWithParams: '/status/:segment/:id',
        sidebarPath: '/status',
        title: '🔍 View Status',
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

    login: '/login',
    about: '/about',
}

export const removeAuthPrefix = (route: string) => route.replace('/auth', '');

export const traverseRoutes = (routeObj: any, routeFunc: (routeData: any) => void) => {
    for (const routeProp in routeObj) {
        if (isNaN(routeProp as any) === false) continue;

        if (Object.prototype.hasOwnProperty.call(routeObj, routeProp)) {
            const routeData = routeObj[routeProp];

            if ((routeData as any).path != null) {
                routeFunc(routeData);
            }

            if (routeObj.path == undefined) {
                traverseRoutes(routeData, routeFunc);
            }
        }
    }
}
