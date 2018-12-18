import { createPortal } from 'react-dom';
import React, { useEffect, useRef } from 'react';
import 'styled-components/macro';
import posed, { PoseGroup } from 'react-pose';

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
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

type Props = {
  children?: React.ReactNode;
  show: boolean;
  warning?: boolean;
  info?: boolean;
};

export default ({ children, show, warning, info }: Props) => (
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
            ${warning && 'background: #de751f;'}
            ${info && 'background: #3490dc;'}
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
