import { useNode } from '@craftjs/core';
import React from 'react';
import { Editor, Frame, Element, Canvas, Selector } from '@craftjs/core';
import { Container } from '../components/user/Container';
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Text } from '../components/user/Text';

const TextComponent = ({ text }) => {
  const {
    connectors: { drag },
  } = useNode();

  return (
    <div ref={drag}>
      <h2>{text}</h2>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <div className="editor-container">
        <Editor>
          <Frame resolver={(TextComponent, Text)}>
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
