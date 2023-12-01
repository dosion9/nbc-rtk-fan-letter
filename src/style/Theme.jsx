const color = {
  white: "#ffffff",
  black: "#252525",
  pink: "pink",
  blue: "skyblue",
  green: "lightgreen",
  purple: "#6f42c1",
  yellow: "gold",
  warning: "#ff0000", // 잘못된 지정을 했을 때 나오는 색
  shadow: "#252525a9",
  lightBlue: "#c4dae2",
  disabled: "gray",
  base: "skyblue",
  baseDark: "#6ca4b9"
};

const fontSize = {
  sm: "0.75rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "1.5rem"
};

const border = {
  white: `3px solid ${color.white}`,
  black: `3px solid ${color.black}`,
  pink: `3px solid ${color.pink}`,
  blue: `3px solid ${color.blue}`,
  green: `3px solid ${color.green}`,
  purple: `3px solid ${color.purple}`,
  yellow: `3px solid ${color.yellow}`,
  warning: `3px solid ${color.warning}`,
  disabled: `3px solid ${color.disabled}`,
  baseDark: `3px solid ${color.baseDark}`,
  borderRadius: "1em"
};

const spacing = {
  sm: "0.5rem",
  base: "1rem",
  xl: "2rem"
};

const transition = {
  base: "all 0.15s"
};

const animationEffect = {
  hover: { transform: "translateX(-8px) translateY(-4px)", boxShadow: `5px 5px 5px ${color.shadow}` }
};

const theme = {
  color,
  fontSize,
  border,
  spacing,
  transition,
  animationEffect
};

export default theme;
