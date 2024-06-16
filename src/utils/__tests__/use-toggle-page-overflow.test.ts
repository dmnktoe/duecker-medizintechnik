import { renderHook } from '@testing-library/react';
import {
  hidePageOverflow,
  showPageOverflow,
  useHidePageOverflow,
} from 'src/utils/use-toggle-page-overflow';

describe('useHidePageOverflow', () => {
  it('hides page overflow when hide is true', () => {
    const { rerender } = renderHook((hide) => useHidePageOverflow(hide), {
      initialProps: false,
    });

    rerender(true);

    expect(document.documentElement.classList.contains('overflow-clip')).toBe(
      true,
    );
  });

  it('shows page overflow when hide is false', () => {
    const { rerender } = renderHook((hide) => useHidePageOverflow(hide), {
      initialProps: true,
    });

    rerender(false);

    expect(document.documentElement.classList.contains('overflow-clip')).toBe(
      false,
    );
  });
});

describe('hidePageOverflow', () => {
  it('adds overflow-clip class to documentElement', () => {
    hidePageOverflow();

    expect(document.documentElement.classList.contains('overflow-clip')).toBe(
      true,
    );
  });

  it('sets padding-right style on documentElement', () => {
    hidePageOverflow();

    expect(
      document.documentElement.style.getPropertyValue('padding-right'),
    ).toBeTruthy();
  });
});

describe('showPageOverflow', () => {
  it('removes overflow-clip class from documentElement', () => {
    showPageOverflow();

    expect(document.documentElement.classList.contains('overflow-clip')).toBe(
      false,
    );
  });

  it('removes padding-right style from documentElement', () => {
    showPageOverflow();

    expect(
      document.documentElement.style.getPropertyValue('padding-right'),
    ).toBeFalsy();
  });
});
