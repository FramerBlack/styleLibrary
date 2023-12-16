// SNTNL Variable Fonts for Framer
// V 2.5.0
// 2023.12.12
// Production : Launch

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

export function VariableFontTextBox_2_5(props) {
    const className = "framer-variable-formatted-textbox" // Define className here

    const style: React.CSSProperties = {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        fontVariationSettings: `'wdth' ${props.fontWidth}, 'wght' ${props.fontWeight}`,
        letterSpacing: props.letterSpacing,
        lineHeight: props.lineHeight,
        marginTop: props.paragraphSpacing,
        textAlign: props.textAlign,
        color: props.textColor,
        textDecoration: "none",
        textTransform: props.textTransform,
    }

    const textWithLinks = props.text.replace(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
        '<a href="$1" target="_blank">$1</a>'
    )

    const textWithLineBreaks = props.text.replace(/\n/g, "<br />")

    return (
        <div
            className={className}
            style={style}
            dangerouslySetInnerHTML={{ __html: textWithLinks }}
        ></div>
    )
}
VariableFontTextBox_2_5.defaultProps = {
    text: "Hello, VF",
    fontSize: 36,
    fontWidth: 100,
    fontWeight: 400,
    fontFamily: "OddityTrial VAR Regular",
    letterSpacing: "0em",
    lineHeight: "1.4em",
    paragraphSpacing: "10px",
    textAlign: "left",
    textColor: "#333333",
    linkColor: "#FF00FF",
    textTransform: "none",
    textDecoration: "none",
    linkHoverColor: "#FF0000",
    linkActiveColor: "#00FF00",
}

addPropertyControls(VariableFontTextBox_2_5, {
    text: { type: ControlType.String, title: "Text", displayTextArea: true },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        min: 10,
        max: 300,
        step: 1,
    },
    fontWidth: {
        type: ControlType.Number,
        title: "Font Width",
        min: 10,
        max: 200,
        step: 1,
    },
    fontWeight: {
        type: ControlType.Number,
        title: "Font Weight",
        min: 1,
        max: 1000,
        step: 1,
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "OddityTrial VAR Regular",
    },
    letterSpacing: {
        type: ControlType.Number,
        title: "Letter Spacing",
        max: 15,
    },
    lineHeight: {
        type: ControlType.Number,
        title: "Line Height",
        min: 1.5,
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
