import { fireEvent, render, screen } from '@testing-library/react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui';

describe('Collapsible', () => {
  it('renders without error', () => {
    render(
      // eslint-disable-next-line react/jsx-no-undef
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('displays content when trigger is clicked', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('hides content when trigger is clicked twice', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
