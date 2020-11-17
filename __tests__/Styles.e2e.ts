import {
  autoBindSteps,
  loadFeatures,
} from "jest-cucumber";
import { E2EPage, newE2EPage } from "@stencil/core/testing";

const steps = ({ given, then }) => {
  let page: E2EPage;

  let htmlInput: string;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  given("html", (html: string) => (htmlInput = html));

  then("it's parsed and returned as", async (html: string) => {
    await page.setContent(`<test-component></test-component>`);

    // select the "prop-cmp" element
    // and run the callback in the browser's context
    await page.$eval(
      "test-component",
      (elm: any, { htmlInput }) => {
        // within the browser's context
        // let's set new property values on the component
        elm.setChildren(htmlInput);
      },
      { htmlInput }
    );
    await page.waitForChanges();

    const elm = await page.find("test-component");
    expect(elm.innerHTML).toEqualHtml(html);
  });
};

autoBindSteps(loadFeatures("__tests__/**/*.feature", {  }), [
  steps,
]);
