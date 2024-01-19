import { useState } from "react"

export default function useStateWithValidation(initialState: string = ''):[string, (target: HTMLInputElement)=>void, boolean, (target: HTMLInputElement)=>void] {
    const [state, setState] = useState<string>(initialState)
    const [isValid, setIsValid] = useState<boolean>(true)

    const checkValidity = (target: HTMLInputElement) => {
        setIsValid(target.validity.valid)
    }
    
    const onChange = (target: HTMLInputElement) => {
        setState(target.value)
        setIsValid(target.validity.valid)
    }

    return [state, onChange, isValid, checkValidity]
}