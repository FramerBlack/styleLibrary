import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer"
import { useState, useEffect, useLayoutEffect } from "react"
/**
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 1200
 * @framerDisableUnlink
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
// keyFramer v 1.9
declare global {
    interface Window {
      Theatre: any;
    }
  }
function KeyFramer(props) {
    const [animationData, setAnimationData] = useState(null)
    useEffect(() => {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.6.1/dist/core-and-studio.js"
      script.async = true
      script.onload = () => {
        const { core, studio } = window.Theatre
        if (props.mode === "Studio") {
          studio.initialize()
        } else {
          studio.ui.hide()
        }
        const project = core.getProject("KeyFramer Timeline Animation", {
          state: animationData,
        })
        const sheet = project.sheet("Scene 01")
        const animatedElements = Array.from(document.querySelectorAll("[data-framer-name]"))
animatedElements.forEach((element) => {
  const obj = sheet.object(
    (element as HTMLElement).dataset.framerName,
    {
      x: 0,
      y: 0,
      opacity: core.types.number(1, { range: [0, 1] }),
      scaleX: core.types.number(1, { range: [0, 10] }),
      scaleY: core.types.number(1, { range: [0, 10] }),
      scale: core.types.number(1, { range: [0, 10] }),
      rotation: core.types.number(0, { range: [0, 360] }),
      rowGap: core.types.number(0, { range: [0, 100] }),
      columnGap: core.types.number(0, { range: [0, 100] }),
      hue: core.types.number(0, { range: [0, 360] }),
      brightness: core.types.number(100, { range: [0, 200] }),
      blur: core.types.number(0, { range: [0, 100] }),
    },
    { reconfigure: true }
  )
  obj.onValuesChange((obj) => {
    const element = obj.element as HTMLElement; // Declare element here
    element.style.transform = `translateX(${obj.x}px) translateY(${obj.y}px) scaleX(${obj.scaleX}) scaleY(${obj.scaleY}) scale(${obj.scale}) rotate(${obj.rotation}deg)`
    element.style.opacity = obj.opacity
            element.style.rowGap = `${obj.rowGap}px`
            element.style.columnGap = `${obj.columnGap}px`
            element.style.filter = `hue-rotate(${obj.hue}deg) brightness(${obj.brightness}%) blur(${obj.blur}px)`
          })
        })
      }
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }, [animationData, props.mode])
    useEffect(() => {
      if (props.animationFile) {
        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
                setAnimationData(JSON.parse(event.target.result))
              }
          }
          reader.readAsText(props.animationFile)
      }
    }, [props.animationFile])
    return null
  }
  function KeyFramerStudio(props) {
    return (
      <Frame size="100%" background="transparent">
        <KeyFramer animationFile={props.animationFile} mode={props.mode} />
      </Frame>
    )
  }
  addPropertyControls(KeyFramerStudio, {
    animationFile: {
      type: ControlType.File,
      allowedFileTypes: ["json"],
      title: "Animation File",
      description: "Load the Json Animation",
    },
    mode: {
      title: "Mode",
      type: ControlType.Enum,
      options: ["Studio", "Production"],
      defaultValue: "Studio",
      description: "[keyFramer Studio](https://keyframer.framer.ai)",
    },
  })
  export default KeyFramerStudio
