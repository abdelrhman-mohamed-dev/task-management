// Import necessary modules
import { Injectable } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { Service } from 'selenium-webdriver/chrome';

@Injectable()
export class SeleniumService {
  private driver: WebDriver;

  constructor() {
    this.initializeDriver();
  }

  private async initializeDriver() {
    // Set up Chrome options
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless'); // Run Chrome in headless mode
    chromeOptions.addArguments('--disable-gpu'); // Disable GPU acceleration

    // Build the WebDriver with Chrome options
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    // Log in to the website (customize this part based on the website's login form structure)
    await this.driver.get('https://www.linkedin.com/login');

    // Example: fill in username and password
    const usernameInput = await this.driver.findElement(By.id('username'));
    const passwordInput = await this.driver.findElement(By.id('password'));
    const loginButton = await this.driver.findElement(
      By.css('[aria-label="Sign in"]'),
    );

    await usernameInput.sendKeys('5fead867d9@emailaoa.pro');
    await passwordInput.sendKeys('5fead867d95fead867d9');
    await loginButton.click();
  }

  async getDataFromWebsite(
    url: string,
  ): Promise<{ profileImg: string | null; jobTitle: string | null }> {
    try {
      // Navigate to the target URL after logging in
      await this.driver.get(url);

      // Wait for up to 10 seconds for the element to be present
      const imgElement = await this.driver.wait(
        until.elementLocated(
          By.css(
            '.pv-top-card-profile-picture__image.pv-top-card-profile-picture__image--show.evi-image.ember-view',
          ),
        ),
        20000,
      );

      // Example: Extract the src attribute from the img tag with id="ember285"
      const profileImg = await imgElement.getAttribute('src');

      const divElement = await this.driver.findElement(
        By.css('div.text-body-medium.break-words'),
      );
      const jobTitle = await divElement.getText();

      // Return the data as JSON
      return { profileImg, jobTitle };
    } finally {
      // Quit the driver after completing the task
      await this.driver.quit();
    }
  }
}
