export function scrollToElement(el, offset = 92) {
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: y - offset,
        behavior: "smooth",
    });
}