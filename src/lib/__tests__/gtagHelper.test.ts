import { event, pageview } from './../gtagHelper';

describe('gtagHelper', () => {
  describe('pageview', () => {
    it('calls window.gtag with the correct arguments for pageview', () => {
      const mockGtag = jest.fn();
      window.gtag = mockGtag;

      const GA_MEASUREMENT_ID = 'GA123';
      const url = '/example-page';

      pageview(GA_MEASUREMENT_ID, url);

      expect(mockGtag).toHaveBeenCalledWith('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    });
  });

  describe('event', () => {
    it('calls window.gtag with the correct arguments for event', () => {
      const mockGtag = jest.fn();
      window.gtag = mockGtag;

      const eventData = {
        action: 'button_click',
        category: 'UI',
        label: 'Button 1',
        value: 1,
      };

      event(eventData);

      expect(mockGtag).toHaveBeenCalledWith('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
      });
    });
  });
});
