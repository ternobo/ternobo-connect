export default {
    inserted: (el,bindings) => {
        function loadImage() {
            const imageElement = Array.from(el.children).find(
                el => el.nodeName === "IMG"
            );
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    if(bindings.value.onLoad){
                        bindings.value.onLoad();
                    }
                    setTimeout(() => el.classList.add("loaded"), 100);
                });
                imageElement.addEventListener("error", () => {
                    setTimeout(() => el.classList.add("error"), 100);
                    setTimeout(() => el.classList.add("loaded"), 100);

                });
                imageElement.src = imageElement.dataset.url;
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: "0"
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        }
        if (window["IntersectionObserver"]) {
            createObserver();
        } else {
            loadImage();
        }
    }
}
