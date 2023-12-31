// Reverse Engineering Framer Code-Components
// V 1.0.1
// 2023.12.16
// Framer Business

import React, { useState } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
/**
 *
 * @framerIntrinsicWidth 1400
 * @framerIntrinsicHeight 1200
 *
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
  
 function CodeFormatter() {
    const [inputCode, setInputCode] = useState("")
    const [outputCode, setOutputCode] = useState("")

    const handleInputChange = (event) => {
        setInputCode(event.target.value)
    }

    const regex = /\/\*#__PURE__\*\/ e\("div",/g;
const updatedString = yourString.replace(regex, "<div");
let updatedCode = updatedString.replace(regex, "");
const finalCode = updatedCode.replace(regex, "div");
const formattedCode = finalCode.replace(/export const __FramerMetadata__ = {[\s\S]*?};/g, "");

        

        setOutputCode(formattedCode)
    }

    return (
        <Frame
            size="100%"
            background="none"
            style={{
                minHeight: "100%",
                display: "flex",
            }}
        >
            <textarea
                title="Input"
                style={{
                    width: "48%",
                    height: "100%",
                    backgroundColor: "#AA00FF",
                    color: "#ffffff",
                    borderRight: "1px solid #333",
                    fontSize: "13px",
                    padding: "10px",
                    border: "0px",
                    background: "#55555522",
                }}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
            />
            <textarea
                style={{
                    width: "52%",
                    height: "100%",
                    whiteSpace: "pre",
                    backgroundColor: "#000F52",
                    color: "#ffffff",
                    fontSize: "13px",
                    padding: "10px",
                    border: "0px",
                    background: "#22222244",
                }}
                value={outputCode}
                readOnly
            />

            <button
                style={{
                    width: "100%",
                    maxWidth: "140px",
                    height: "70px",
                    whiteSpace: "pre",
                    backgroundColor: "#0a0a0a",
                    color: "#ffffff",
                    fontFamily: "Anton",
                    fontSize: "14px",
                    paddingLeft: "15px",
                    alignItems: "end",
                    borderRadius: "8px",
                    border: "0px",
                    position:"absolute",
                    top:"50px",
                    right:"50px",
                    z-index:"5",
                }}
                onClick={formatCode}
            >
                Reverse Me, Baby
            </button>
        </Frame>
    );
}

export default CodeFormatter



