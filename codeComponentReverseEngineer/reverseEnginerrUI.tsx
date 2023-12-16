// Reverse Engineering Framer Code-Components
// V 1.0.1
// 2023.12.16
// Framer Business

import React, { useState } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
/**
 *
 * @framerIntrinsicWidth 1200
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

    const formatCode = () => {
        // Remove import statement
        let updatedCode = inputCode.replace(
            /import { jsx as _jsx, jsxs as _jsxs } from "react\/jsx-runtime";|_jsx|_jsxs/g,
            ""
        )

        // Replace jsx and jsxs tags
        updatedCode = updatedCode.replace(/_jsx/g, "div")
        const finalCode = updatedCode.replace(/_jsxs/g, "div")

        // Remove __FramerMetadata__ section
        const formattedCode = finalCode.replace(
            /export const __FramerMetadata__ = {[\s\S]*?};/g,
            ""
        )

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
                    width: "50%",
                    height: "100%",
                    backgroundColor: "#AA00FF",
                    color: "#ffffff",
                    borderRight: "1px solid #333",
                }}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
            />
            <textarea
                style={{
                    width: "50%",
                    height: "100%",
                    whiteSpace: "pre",
                    backgroundColor: "#000F52",
                    color: "#ffffff",
                }}
                value={outputCode}
                readOnly
            />
            <textarea value={inputCode} onChange={handleInputChange} />
            <button onClick={formatCode}>Format Code</button>
            <textarea value={outputCode} readOnly />
        </Frame>
    )
}

export default CodeFormatter





