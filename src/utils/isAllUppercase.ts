export const isAllUppercase = (data: string[]): boolean => {
  const isUpperCase = (str: string) => /^[A-Z]+$/.test(str);

  return data.every(
    (element) => typeof element === "string" && isUpperCase(element)
  );
};
