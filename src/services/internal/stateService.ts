import { Container, Service } from 'typedi';

import { LocalStorageKey } from '@constants/site';
import { IDropdownOption } from '@contracts/dropdownOption';
import { debounceLeading } from '@helpers/debounceHelper';
import { IApiSegment } from '@constants/api';
import { getLocalStorage } from './localStorageService';

interface IState {
  submissions: {
    [prop in keyof IApiSegment]: Array<IDropdownOption>;
  };
}

@Service()
export class StateService {
  private _internalState: IState = {
    submissions: {
      community: [],
      builder: [],
    },
  };

  constructor() {
    const localInitialState = getLocalStorage().get<IState>(LocalStorageKey.main);
    if (localInitialState != null) {
      this._internalState = localInitialState;
    }
  }

  addSubmission(type: keyof IApiSegment, ddOption: IDropdownOption): void {
    this._internalState = {
      ...this._internalState,
      submissions: {
        ...this._internalState.submissions,
        [type]: [...this._internalState.submissions[type], ddOption],
      },
    };
    this.saveToLocalStorage(this._internalState);
  }

  getSubmissions(segment: keyof IApiSegment): Array<IDropdownOption> {
    return this._internalState.submissions[segment];
  }

  saveToLocalStorage = debounceLeading((newState: IState) => {
    getLocalStorage().set(LocalStorageKey.main, newState);
  }, 250);
}

export const getStateService = () => Container.get(StateService);
