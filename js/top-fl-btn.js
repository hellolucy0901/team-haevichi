
const topButton = document.querySelector(".top-button");

    if (topButton) {
        /* 스크롤 위치에 따라 버튼 표시 */
        function updateTopButton() {
            const shouldShowButton = window.scrollY >= 300;

            topButton.classList.toggle(
                "is-visible",
                shouldShowButton
            );
        }

        /* 버튼 클릭 시 페이지 상단으로 이동 */
        topButton.addEventListener("click", function () {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });

        window.addEventListener("scroll", updateTopButton, {
            passive: true
        });

        /* 페이지를 새로고침했을 때 현재 위치 반영 */
        updateTopButton();
    }
