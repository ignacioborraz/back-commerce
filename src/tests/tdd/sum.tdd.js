const sum = (...nums) => {
    if (!nums[0] || !nums[1]) {
        return 2
    }
    for (let n of nums) {
        if (typeof n !== "number") {
            return 3
        }
    }
    return nums.reduce((prev, curr) => prev + curr);
}

let failed_tests = 0;
let success_tests = 0;
let client_errors = 0;

let test = (...num) => {
  let result = sum(...num);
  if (result===3) {
    client_errors++
    return "no es numero"
  } else if (result===2) {
    client_errors++
    return "al menos 2 sumandos"
  }
  let total = num.reduce((prev, curr) => prev + curr);
  if (total === result) {
    success_tests++
    return total
  } else {
    failed_tests++;
    return "la suma no coincide"
  }
};

test(1);
test(10,"a");
test(-2, 5, 4, -7);

console.log({ failed_tests, success_tests, client_errors });
//{ failed_tests: 2, success_tests: 1 }
