import { Dispatch, SetStateAction } from "react"

export interface ISelect {
    title: string
    selected: string
    options: Array<string>
    setSelected: Dispatch<SetStateAction<string>>
    setFlag: Dispatch<SetStateAction<boolean>>
}

export interface ILabel {
    error: boolean
    title: string
    selected: string
    setSelected: Dispatch<SetStateAction<string>>
    options: string[]
    children?: React.ReactNode
    setFlag: Dispatch<SetStateAction<boolean>>
}

export interface ICalendar {
    activeCalendar: boolean
    setActiveCalendar: Dispatch<SetStateAction<boolean>>
    setGetDate: Dispatch<SetStateAction<any>>
}
