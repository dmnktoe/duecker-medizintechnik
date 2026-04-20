import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { useOuterClick } from '@/utils/useOuterClick';

function Harness({
  enabled = true,
  withIgnore = false,
}: {
  enabled?: boolean;
  withIgnore?: boolean;
}) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const ignoreRef = React.useRef<HTMLButtonElement>(null);
  const [closed, setClosed] = React.useState(false);

  useOuterClick(panelRef, () => setClosed(true), {
    enabled,
    ignoreRefs: withIgnore ? [ignoreRef] : [],
  });

  return (
    <div>
      <button type='button' ref={ignoreRef} data-testid='ignore'>
        ignore
      </button>
      <div ref={panelRef} data-testid='panel'>
        panel
      </div>
      <div data-testid='outside'>outside</div>
      {closed && <span data-testid='closed'>closed</span>}
    </div>
  );
}

describe('useOuterClick', () => {
  it('calls handler on mousedown outside the ref element', () => {
    render(<Harness />);
    expect(screen.queryByTestId('closed')).not.toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.getByTestId('closed')).toBeInTheDocument();
  });

  it('does not call handler for mousedown inside the ref element', () => {
    render(<Harness />);
    fireEvent.mouseDown(screen.getByTestId('panel'));
    expect(screen.queryByTestId('closed')).not.toBeInTheDocument();
  });

  it('respects ignoreRefs', () => {
    render(<Harness withIgnore />);
    fireEvent.mouseDown(screen.getByTestId('ignore'));
    expect(screen.queryByTestId('closed')).not.toBeInTheDocument();
  });

  it('does not attach listeners when disabled', () => {
    render(<Harness enabled={false} />);
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByTestId('closed')).not.toBeInTheDocument();
  });
});
