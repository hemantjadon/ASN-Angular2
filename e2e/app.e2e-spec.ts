import { AsnPage } from './app.po';

describe('asn App', function() {
  let page: AsnPage;

  beforeEach(() => {
    page = new AsnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
