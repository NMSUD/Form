export const apiParams = {
    verify: {
        decision: 'decision',
        segment: 'segment',
        id: 'id',
        check: 'check',
    }
}

export const api = {
    captcha: {
        header: 'Captcha',
    },
    routes: {
        image: {
            upload: '',
        },
        form: {
            community: 'form/community',
            builder: 'form/builder',
            baseBuild: 'form/baseBuild',
        },
        verify: `verify/:${apiParams.verify.decision}/:${apiParams.verify.segment}/:${apiParams.verify.id}/:${apiParams.verify.check}`,
    }
}

export const verifySegments = {
    community: 'community',
    builder: 'builder',
    baseBuild: 'baseBuild',
}

export const ApiStatusErrorCode = {
    validation: 460,
    segmentNotFound: 461,
    badCaptcha: 520,
    invalidFormData: 521,
    couldNotPersistData: 522,
}
