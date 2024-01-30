import { JSX } from "solid-js"

export type IModalContentRendererProps<T> = {
    [prop in keyof T]: (val: any) => JSX.Element
}