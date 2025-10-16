export interface ICheckbox {
    id: number,
    name: string,
    checked: boolean | null,
    children?: ICheckbox[]
}  