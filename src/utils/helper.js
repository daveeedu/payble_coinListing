export const getColorClass = (value, threshold, trueClass, falseClass) => {
    return value >= threshold ? trueClass : falseClass;
  };

export const getAmount = num => new Intl.NumberFormat().format(num)