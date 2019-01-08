import { createPortal } from 'react-dom';
import React, { useEffect, useRef } from 'react';
import 'styled-components/macro';
import posed, { PoseGroup } from 'react-pose';

const Portal = ({ children }) => {
  const { current: container } = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

const SlideDown = posed.div({
  enter: { x: '-50%', y: 0 },
  exit: { x: '-50%', y: -100 },
});

export default ({ children, show, warning }) => (
  <Portal>
    <PoseGroup animateOnMount>
      {show && (
        <SlideDown
          key="dialog"
          css={`
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            ${warning && 'background: #DE751F;'}
            padding: 1rem 2rem;
            border-radius: 0.25rem;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
          `}
        >
          {children}
        </SlideDown>
      )}
    </PoseGroup>
  </Portal>
);
