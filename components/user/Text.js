import { useNode } from '@craftjs/core'
import {
  Slider,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import ColorPicker from 'material-ui-color-picker'

export const Text = ({
  text,
  fontSize,
  textAlign,
  color,
  position,
  top,
  left,
  ...props
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (selected) {
      return
    }

    setEditable(false)
  }, [selected])

  return (
    <div
      {...props}
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
            500,
          )
        }
        tagName="p"
        style={{
          fontSize: `${fontSize}px`,
          textAlign,
          color: `${color}`,
          position: position,
          top: `${top}%`,
          left: `${left}%`,
        }}
      />
    </div>
  )
}

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    color,
    position,
    top,
    left,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    position: node.data.props.position,
    top: node.data.props.top,
    left: node.data.props.left,
  }))

  return (
    <>
      <div>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Font size</FormLabel>
          <Slider
            value={fontSize || 7}
            step={7}
            min={1}
            max={50}
            onChange={(_, value) => {
              setProp((props) => (props.fontSize = value), 1000)
            }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">color</FormLabel>
          <ColorPicker
            name="background-color"
            value={color}
            onChange={(color) => {
              setProp((props) => (props.color = color), 500)
            }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">position</FormLabel>
          <RadioGroup
            defaultValue={position}
            onChange={(e) =>
              setProp((props) => (props.position = e.target.value))
            }
          >
            <FormControlLabel
              label="relative"
              value="relative"
              control={<Radio size="small" position="relative" />}
            />
            <FormControlLabel
              label="absolute"
              value="absolute"
              control={<Radio size="small" position="absolute" />}
            />
          </RadioGroup>
        </FormControl>
      </div>
      {position === 'absolute' && (
        <div>
          <FormControl size="small" component="fieldset">
            <FormLabel component="legend">top</FormLabel>
            <TextField
              type="number"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 100,
              }}
              value={top}
              onChange={(e) => setProp((props) => (props.top = e.target.value))}
            />
          </FormControl>
          <FormControl size="small" component="fieldset">
            <FormLabel component="legend">left</FormLabel>
            <TextField
              type="number"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 100,
              }}
              value={left}
              onChange={(e) =>
                setProp((props) => (props.left = e.target.value))
              }
            />
          </FormControl>
        </div>
      )}
    </>
  )
}

export const TextDefaultProps = {
  text: 'Hi',
  fontSize: 20,
  color: '#000',
  position: 'relative',
  top: 0,
  left: 0,
}

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
  rules: {
    canDrag: () => true,
  },
}
