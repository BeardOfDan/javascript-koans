var _; // globals

describe("About Applying What We Have Learnt", function () {
  var products;

  beforeEach(function () {
    products = [
      { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
      { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
      { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
      { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
      { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i, j, hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];

    /* solve using filter() & all() / any() */

    productsICanEat = products.filter(function (product) {
      let canEat = true;
      let isPizza = product.name.search("pizza") ? true : false;
      let hasShrooms = _.any(product.ingredients, function (ingredient) {
        return ingredient === "mushrooms";
      });
      return (isPizza && (!hasShrooms) && (!product.containsNuts));
    });

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    let arr = _.range(1000);
    var sum = _.chain(arr)
      .filter((num) => {
        return (((num % 3) === 0) || ((num % 5) === 0));
      })
      .reduce((iterator, current) => {
        return iterator + current;
      })
      .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    let ingredientCount = _.chain(products)
      .map(function (product) {
        return product.ingredients;
      })
      .flatten()
      .reduce(function (newArr, name, i, []) {
        if (!Array.isArray(newArr)) {
          newArr = new Array(newArr);
        }

        newArr[name] = (newArr[name] || 0) + 1;
        return newArr;
      })
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  // This is used in multiple tests below
  // primes is mutated
  const isPrime = (primes, num) => {
    let notDivisible = primes.every((prime) => {
      if (prime < num) {
        return (num % prime) !== 0;
      }
      return false;
    });

    if (notDivisible) {
      primes.push(num);
      return true;
    }
    return false;
  };

  it("should find the largest prime factor of a composite number", function () {
    // returns an array of prime numbers up to the square root of the input
    const findSomePrimes = function (num) {
      let primes = [2, 3, 5];

      // a factor cannot be greater than the sqrt of the composite
      let sqrt = ~~(Math.sqrt(num) + 1);

      // + 2, because the next possible prime number cannot be even
      for (let i = primes[primes.length - 1] + 2; i < sqrt; i++) {
        isPrime(primes, i);
      }

      return primes;
    };

    // assumes that the number is larger than 24
    const findLargestPrimeFactor = function (num) {
      const primes = findSomePrimes(num).reverse();

      for (let i = 0; i < primes.length; i++) {
        let rem = (num % primes[i]); // rem => remainder
        if (rem === 0) {
          return primes[i];
        }
      }
    };

    let largeComposite = 2 * 3 * 5 * 7 * 11;
    let largestPrimeFactor = findLargestPrimeFactor(largeComposite);

    expect(largestPrimeFactor).toBe(11);

    largeComposite = 2 * 2 * 3 * 3 * 3 * 4 * 5 * 6 * 7;
    largestPrimeFactor = findLargestPrimeFactor(largeComposite);

    expect(largestPrimeFactor).toBe(7);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    const isPalindrome = (str) => {
      return str === str.split("").reverse().join("");
    };

    const productToPalindrome = (product) => {
      product = product.toString(); // string is easier to do this with

      if (isPalindrome(product)) return product;

      // go through the string looking for palindromes of decreasing size, until one is found
      outerLoop: for (let i = product.length; i > 1; i--) {
        let diff = product.length - i;
        // move searched block from left to right
        for (let j = 0; j < diff; j++) {
          let block = product.slice(j, (j + i));
          if (isPalindrome(block)) {
            return block;
          }
        }
      }
    };

    let product = 999 * 999; // 998001  
    let palindrome = productToPalindrome(product);

    expect(palindrome).toBe("99");

    product = 121 * 121; // 14641
    palindrome = productToPalindrome(product);

    expect(palindrome).toBe("14641");

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    let factors = [];

    // hardcoded because the requirements are also hardcoded (1-20)
    // and it is easy enough to just write down
    const primes = [2, 3, 5, 7, 11, 13, 17, 19];

    const getFactors = (num) => {
      let factors = {};

      for (let i = 0; i < primes.length; i++) {
        const prime = primes[i];
        let rem = num % prime;
        while (rem === 0) { // in case if it has multiple of that factor
          factors[prime] = factors[prime] ? factors[prime] + 1 : 1;
          num = num / prime;
          rem = num % prime;
        }
      }
      return factors;
    }

    // range starts at 2 because 1 is already an invisible factor of everything
    const range = _.range(2, 21);
    range.forEach((num) => {
      factors.push(getFactors(num));
    });

    let topFactors = [];
    for (let i = 0; i < primes.length; i++) {
      let powers = [];
      const base = primes[i];

      for (let j = 0; j < factors.length; j++) {
        factor = factors[j];

        let these = Object.entries(factor);
        for (let k = 0; k < these.length; k++) {
          const pair = these[k];
          const thisBase = pair[0];
          const thisPower = pair[1];

          if (thisBase === base.toString()) {
            powers.push(thisPower);
          }
        }
      }
      let highest = powers.sort().pop();
      topFactors[base] = highest;
    }

    topFactors = topFactors.filter((val) => {
      return val !== null;
    });


    const smallest = primes.reduce((memo, current, i) => {
      const val = current ** topFactors[i];
      return memo * val;
    }, 1);

    expect(smallest).toBe(232792560); // got answer to test against from the internet
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    const num1 = 5;
    const num2 = 7;

    const sumOfS = (5 ** 2) + (7 ** 2);
    const squareOfS = (5 + 7) ** 2;

    const result = sumOfS - squareOfS;

    expect(result).toBe(-70);
  });

  it("should find the 10001st prime", function () {
    let primes = [2, 3, 5];

    // because 7 is the next prime after 5, which is the last element in the primes array
    for (let i = 7; primes.length < 10001; i += 2) {
      isPrime(primes, i);
    }

    const thatPrime = primes.pop();

    expect(thatPrime).toBe(104743); // got answer to test against from the internet
  });
});
