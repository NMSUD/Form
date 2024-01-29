import { Container, Service } from "typedi";

import { LocalStorageKey } from "../../constants/site";
import { IDropdownOption } from "../../contracts/dropdownOption";
import { debounceLeading } from "../../helper/debounceHelper";
import { getLocalStorage } from "./localStorageService";

interface ISubmissionState {
    community: Array<IDropdownOption>;
    builder: Array<IDropdownOption>;
    baseBuild: Array<IDropdownOption>;
}
interface IState {
    submissions: ISubmissionState;
}

@Service()
export class StateService {
    private _internalState: IState = {
        submissions: {
            community: [],
            builder: [],
            baseBuild: [],
        }
    };

    constructor() {
        const localInitialState = getLocalStorage().get<IState>(LocalStorageKey.main);
        if (localInitialState != null) {
            this._internalState = localInitialState;
        }
    }

    addSubmission(type: keyof ISubmissionState, ddOption: IDropdownOption): void {
        this.saveToLocalStorage({
            ...this._internalState,
            submissions: {
                ...this._internalState.submissions,
                [type]: [...this._internalState.submissions[type], ddOption],
            }
        });
    }

    saveToLocalStorage = debounceLeading((newState: IState) => {
        getLocalStorage().set(LocalStorageKey.main, newState);
    }, 250);
}

export const getStateService = () => Container.get(StateService);
