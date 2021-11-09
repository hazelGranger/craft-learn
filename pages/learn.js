import { useNode } from '@craftjs/core'
import React from 'react'
import { Editor, Frame, Element, Canvas, Selector } from '@craftjs/core'
import { Toolbox } from '../components/Toolbox'
import { SettingsPanel } from '../components/SettingsPanel'
import { DraggableText } from '../components/user/DraggableText'

export default function App() {
  return (
    <div>
      <div className="editor-container">
        <Editor>
          <Frame resolver={DraggableText}>
            <Element is="div" id="my-ele" className="container" canvas>
              <DraggableText
                size="small"
                text="It's me again!"
                data-cy="frame-container-text"
              />
            </Element>
          </Frame>
          <div>
            <Toolbox />
            <SettingsPanel />
          </div>
        </Editor>
      </div>
    </div>
  )
}
