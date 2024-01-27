import { Component, createSignal } from 'solid-js';

import { Card } from '../../components/common/card';
import { PageHeader } from '../../components/common/pageHeader';
import { FormDropdown } from '../../components/form/dropdown';
import { FormBuilder } from '../../components/form/formBuilder';
import { GridItemSize } from '../../components/form/grid';
import { FormProfileImageInput } from '../../components/form/image';
import { FormLongInput, FormTextArea } from '../../components/form/input';
import { FormSocialInput } from '../../components/form/social';
import { Labels } from '../../constants/labels';
import { funnyPlayerNames } from '../../constants/names';
import { IDropdownOption } from '../../contracts/dropdownOption';
import { CommunityDto, CommunityDtoValidation, communityBioMaxLength, communityContactDetailsMaxLength } from '../../contracts/dto/forms/communityDto';
import { randomItemFromArray } from '../../helper/randomHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { getFormApiService } from '../../services/api/formApiService';
import { getStateService } from '../../services/internal/stateService';

export const CommunityFormPage: Component = () => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<CommunityDto>({
        profilePic: '',
        bioMediaUrls: [],
        ...anyObject,
    });

    return (
        <>
            <PageHeader text="Submit a community"></PageHeader>

            <Card class="form">
                <FormBuilder
                    item={itemBeingEdited()}
                    id="CommunityDto"
                    formDtoMeta={CommunityDtoValidation}
                    mappings={{
                        profilePicFile: {
                            component: FormProfileImageInput,
                            gridItemColumnSize: GridItemSize.smol,
                            gridItemRowSize: GridItemSize.smol,
                        },
                        name: {
                            component: FormLongInput,
                            gridItemColumnSize: GridItemSize.medium,
                            placeholder: randomItemFromArray(funnyPlayerNames),
                        },
                        tags: {
                            component: FormDropdown,
                            gridItemColumnSize: GridItemSize.long,
                            placeholder: 'Select your tags',
                            additional: {
                                options: (_) => Labels.Community.map(lbl => ({ title: lbl, value: lbl })),
                                multiple: (_) => true,
                            },
                        },
                        socials: {
                            component: FormSocialInput,
                            gridItemColumnSize: GridItemSize.medium,
                            placeholder: 'https://youtube.com/...',
                        },
                        bioMediaFiles: {
                            component: FormSocialInput,
                            gridItemColumnSize: GridItemSize.small,
                            placeholder: 'Upload your images',
                        },
                        bio: {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
                            placeholder: 'Hi, my name is ...',
                            additional:
                            {
                                displayTextLength: (_) => true,
                                maxTextLength: (_) => communityBioMaxLength,
                            },
                        },
                        contactDetails: {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
                            placeholder: 'Email, Discord, etc',
                            additional:
                            {
                                displayTextLength: (_) => true,
                                maxTextLength: (_) => communityContactDetailsMaxLength,
                            },
                        },
                    }}
                    updateObject={(item: CommunityDto) => setItemBeingEdited(_ => item)}
                    updateProperty={(prop: string, value: string) => {
                        console.log('create', { prop, value })
                        setItemBeingEdited(prev => ({ ...prev, [prop]: value }));
                    }}
                    submit={async (item: CommunityDto, captcha: string) => {
                        const apiResult = await getFormApiService().submitCommunity(item, captcha);
                        if (apiResult.isSuccess === false) return apiResult;

                        const dropDownOpt: IDropdownOption = {
                            title: item.name,
                            value: apiResult.value.id,
                            image: apiResult.value.iconUrl,
                        }
                        getStateService().addSubmission('builder', dropDownOpt);
                        return apiResult;
                    }}
                />
            </Card>
        </>
    );
};

export default CommunityFormPage;