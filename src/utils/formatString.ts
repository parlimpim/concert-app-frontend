export const formatString = (s: string, ...args: any[]) => {
  console.log("args", args);
  return s.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === "undefined" ? match : args[index];
  });
};
