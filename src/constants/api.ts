export const apiParams = {
  form: {
    segment: 'segment',
  },
  verify: {
    id: 'id',
    check: 'check',
    decision: 'decision',
    segment: 'segment',
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
    form: `form/:${apiParams.form.segment}/`,
    verify: `verify/:${apiParams.verify.segment}/:${apiParams.verify.decision}/:${apiParams.verify.id}/:${apiParams.verify.check}`,
    status: `status/:${apiParams.verify.segment}/:${apiParams.status.id}`,
  },
};

export interface IApiSegment {
  community: string;
  builder: string;
  // planetaryBase: string;
}

export const segmentLabels: IApiSegment = {
  community: 'Community',
  builder: 'Builder',
};

export const ApiStatusErrorCode = {
  validation: 460,
  segmentNotFound: 461,
  decisionNotFound: 462,
  recordNotFound: 463,
  badCaptcha: 520,
  invalidFormData: 521,
  couldNotPersistData: 522,
  calculatedCheckFailed: 523,
};
