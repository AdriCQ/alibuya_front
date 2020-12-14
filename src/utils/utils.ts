export const ScrollTop = () => {
  document.scrollingElement?.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

export const isMobile = () => {
  const check = false;

  return check;
};
