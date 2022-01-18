const constants = {
  error: "#f5222d",
};

const dark = {
  ...constants,
  normalText: "#ffffff",
  mutedText: "#b0b8bf",
  border: "#333333",
  accent: "#6a0dad",
  pageBackground: "#1b1b1b",
  foreground: "#262626",
  activeBackground: "#333333",
  inputBackground: "#212121",
  shadow: "rgba(0, 0, 0, 0.4)",
  settle: "#00FF00",
  cancel: "#f5222d",
};

const light = {
  ...constants,
  normalText: "#454f5b",
  mutedText: "#818e99",
  border: "#ebedf0",
  accent: "#FF0000",
  pageBackground: "#f4f6f8",
  foreground: "#ffffff",
  activeBackground: "#fafafa",
  inputBackground: "#fcfcfc",
  shadow: "rgba(0, 0, 0, 0.05)",
  settle: "#00FF00",
  cancel: "#f5222d",
};

const theme = (isDark) => (isDark ? dark : light);

export default theme;
