export const apiParams = {
  general: {
    segment: 'segment',
  },
  verify: {
    id: 'id',
    check: 'check',
    decision: 'decision',
  },
  status: {
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
    form: `form/:${apiParams.general.segment}/`,
    verify: `verify/:${apiParams.general.segment}/:${apiParams.verify.decision}/:${apiParams.verify.id}/:${apiParams.verify.check}`,
    status: `status/:${apiParams.general.segment}/:${apiParams.status.id}`,
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
  invalidFormFiles: 521,
  invalidFormData: 522,
  couldNotPersistData: 523,
  calculatedCheckFailed: 524,
};
