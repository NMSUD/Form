const rangeIds = {
    ease: 'ease',
    automation: 'automation',
    verify: 'verify',
    manage: 'manage-submissions',
    simple: 'simple',
    cheap: 'cheap',
}

const ranges = [
    {
        id: rangeIds.ease,
        name: '👤 Easy to submit',
        tooltipText: 'How easy it is to submit bases/etc. Less friction to upload should result in more uploads',
        value: 10
    },
    {
        id: rangeIds.automation,
        name: '🤖 Automation',
        value: 8
    },
    {
        id: rangeIds.verify,
        name: '🔍 Verify submissions',
        tooltipText: 'Checking of submissions & uploads to ensure no hate speech or malicious content makes it into the public',
        value: 7
    },
    {
        id: rangeIds.manage,
        name: '💽 Management of data',
        tooltipText: 'Changing text and updating uploads, editing db tables, db table relationships, etc',
        value: 6
    },
    {
        id: rangeIds.simple,
        name: '🐣 Low complexity',
        tooltipText: 'Better for maintenance and the project could be repeated by different people next year if needed',
        value: 5
    },
    {
        id: rangeIds.cheap,
        name: '💰 Low Cost',
        value: 4
    },
];

const renderRanges = () => {
    const rangeContainerElem = document.getElementById('goals');
    for (const range of ranges) {
        const label = document.createElement('label');
        label.for = range.id;

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('goal-topic');
        labelSpan.innerHTML = range.name;

        if (range.tooltipText != null) {
            labelSpan.dataset.placement = 'right';
            labelSpan.dataset.tooltip = range.tooltipText;
        }
        label.appendChild(labelSpan);
        rangeContainerElem.appendChild(label);

        const inputRange = document.createElement('input');
        inputRange.id = range.id;
        inputRange.name = 'range';
        inputRange.type = 'range';
        inputRange.min = 1;
        inputRange.max = 10;
        inputRange.value = range.value;
        rangeContainerElem.appendChild(inputRange);
    }
}

const calculateStorageSpace = () => {
    const availableElem = document.getElementById('storage-available');
    const totalUploadsElem = document.getElementById('storage-total-uploads');
    const maxUploadElem = document.getElementById('storage-max-upload-size');

    const maxUsagePerPerson = totalUploadsElem.value * maxUploadElem.value;

    const people = (availableElem.value * 1024) / maxUsagePerPerson;
    const numPeopleElem = document.getElementById('storage-num-people');
    numPeopleElem.innerText = Math.round(people);
}

renderRanges();
calculateStorageSpace();