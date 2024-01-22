import { Center, Flex, hope } from "@hope-ui/solid";
import { useRoutes } from "@solidjs/router";
import { Component, Suspense, lazy } from 'solid-js';

import { routes } from '../constants/route';
import { HomePage, RedirectToHome } from "../pages/home";
import { NotFoundPage } from "../pages/notFound";
import { LoadingSpinner } from './core/loading';
import { Sidebar } from "./common/sidebar";

export const AppShell: Component = () => {
    const Routes = useRoutes([
        {
            path: routes.form.root.path,
            children: [
                { path: routes.form.builder.path, component: lazy(() => import("../pages/form/builder")) },
            ]
        },
        { path: routes.actualHome.path, component: HomePage },
        { path: routes.home.path, component: RedirectToHome },
        { path: "*", component: NotFoundPage }
    ]);

    return (
        <Flex maxH="100vh">
            <Sidebar />
            <hope.main w="$full" class="main" overflowY="auto">
                <Suspense fallback={
                    <Center width="100%" height="100vh">
                        <LoadingSpinner />
                    </Center>
                }>
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