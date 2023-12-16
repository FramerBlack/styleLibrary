// Variable Fonts for Framer : Free Version
// SNTNL Components
// Production
// 2023.12.12
import { Frame, addPropertyControls, ControlType } from "framer"
import React, { useEffect, useState } from "react"
import { backGroundColorChangeContent } from "https://framer.com/m/backgroundColorChange-mwlk.js"

/**
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 3000
 *
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
function SNTNL_backGroundColorTransition(props) {
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentDomain, setCurrentDomain] = useState("")

    const allowedDomains = [
        ".framer.website",
        // ".framer.ai",
        ".framer.app",
        // ".framer.photos",
        // ".framer.media",
        // ".framer.wiki",
        ".framercanvas.com",
        // ".framer.media",
        // ".framer.com",
        ".framerusercontent.com",
    ]

    useEffect(() => {
        if (!props.isLicensingEnabled) {
            console.log("Licensing is not enabled.")
            setIsValid(true)
            setIsLoading(false)
            return
        }

        setCurrentDomain(window.location.hostname)
        console.log("Current domain is: ", currentDomain)

        const isDomainValid = allowedDomains.some((domain) =>
            currentDomain.endsWith(domain)
        )
        console.log("Is domain valid: ", isDomainValid)

        setTimeout(() => {
            setIsValid(isDomainValid)
            setIsLoading(false)
        }, 0)
    }, [props.isLicensingEnabled, currentDomain])

    if (isLoading) {
        return (
            <div
                style={{
                    color: "white",
                    fontSize: "0.75rem",
                    textAlign: "center",
                    maxWidth: "450px",
                    userSelect: "none",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingTop: "45%",
                }}
            >
                Loading...
            </div>
        )
    }
    if (!isValid) {
        return <div></div>
    }
    return (
        <div
            style={{
                rowGap: "40px",
                fontSize: "1rem",
                textAlign: "center",
                userSelect: "none",
            }}
        >
            <SNTNL_backGroundColorTransition
                {...SNTNL_backGroundColorTransition}
            />
        </div>
    )
}
SNTNL_backGroundColorTransition.defaultProps = {
    isLicensingEnabled: true,
    onToggleLicensing: () => {},
}

addPropertyControls(SNTNL_backGroundColorTransition, {
    onToggleLicensing: {
        type: ControlType.EventHandler,
    },
    startColor: {
        type: ControlType.Color,
        title: "Start Color",
        defaultValue: "#ffffff",
    },
    endColor: {
        type: ControlType.Color,
        title: "End Color",
        defaultValue: "#555555",
    },
    children: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
        //  maxCount: 10,
    },
    rowGap: {
        type: ControlType.Number,
        title: "Row Gap",
        defaultValue: 10,
        min: 0,
        max: 500,
        unit: "px",
    },
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        defaultValue: "row",
        options: ["row", "column"],
    },
    justifyContent: {
        type: ControlType.Enum,
        title: "Horizontal Alignment",
        defaultValue: "flex-start",
        options: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
        ],
    },
    alignment: {
        type: ControlType.Enum,
        title: "Vertical Alignment",
        defaultValue: "flex-start",
        options: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
        ],
    },
})

export default SNTNL_backGroundColorTransition
