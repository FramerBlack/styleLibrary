import { Frame, addPropertyControls, ControlType } from "framer"
import React, { useEffect, useState } from "react"
import { VariableFontTextBox } from "https://framer.com/m/Cursor-Variable-Formatted-TextBox-01-1-kWih.js"
import { fontStore as r } from "framer"

import { useState, useEffect } from 'react';

function SNTNL_Components_LicensingComponent_VariableFontsFree(props) {
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentDomain, setCurrentDomain] = useState("")

    const allowedDomains = [
        ".framer.website",
        ".framer.ai",
        ".framer.app",
        ".framer.photos",
        ".framer.media",
        // ".framer.wiki",
        ".framercanvas.com",
        ".framer.media",
        //".framer.com",
        ".framerusercontent.com",
    ]

    r.loadWebFontsFromSelectors(["Roboto Slab"])

    const css = [
        `.framer-I6GXf .framer-styles-preset-1uchgzi:not(.rich-text-wrapper), .framer-I6GXf .framer-styles-preset-1uchgzi.rich-text-wrapper h3 {
    font-variation-settings: 'wdth' var(--framer-font-width), 'wght' var(--framer-font-weight);
    --framer-font-family: "Inter var", "Inter", sans-serif;
    --framer-font-width: 100;
    --framer-font-weight: 400;
    --framer-font-size: 36px;
    --framer-letter-spacing: 0em;
    --framer-line-height: 1.4em;
    --framer-paragraph-spacing: 40px;
    --framer-text-alignment: start;
    --framer-text-color: #333333;
    --framer-text-transform: none;
    user-select:none;
  }`,
        // Responsive styles for medium screens
        `@media (max-width: 1199px) and (min-width: 810px) {
    .framer-I6GXf .framer-styles-preset-1uchgzi:not(.rich-text-wrapper), .framer-I6GXf .framer-styles-preset-1uchgzi.rich-text-wrapper h3 {
      --framer-font-size: 29px;

    }
  }`,
        // Responsive styles for small screens
        `@media (max-width: 809px) and (min-width: 0px) {
    .framer-I6GXf .framer-styles-preset-1uchgzi:not(.rich-text-wrapper), .framer-I6GXf .framer-styles-preset-1uchgzi.rich-text-wrapper h3 {
      --framer-font-size: 23px;
    }
  }`,
    ]
    const className = "framer-variable-formatted-textbox"
    function VariableFontTextBox(props) {
        // Apply the styles to the component
        const style = {
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            fontVariationSettings: `'wdth' ${props.fontWidth}, 'wght' ${props.fontWeight}`,
            letterSpacing: props.letterSpacing,
            lineHeight: props.lineHeight,
            marginTop: props.paragraphSpacing,
            textAlign: props.textAlign,
            color: props.textColor,
            textTransform: props.textTransform,
        }

    // Replace new line characters with HTML line-break element
    const textWithLineBreaks = props.text.replace(/\n/g, "<br />")

    return (
        <div
            className={className}
            style={style}
            dangerouslySetInnerHTML={{ __html: textWithLineBreaks }}
        ></div>
    )
}
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
        <VariableFontTextBox
            text={props.text}
            fontSize={props.fontSize}
            fontWidth={props.fontWidth}
            fontWeight={props.fontWeight}
            fontFamily={props.fontFamily}
            letterSpacing={props.letterSpacing}
            lineHeight={props.lineHeight}
            paragraphSpacing={props.paragraphSpacing}
            textAlign={props.textAlign}
            textColor={props.textColor}
            textTransform={props.textTransform}
        />
    </div>
)
}
SNTNL_Components_LicensingComponent_VariableFontsFree.defaultProps = {
    isLicensingEnabled: true,
    onToggleLicensing: () => {},
}

addPropertyControls(SNTNL_Components_LicensingComponent_VariableFontsFree, {
    onToggleLicensing: {
        type: ControlType.EventHandler,
    },
    text: { type: ControlType.String, title: "Text", displayTextArea: true },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        min: 10,
        max: 300,
        step: 1,
        defaultValue: 24,
    },
    fontWidth: {
        type: ControlType.Number,
        title: "Font Width",
        min: 10,
        max: 200,
        step: 1,
        defaultValue: 50,
    },
    fontWeight: {
        type: ControlType.Number,
        title: "Font Weight",
        min: 1,
        max: 1000,
        step: 1,
        defaultValue: 200,
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "AntaTrial VAR Regular",
    },
    letterSpacing: {
        type: ControlType.Number,
        title: "Letter Spacing",
        max: 15,
    },
    lineHeight: {
        type: ControlType.Number,
        title: "Line Height",
        min: 0.95,
        max: 5,
        step: 0.05,
    },
    paragraphSpacing: { type: ControlType.Number, title: "Paragraph Spacing" },
    textAlign: {
        type: ControlType.Enum,
        title: "Text Align",
        options: ["left", "center", "right", "justify"],
        optionTitles: ["Left", "Center", "Right", "Justify"],
    },
    textColor: { type: ControlType.Color, title: "Text Color" },
    textTransform: {
        type: ControlType.Enum,
        title: "Text Transform",
        options: ["none", "capitalize", "uppercase", "lowercase"],
        optionTitles: ["None", "Capitalize", "Uppercase", "Lowercase"],
    },
})

export default SNTNL_Components_LicensingComponent_VariableFontsFree
