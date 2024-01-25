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
        }
    }
}

export const ApiStatusErrorCode = {
    validation: 460,
    badCaptcha: 520,
    invalidFormData: 521,
    couldNotPersistData: 522,
}