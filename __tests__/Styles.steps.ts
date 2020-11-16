import { loadFeature, defineFeature } from "jest-cucumber";

import { parse } from "../src/index";

const feature = loadFeature("./Styles.feature", { loadRelativePath: true });

defineFeature(feature, (test) => {
  let htmlInput: string;

  beforeEach(() => {
    // passwordValidator = new PasswordValidator();
  });

  const steps = ({ given, then }) => {
    given("html", (html: string) => (htmlInput = html));

    then("it's parsed and returned as", (html: string) => {
      // @ts-ignore
      const dom = parse(htmlInput);
      
      expect(dom.length).toBe(html);
    });
  };
  test("Class names are unaltered", steps);
  test("Style on elements are unaltered", steps);
  test("<style> tags are unaltered", steps);
});
