import { Component, createSignal } from 'solid-js';

import { Card } from '../../components/common/card';
import { PageHeader } from '../../components/common/pageHeader';
import { FormDropdown } from '../../components/form/dropdown';
import { FormBuilder } from '../../components/form/formBuilder';
import { GridItemSize } from '../../components/form/grid';
import { FormProfileImageInput } from '../../components/form/image';
import { FormLongInput, FormTextArea } from '../../components/form/input';
import { PlatformTypeDropdown } from '../../components/form/platformTypeDropdown';
import { FormSocialInput } from '../../components/form/social';
import { Labels } from '../../constants/labels';
import { funnyPlayerNames } from '../../constants/names';
import { BuilderDto, BuilderDtoValidation, builderBioMaxLength, builderContactDetailsMaxLength } from '../../contracts/dto/forms/builderDto';
import { randomItemFromArray } from '../../helper/randomHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { getFormApiService } from '../../services/api/formApiService';

export const BuilderFormPage: Component = () => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<BuilderDto>(anyObject);

    return (
        <>
            <PageHeader text="Submit a builder profile"></PageHeader>

            <Card>
                <FormBuilder
                    item={itemBeingEdited()}
                    id="builder"
                    validationObj={BuilderDtoValidation}
                    mappings={{
                        profilePic: {
                            component: FormProfileImageInput,
                            gridItemColumnSize: GridItemSize.smol,
                            gridItemRowSize: GridItemSize.smol,
                            label: 'Profile picture',
                        },
                        name: {
                            component: FormLongInput,
                            gridItemColumnSize: GridItemSize.medium,
                            label: 'Name',
                            placeholder: randomItemFromArray(funnyPlayerNames),
                        },
                        labels: {
                            component: FormDropdown,
                            gridItemColumnSize: GridItemSize.long,
                            label: 'Labels',
                            placeholder: 'Select your labels',
                            additional: {
                                options: (_) => Labels.Builders.map(lbl => ({ title: lbl, value: lbl })),
                                multiple: (_) => true,
                            },
                        },
                        socials: {
                            component: FormSocialInput,
                            gridItemColumnSize: GridItemSize.medium,
                            label: 'Socials',
                            placeholder: 'https://youtube.com/...',
                        },
                        platforms: {
                            component: PlatformTypeDropdown,
                            gridItemColumnSize: GridItemSize.small,
                            label: 'Platforms',
                            placeholder: 'Select your platforms',
                            additional: {
                                multiple: (_) => true,
                            },
                        },
                        bio: {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
                            label: 'Bio',
                            placeholder: 'Hi, my name is ...',
                            additional:
                            {
                                displayTextLength: (_) => true,
                                maxTextLength: (_) => builderBioMaxLength,
                            },
                        },
                        contactDetails: {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
                            label: 'Contact details',
                            placeholder: 'Email, Discord, etc',
                            additional:
                            {
                                displayTextLength: (_) => true,
                                maxTextLength: (_) => builderContactDetailsMaxLength,
                            },
                        },
                    }}
                    updateObject={(item: BuilderDto) => setItemBeingEdited(_ => item)}
                    updateProperty={(prop: string, value: string) => {
                        console.log('create', { prop, value })
                        setItemBeingEdited(prev => ({ ...prev, [prop]: value }));
                    }}
                    submit={getFormApiService().submitBuilder}
                />
            </Card>
        </>
    );
};

export default BuilderFormPage;