module.exports = function (Homework) {
  return async function (array, fn, initialValue, cb) {
    const length = await new Promise((resolve) =>
      array.length((length) => resolve(length))
    );

    let index = 0;
    let total = initialValue;

    let isLess = await new Promise((resolve) =>
      Homework.less(index, length, (isLess) => resolve(isLess))
    );

    while (isLess) {
      const value = await new Promise((resolve) =>
        array.get(index, (value) => resolve(value))
      );

      total = await new Promise((resolve) =>
        fn(total, value, index, array, (result) => resolve(result))
      );

      index = await new Promise((resolve) =>
        Homework.add(index, 1, (index) => resolve(index))
      );

      isLess = await new Promise((resolve) =>
        Homework.less(index, length, (isLess) => resolve(isLess))
      );
    }

    cb(total);
  };
};
