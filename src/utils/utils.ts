export const ScrollTop = () => {
  if (document.scrollingElement?.scrollTop != 0) {
    document.scrollingElement?.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}