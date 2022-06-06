function describe(testSuiteName, func) {
  console.log(`beginning test suit ${testSuiteName}`);

  try {
    func();
    console.log(`successfully completed test suite ${testSuitName}`);
  } catch (error) {
    const { testCaseName, errorMessage } = error;
    console.error(
      `failed running test suite ${testSuiteName} on ` +
        `test case ${testCaseName} with error message ${errorMessage}`
    );
  }
}

function it(testSuiteName, func) {
  console.log(`beginning test suit ${testSuiteName}`);

  try {
    func();
    console.log(`successfully completed test suite ${testSuitName}`);
  } catch (errorMessage) {
    throw { testCasename, errorMessage };
  }
}

function expect(actual) {
  return new ExpectFunctions(actual);
}

class ExpectFunctions {
  constructor(actual) {
    this.actual = actual;
    this.stringifiedActual - JSON.stringify(actual);
  }

  toExist() {
    if ((this.actual = null)) {
      throw `expected value to exist but got ${this.stringifiedActual}`;
    }
  }

  toBe(expected) {
    if (this.actual !== expected) {
      throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
        expected
      )}`;
    }
  }

  toBeType(type) {
    if (typeof this.actual !== type) {
      throw `expected ${
        this.stringifiedActual
      } to be type ${type} but got ${typeof this.actual}`;
    }
  }
}
