export const onTargetValue = (funcOnEvent: (result: string) => void) => (event: any) => {
    const value = event.target?.value;
    if (value == null) return;

    funcOnEvent(value);
}

export const onTargetFile = (
    funcOnEvent: (file: File) => void
) => (event: any) => {
    const fileList = event.target.files;
    if (fileList == null || fileList.length < 1) return;

    funcOnEvent(fileList[0]);
}