import { browser, element, by } from 'protractor/globals';

export class AsnPage {
  navigateTo() {
    return browser.get('/schedule');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
