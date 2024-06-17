import { render } from '@testing-library/react';

import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';

describe('GoogleAnalytics Component', () => {
  it('should render Google Analytics scripts with correct GA_MEASUREMENT_ID', () => {
    render(<GoogleAnalytics GA_MEASUREMENT_ID='GA_TEST_ID' />);

    const scriptElements = document.querySelectorAll('script');
    expect(scriptElements).toHaveLength(2);

    const gaScript = scriptElements[0];
    expect(gaScript.src).toBe(
      'https://www.googletagmanager.com/gtag/js?id=GA_TEST_ID',
    );

    const inlineScript = scriptElements[1];
    expect(inlineScript.textContent).toContain("gtag('config', 'GA_TEST_ID',");
  });
});
