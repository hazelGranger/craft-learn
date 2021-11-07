import { useNode } from '@craftjs/core';
import React from 'react';
import { Editor, Frame, Element, Canvas, Selector } from '@craftjs/core';
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Text } from '../components/user/Text';

export default function App() {
  return (
    <div>
      <div className="editor-container">
        <Editor>
          <Frame resolver={(Text)}>
            <Element is="div" id="my-ele" className="container" canvas>
              <Text
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
  );
}
