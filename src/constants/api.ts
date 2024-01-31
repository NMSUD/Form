export const apiParams = {
  verify: {
    decision: 'decision',
    segment: 'segment',
    id: 'id',
    check: 'check',
  },
  status: {
    segment: 'segment',
    id: 'id',
  },
};

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
      planetaryBase: 'form/planetaryBase',
    },
    verify: `verify/:${apiParams.verify.decision}/:${apiParams.verify.segment}/:${apiParams.verify.id}/:${apiParams.verify.check}`,
    status: `status/:${apiParams.status.segment}/:${apiParams.status.id}`,
  },
};

export const segments = {
  community: 'community',
  builder: 'builder',
  planetaryBase: 'planetaryBase',
};

export const ApiStatusErrorCode = {
  validation: 460,
  segmentNotFound: 461,
  decisionNotFound: 462,
  badCaptcha: 520,
  invalidFormData: 521,
  couldNotPersistData: 522,
};
