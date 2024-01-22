export const onTargetValue = (funcOnEvent: (result: string) => void) => (event: any) => {
    const value = event.target?.value;
    if (value == null) return;

    funcOnEvent(value);
}