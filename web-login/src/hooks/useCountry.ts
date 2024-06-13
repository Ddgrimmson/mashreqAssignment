import { useState } from "react"


const useCountry = () => {

    const [country, setCountry] = useState<string>('india');
    const onCountryValueChange = (value: string) => {
        setCountry(value)
    }

    return {country, onCountryValueChange}
}

export default useCountry