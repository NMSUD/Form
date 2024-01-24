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

            <Card class="form">
                <FormBuilder
                    item={itemBeingEdited()}
                    id="builder"
                    formDtoMeta={BuilderDtoValidation}
                    mappings={{
                        profilePic: {
                            component: FormProfileImageInput,
                            gridItemColumnSize: GridItemSize.smol,
                            gridItemRowSize: GridItemSize.smol,
                        },
                        name: {
                            component: FormLongInput,
                            gridItemColumnSize: GridItemSize.medium,
                            placeholder: randomItemFromArray(funnyPlayerNames),
                        },
                        labels: {
                            component: FormDropdown,
                            gridItemColumnSize: GridItemSize.long,
                            placeholder: 'Select your labels',
                            additional: {
                                options: (_) => Labels.Builders.map(lbl => ({ title: lbl, value: lbl })),
                                multiple: (_) => true,
                            },
                        },
                        socials: {
                            component: FormSocialInput,
                            gridItemColumnSize: GridItemSize.medium,
                            placeholder: 'https://youtube.com/...',
                        },
                        platforms: {
                            component: PlatformTypeDropdown,
                            gridItemColumnSize: GridItemSize.small,
                            placeholder: 'Select your platforms',
                            additional: {
                                multiple: (_) => true,
                            },
                        },
                        bio: {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
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