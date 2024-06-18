import { Center, Flex, hope } from '@hope-ui/solid';
import { useRoutes } from '@solidjs/router';
import { Component, Suspense, lazy } from 'solid-js';
import Container from 'typedi';

import { AppType } from '@constants/enum/appType';
import { routes } from '@constants/route';
import { APP_TYPE } from '@services/internal/configService';
import { getDocumentServ } from '@services/internal/documentService';
import { Sidebar } from '@web/components/common/sidebar';
import { LoadingSpinner } from '@web/components/core/loading';
import { HomePage, RedirectToHome } from '@web/pages/home';
import { NotFoundPage } from '@web/pages/notFound';
import { DebugNode } from './core/debugNode';

const lazyBuilder = lazy(() => import('@web/pages/form/builder'));
const lazyCommunity = lazy(() => import('@web/pages/form/community'));
const lazyPlanetBuild = lazy(() => import('@web/pages/form/planetBuild'));
const lazyStatus = lazy(() => import('@web/pages/status/status'));
const lazyBugReport = lazy(() => import('@web/pages/bug/bugReport'));
const lazyAbout = lazy(() => import('@web/pages/about'));

export const AppShell: Component = () => {
  Container.set(APP_TYPE, AppType.UI);
  getDocumentServ().addVideoBackground();

  const Routes = useRoutes([
    {
      path: routes.form.path,
      children: [
        { path: routes.form.builder.path, component: lazyBuilder },
        { path: routes.form.community.path, component: lazyCommunity },
        { path: routes.form.planetBuild.path, component: lazyPlanetBuild },
      ],
    },
    { path: routes.status.path, component: lazyStatus },
    { path: routes.status.pathWithParams, component: lazyStatus },
    { path: routes.verify.path, component: HomePage },
    { path: routes.bugReport.path, component: lazyBugReport },
    { path: routes.about.path, component: lazyAbout },
    { path: routes.actualHome.path, component: HomePage },
    { path: routes.home.path, component: RedirectToHome },
    { path: '*', component: NotFoundPage },
  ]);

  return (
    <Flex maxH="100vh">
      <DebugNode name="AppShell" />
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
