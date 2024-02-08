import { Container, Service } from 'typedi';

import { IApiSegment } from '@constants/api';
import { LocalStorageKey } from '@constants/site';
import { IDropdownOption } from '@contracts/dropdownOption';
import { debounceLeading } from '@helpers/debounceHelper';
import { getLocalStorage } from './localStorageService';
import { anyObject } from '@helpers/typescriptHacks';

interface IState {
  submissions: {
    [prop in keyof IApiSegment]: Array<IDropdownOption>;
  };
  form: {
    [prop in keyof IApiSegment]: null | unknown;
  };
}

@Service()
export class StateService {
  private _internalState: IState = {
    submissions: {
      community: [],
      builder: [],
    },
    form: {
      community: null,
      builder: null,
    },
  };

  constructor() {
    const localInitialState = getLocalStorage().get<IState>(LocalStorageKey.main);
    if (localInitialState != null) {
      this._internalState = localInitialState;
    }
  }

  saveToLocalStorage = debounceLeading((newState: IState) => {
    getLocalStorage().set(LocalStorageKey.main, newState);
  }, 250);

  addSubmission(segment: keyof IApiSegment, ddOption: IDropdownOption): void {
    this._internalState = {
      ...this._internalState,
      submissions: {
        ...this._internalState.submissions,
        [segment]: [...this._internalState.submissions[segment], ddOption],
      },
    };
    this.saveToLocalStorage(this._internalState);
  }

  getSubmissions(segment: keyof IApiSegment): Array<IDropdownOption> {
    return this._internalState?.submissions?.[segment] ?? [];
  }

  delSubmission(segment: keyof IApiSegment, id: string): void {
    this._internalState = {
      ...this._internalState,
      submissions: {
        ...this._internalState.submissions,
        [segment]: this._internalState.submissions[segment].filter((s) => s.value != id),
      },
    };
    this.saveToLocalStorage(this._internalState);
  }

  getForm<T>(segment: keyof IApiSegment): T {
    return (this._internalState?.form?.[segment] as T) ?? anyObject;
  }
  setForm<T>(segment: keyof IApiSegment, newValue: T): void {
    this._internalState = {
      ...this._internalState,
      form: {
        ...this._internalState.form,
        [segment]: newValue,
      },
    };
    this.saveToLocalStorage(this._internalState);
  }
}

export const getStateService = () => Container.get(StateService);
