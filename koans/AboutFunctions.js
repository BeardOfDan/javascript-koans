describe("About Functions", function () {

  it("should declare functions", function () {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";

      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";

    function parentfunction() {
      var variable = "local";

      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeIncreaseByFunction(increaseByAmount) {
      return function (numberToIncrease) {
        return numberToIncrease + increaseByAmount;
      };
    }

    var increaseBy3 = makeIncreaseByFunction(3);
    var increaseBy5 = makeIncreaseByFunction(5);

    expect(increaseBy3(10) + increaseBy5(10)).toBe(28);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      var argsArray = [];

      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function () {
    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });

  it("should use function body as a string", function () {
    var add = new Function("a", "b", "return a + b;");
    expect(add(1, 2)).toBe(3);

    var multiply = function (a, b) {
      // An internal comment
      return a * b;
    };

    let newLineChar = "\u000d\n";
    let str = "function (a, b) {" + newLineChar +
      "      // An internal comment" + newLineChar +
      "      return a * b;" + newLineChar +
      "    }";

    // Debugging / Investigation
    // let a = multiply.toString();
    // let b = str; // str.slice(1);

    // let diff = false;
    // for (let i = 10; i < a.length; i++) {
    //   if (a[i] !== b[i]) {
    //     diff = true;
    //     console.log(`i: ${i}`);
    //     console.log(`%${a[i]}% !== #${b[i]}#`);

    //     console.log(a.codePointAt(i));
    //     console.log(b.codePointAt(i));

    //     console.log("--------");
    //     // break;
    //   }
    // }
    // console.log("diff:", diff);

    expect(multiply.toString()).toBe(str);
  });
});
