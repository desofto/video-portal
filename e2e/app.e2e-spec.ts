import { VideoPortalPage } from './app.po';

describe('video-portal App', () => {
  let page: VideoPortalPage;

  beforeEach(() => {
    page = new VideoPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
