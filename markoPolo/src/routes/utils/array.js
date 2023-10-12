async function createRangeArray(start, end) {
    const rangeArray = [];
    for (let i = start; i <= end; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

module.exports = {createRangeArray}