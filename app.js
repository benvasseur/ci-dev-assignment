/**
 * Get the sum of digit of a number
 * @param {number} x
 */
function getDigitSum(x) {
  let value = x;
  let sum = 0;

  while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
  }

  return sum;
}

/**
 * Determine if a case is safe
 * @param {number} x
 * @param {number} y
 */
function isSafe(x, y) {
  return getDigitSum(x) + getDigitSum(y) <= 23;
}

/**
 * Start execution
 *
 * Since x and y will be absolute, we only check the case where they are positive,
 * then multiply final result by 4
 */
let step = 0;
const accessibleCells = [{ step: 0, x: 0, y: 0 }];
let canContinue = true;

console.time('find accessible cells execution time');
while (canContinue) {
  let hasFoundNewCell = false;
  step += 1;

  // console.log(step);

  // eslint-disable-next-line no-loop-func
  const lastStepCells = accessibleCells.filter((el) => el.step === step - 1);

  for (let cpt = 0; cpt < lastStepCells.length; cpt += 1) {
    const cell = lastStepCells[cpt];

    if (cell.y > 0
      && isSafe(cell.x + 1, cell.y)
      && !accessibleCells.some((el) => el.x === cell.x + 1 && el.y === cell.y)) {
      accessibleCells.push({ step, x: cell.x + 1, y: cell.y });
      hasFoundNewCell = true;
    }

    if (isSafe(cell.x, cell.y + 1)
      && !accessibleCells.some((el) => el.x === cell.x && el.y === cell.y + 1)) {
      accessibleCells.push({ step, x: cell.x, y: cell.y + 1 });
      hasFoundNewCell = true;
    }

    // if (cell.x - 1 >= 0
    //     && isSafe(cell.x - 1, cell.y)
    //     && !accessibleCells.some((el) => el.x === cell.x - 1 && el.y === cell.y)) {
    //   accessibleCells.push({ step, x: cell.x - 1, y: cell.y });
    //   hasFoundNewCell = true;
    // }

    // if (cell.y - 1 >= 0
    //   && isSafe(cell.x, cell.y - 1)
    //   && !accessibleCells.some((el) => el.x === cell.x && el.y === cell.y - 1)) {
    //   accessibleCells.push({ step, x: cell.x, y: cell.y - 1 });
    //   hasFoundNewCell = true;
    // }
  }

  canContinue = hasFoundNewCell;
}

/**
 * Multiply by 4 to get areas where:
 * - x is negative
 * - y is negative
 * - y is negative and x is negative
 *
 * Remove 3 because the cell {x: 0, y: 0} will be duplicated 4 times
 */
console.log(`Max Area: ${(accessibleCells.length * 4) - 3} cells`);
console.timeEnd('find accessible cells execution time');
