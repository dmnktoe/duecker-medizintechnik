import { renderHook } from '@testing-library/react';
import { useEscapePress } from 'src/utils/use-escape-press';

describe('useEscapePress', () => {
  it('calls onEscapePress when escape key is pressed', () => {
    const onEscapePress = jest.fn();
    renderHook(() => useEscapePress(onEscapePress));

    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    window.dispatchEvent(event);

    expect(onEscapePress).toHaveBeenCalled();
  });

  it('does not call onEscapePress when other key is pressed', () => {
    const onEscapePress = jest.fn();
    renderHook(() => useEscapePress(onEscapePress));

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    window.dispatchEvent(event);

    expect(onEscapePress).not.toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const onEscapePress = jest.fn();
    const { unmount } = renderHook(() => useEscapePress(onEscapePress));

    unmount();

    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    window.dispatchEvent(event);

    expect(onEscapePress).not.toHaveBeenCalled();
  });
});
