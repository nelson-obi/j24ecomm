import { useState } from "react";

function useAlert () {
    const [ alertInfo, setAlertInfo ] = useState({
        type: null,
        message: "",
        show: false,
    })

    const showAndHide = (type, message) => {
        console.log("ShowAndHide:", type, message )
        setAlertInfo({ show: true, type, message})
        setTimeout(() => {
            setAlertInfo((prev) => ({ ...prev, show: false }))
        }, 5000)
    }
    return { showAndHide, alertInfo }

}

export default useAlert;