import { browser, element, by } from 'protractor';

export class CmsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cms-root h1')).getText();
  }
}
