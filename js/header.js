(() => {
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileNavigation = document.querySelector("#mobile-navigation");
    const submenuButtons = document.querySelectorAll(".mobile-submenu-toggle");
    const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
    const desktopMedia = window.matchMedia("(min-width: 1280px)");

    /* 헤더가 없는 페이지에서는 실행하지 않음 */
    if (!menuButton || !mobileNavigation || !mobileMenuBackdrop) {
        return;
    }

    /* 모바일 메뉴 내부 링크 */
    const mobileMenuLinks = mobileNavigation.querySelectorAll(
        'a[href]:not([href="#"])'
    );

    /* 열려 있는 모든 서브메뉴 닫기 */
    function closeAllSubmenus() {
        submenuButtons.forEach(function (button) {
            const menuItem = button.closest(".main-menu-item");

            button.setAttribute("aria-expanded", "false");

            if (menuItem) {
                menuItem.classList.remove("is-expanded");
            }
        });
    }

    /* 전체 모바일 메뉴 열기·닫기 */
    function setMobileMenu(open) {
        mobileNavigation.classList.toggle("is-open", open);
        document.body.classList.toggle("menu-open", open);

        menuButton.setAttribute(
            "aria-expanded",
            String(open)
        );

        menuButton.setAttribute(
            "aria-label",
            open ? "전체 메뉴 닫기" : "전체 메뉴 열기"
        );

        /* 메뉴를 닫을 때 서브메뉴 초기화 */
        if (!open) {
            closeAllSubmenus();
        }
    }

    /* 햄버거·닫기 버튼 */
    menuButton.addEventListener("click", function () {
        const isOpen =
            mobileNavigation.classList.contains("is-open");

        setMobileMenu(!isOpen);
    });

    /* 메뉴 바깥 배경 클릭 */
    mobileMenuBackdrop.addEventListener("click", function () {
        setMobileMenu(false);
    });

    /* 메인 메뉴 아코디언 */
    submenuButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const menuItem =
                button.closest(".main-menu-item");

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            closeAllSubmenus();

            if (!isExpanded && menuItem) {
                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuItem.classList.add("is-expanded");
            }
        });
    });

    /* 모바일 메뉴 링크 선택 시 메뉴 닫기 */
    mobileMenuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (!desktopMedia.matches) {
                setMobileMenu(false);
            }
        });
    });

    /* Escape 키로 닫기 */
    document.addEventListener("keydown", function (event) {
        const isMenuOpen =
            mobileNavigation.classList.contains("is-open");

        if (event.key === "Escape" && isMenuOpen) {
            setMobileMenu(false);
            menuButton.focus();
        }
    });

    /* 데스크톱 전환 시 모바일 메뉴 초기화 */
    desktopMedia.addEventListener("change", function (event) {
        if (event.matches) {
            setMobileMenu(false);
        }
    });
})();