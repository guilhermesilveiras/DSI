export type InputType = {
    label: string,
    placeholder: string,
    value: string,
    error?: string,
    hide?: boolean,
    showPassword?: {
        showPassord: boolean,
        setShowPassord: (b: boolean) => void
    },
    setValue: (s: string) => void
    editable?: boolean
} 
