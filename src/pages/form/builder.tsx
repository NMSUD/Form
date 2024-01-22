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
import { BuilderDto } from '../../contracts/dto/forms/builderDto';
import { nameof } from '../../helper/propHelper';
import { randomItemFromArray } from '../../helper/randomHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { BuilderDtoValidation } from '../../contracts/validation/dto/builderDtoValidation';

export const BuilderFormPage: Component = () => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<BuilderDto>(anyObject);

    return (
        <>
            <PageHeader text="Submit a builder profile"></PageHeader>

            <Card>
                <FormBuilder
                    item={itemBeingEdited()}
                    id="builder"
                    validatorObj={BuilderDtoValidation}
                    mappings={[
                        {
                            component: FormProfileImageInput,
                            gridItemColumnSize: GridItemSize.smol,
                            gridItemRowSize: GridItemSize.smol,
                            property: nameof<BuilderDto>('profilePic'),
                            label: 'Profile picture',
                        },
                        {
                            component: FormLongInput,
                            gridItemColumnSize: GridItemSize.medium,
                            property: nameof<BuilderDto>('name'),
                            label: 'Name',
                            placeholder: randomItemFromArray(funnyPlayerNames),
                        },
                        {
                            component: FormDropdown,
                            gridItemColumnSize: GridItemSize.long,
                            property: nameof<BuilderDto>('labels'),
                            label: 'Labels',
                            placeholder: 'Select your labels',
                            additional: [
                                {
                                    prop: 'options',
                                    value: (_) => Labels.Builders.map(lbl => ({ title: lbl, value: lbl })),
                                },
                                {
                                    prop: 'multiple',
                                    value: (_) => true
                                },
                            ],
                        },
                        {
                            component: FormSocialInput,
                            gridItemColumnSize: GridItemSize.medium,
                            property: nameof<BuilderDto>('socials'),
                            label: 'Socials',
                            placeholder: 'https://youtube.com/...',
                        },
                        {
                            component: PlatformTypeDropdown,
                            gridItemColumnSize: GridItemSize.small,
                            property: nameof<BuilderDto>('platforms'),
                            label: 'Platforms',
                            placeholder: 'Select your platforms',
                            additional: [
                                {
                                    prop: 'multiple',
                                    value: (_) => true
                                },
                            ],
                        },
                        {
                            component: FormTextArea,
                            gridItemColumnSize: GridItemSize.full,
                            property: nameof<BuilderDto>('bio'),
                            label: 'Bio',
                            placeholder: 'Hi, my name is ...',
                            additional: [
                                {
                                    prop: 'displayTextLength',
                                    value: (_) => true
                                },
                                {
                                    prop: 'maxTextLength',
                                    value: (_) => 500
                                },
                            ],
                        },
                    ]}
                    updateObject={(item: BuilderDto) => setItemBeingEdited(_ => item)}
                    updateProperty={(prop: string, value: string) => {
                        console.log('create', { prop, value })
                        setItemBeingEdited(prev => ({ ...prev, [prop]: value }));
                    }}
                />
            </Card>
        </>
    );
};

export default BuilderFormPage;