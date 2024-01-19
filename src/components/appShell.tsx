import { Center, Flex, hope } from "@hope-ui/solid";
import { Component, lazy, Suspense } from 'solid-js';

import { LoadingSpinner } from './core/loading';

const FormPage = lazy(() => import("../pages/formPage"));

export const AppShell: Component = () => {

    return (
        <Flex maxH="100vh">
            <hope.main w="$full" px="3em" overflowY="auto">
                <Suspense fallback={
                    <Center width="100%" height="100vh">
                        <LoadingSpinner />
                    </Center>
                }>
                    <FormPage />

                    {/* <Footer /> */}
                </Suspense>
            </hope.main>
        </Flex>
    );
};