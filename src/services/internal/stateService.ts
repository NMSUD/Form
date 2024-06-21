import { Container, Service } from 'typedi';

import { IApiSegment } from '@constants/api';
import { LocalStorageKey } from '@constants/site';
import { IDropdownOption } from '@contracts/dropdownOption';
import { debounceLeading } from '@helpers/debounceHelper';
import { getLocalStorage } from './localStorageService';
import { anyObject } from '@helpers/typescriptHacks';
import { uuidv4 } from '@helpers/guidHelper';
import { getConfig } from './configService';

interface IState {
  isSideBarOpen: boolean;
  anonymousUserGuid: string;
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
    isSideBarOpen: true,
    anonymousUserGuid: '',
    submissions: {
      community: [],
      builder: [],
      planetBuild: [],
    },
    form: {
      community: null,
      builder: null,
      planetBuild: null,
    },
  };

  constructor() {
    const localInitialState = getLocalStorage().get<IState>(LocalStorageKey.main);
    if (localInitialState != null) {
      let anonymousUserGuid =
        (localInitialState.anonymousUserGuid?.length ?? 0) > 1
          ? localInitialState.anonymousUserGuid
          : uuidv4();

      this._internalState = {
        ...localInitialState,
        anonymousUserGuid,
      };
    }

    if (!getConfig().isProd()) {
      this._internalState.anonymousUserGuid = 'DEV';
    }
  }

  saveToLocalStorage = debounceLeading((newState: IState) => {
    getLocalStorage().set(LocalStorageKey.main, newState);
  }, 250);

  setIsSidebarOpen(isOpen: boolean): void {
    this._internalState = {
      ...this._internalState,
      isSideBarOpen: isOpen,
    };
    this.saveToLocalStorage(this._internalState);
  }

  getIsSidebarOpen(): boolean {
    return this._internalState?.isSideBarOpen ?? true;
  }

  getAnonymousUserGuid = (): string => {
    if ((this._internalState?.anonymousUserGuid?.length ?? 0) < 3) {
      this._internalState.anonymousUserGuid = uuidv4();
      this.saveToLocalStorage(this._internalState);
    }
    return this._internalState.anonymousUserGuid;
  };

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
