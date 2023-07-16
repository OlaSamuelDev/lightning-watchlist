export enum Theme {
  Background = "#10141f",
  Secondary = "#161d2f",
  Tertiary = "#5E6C8B",
  Light = "#1fdaff",
  Dark = "#000000",
  White = "#FFFFFF",
  Focus = "#bff4ff",
  Added = "#18db4f",
}

export const getColors = (): Record<string, string> => {
  return Theme;
};
