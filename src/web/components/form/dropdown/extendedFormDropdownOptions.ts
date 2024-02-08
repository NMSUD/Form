import { IApiSegment } from '@constants/api';
import { AppImage } from '@constants/image';
import { IDropdownOption } from '@contracts/dropdownOption';
import { ResultWithValue } from '@contracts/resultWithValue';
import { getStateService } from '@services/internal/stateService';
import { getNmsUdJsonFileService } from '@services/json/nmsudJsonFileService';

export const extendedFormDropdownOptions = async <T>(
  segment: keyof IApiSegment,
  mapper: (item: T) => IDropdownOption,
): Promise<ResultWithValue<Array<IDropdownOption>>> => {
  const result = await getNmsUdJsonFileService().getListOf<T>(segment);
  if (result.isSuccess === false) return { ...result, value: [] };

  const optsFromApi = result.value.map(mapper).sort((a, b) => a.title.localeCompare(b.title));
  const optsFromApiValues = optsFromApi.map((oa) => oa.value);
  const localOpts = getStateService()
    .getSubmissions(segment)
    .filter((sub) => optsFromApiValues.includes(sub.value) === false) // remove api items
    .sort((a, b) => a.title.localeCompare(b.title));

  let opts: Array<IDropdownOption> = [];
  if (localOpts.length > 0) {
    opts = [
      {
        title: 'Your submissions:',
        disabled: true,
        value: '-',
      },
      ...localOpts.map((l) => ({
        ...l,
        title: `${l.title} (Pending approval)`,
        image: l.image ?? AppImage.fallbackImg,
      })),
      {
        title: '',
        disabled: true,
        value: '--',
      },
    ];
  }

  if (optsFromApi.length > 0) {
    opts = [
      ...opts,
      {
        title: 'Approved submissions:',
        disabled: true,
        value: '---',
      },
      ...optsFromApi,
    ];
  }

  return {
    isSuccess: true,
    errorMessage: '',
    value: opts,
  };
};
