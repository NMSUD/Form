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
    version: 'version',
  },
};

export interface IApiSegment {
  community: string;
  builder: string;
  planetBase: string;
}

export const segmentLabels: IApiSegment = {
  community: 'Community',
  builder: 'Builder',
  planetBase: 'Build',
};

export const ApiStatusErrorCode = {
  validation: {
    code: 460,
    message: 'Validation failed for the data supplied',
  },
  segmentNotFound: {
    code: 461,
    message: 'Invalid segment provided',
  },
  decisionNotFound: {
    code: 462,
    message: 'Invalid decision provided',
  },
  recordNotFound: {
    code: 463,
    message: 'No records found for the provided id',
  },
  badCaptcha: {
    code: 520,
    message: 'Invalid captcha provided',
  },
  invalidFormFiles: {
    code: 521,
    message: 'Media attached to request was in the incorrect format',
  },
  invalidFormData: {
    code: 522,
    message: 'The formData of the request was invalid',
  },
  couldNotPersistData: {
    code: 523,
    message: 'Unable to save the data provided to the database',
  },
  calculatedCheckFailed: {
    code: 524,
    message: 'The provided check and calculated checks do not match',
  },
};
