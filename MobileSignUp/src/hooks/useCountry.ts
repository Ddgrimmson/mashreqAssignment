import { useState } from "react"
import { useTheme } from "../ThemeContext";

const useCountry = () => {

    const [country, setCountry] = useState<string>('india');
    const {setThemeName} = useTheme()
    const onCountryValueChange = (value: string) => {
        setCountry(value)
        setThemeName(value)
    }

    return {country, onCountryValueChange}
}

export default useCountry