export type BaseEntity = {
    id: number
    [key: string]: any
}

export type DataKeys<T = any> = {
    keys: (keyof T)[]
    headers: string[]
}

export type ActionButton = {
    content: React.ReactNode
    action: (id: number) => void
}

export interface TableProps<T extends BaseEntity> {
    title: string
    data: T[]
    data_keys: DataKeys<T>
    actions?: ActionButton[]
    empty_message?: React.ReactNode
}