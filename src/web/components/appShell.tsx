import { Center, Flex, hope } from '@hope-ui/solid';
import { useRoutes } from '@solidjs/router';
import { Component, Suspense, lazy } from 'solid-js';
import Container from 'typedi';

import { AppType } from '@constants/enum/appType';
import { routes } from '@constants/route';
import { HomePage, RedirectToHome } from '@web/pages/home';
import { NotFoundPage } from '@web/pages/notFound';
import { APP_TYPE } from '@services/internal/configService';
import { Sidebar } from '@web/components/common/sidebar';
import { LoadingSpinner } from '@web/components/core/loading';

export const AppShell: Component = () => {
  Container.set(APP_TYPE, AppType.UI);

  const Routes = useRoutes([
    {
      path: routes.form.path,
      children: [
        {
          path: routes.form.builder.path,
          component: lazy(() => import('@web/pages/form/builder')),
        },
        {
          path: routes.form.community.path,
          component: lazy(() => import('@web/pages/form/community')),
        },
      ],
    },
    {
      path: routes.status.path,
      component: lazy(() => import('@web/pages/status/status')),
    },
    {
      path: routes.status.pathWithParams,
      component: lazy(() => import('@web/pages/status/status')),
    },
    { path: routes.verify.path, component: HomePage },
    { path: routes.about.path, component: lazy(() => import('@web/pages/about')) },
    { path: routes.actualHome.path, component: HomePage },
    { path: routes.home.path, component: RedirectToHome },
    { path: '*', component: NotFoundPage },
  ]);

  return (
    <Flex maxH="100vh">
      <Sidebar />
      <hope.main w="$full" class="main" overflowY="auto">
        <Suspense
          fallback={
            <Center width="100%" height="100vh">
              <LoadingSpinner />
            </Center>
          }
        >
          <Routes />
          {/* <Routes>

                        <Route path={routes.form} component={lazy(() => import("../pages/form"))} />
                        <Route path={routes.actualHome} component={HomePage} />
                        <Route path={routes.home} component={RedirectToHome} />
                        <Route path={"*"} component={NotFoundPage} />
                    </Routes> */}

          {/* <Footer /> */}
        </Suspense>
      </hope.main>
    </Flex>
  );
};
