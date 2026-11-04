/** The only real page on the site; any other path shows "Page not found". */
export const isHomePath = (path: string) => path === "/" || path === "/index.html";
