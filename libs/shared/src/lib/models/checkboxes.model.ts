export interface ICheckbox {
    id: number,
    name: string,
    checked: boolean,
    children?: ICheckbox[]
}  