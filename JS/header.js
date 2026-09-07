<!-- header -->
    <script>
        const menuButton = document.querySelector(".mobile-menu-button");
        const mobileNavigation = document.querySelector("#mobile-navigation");
        const submenuButtons = document.querySelectorAll(".mobile-submenu-toggle");
        const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
        const desktopMedia = window.matchMedia("(min-width: 1280px)");

        /* 열려 있는 모든 서브메뉴 닫기 */
        function closeAllSubmenus() {
            submenuButtons.forEach(function (button) {
                const menuItem = button.closest(".main-menu-item");

                button.setAttribute("aria-expanded", "false");
                menuItem.classList.remove("is-expanded");
            })
        }

        /* 전체 모바일 메뉴 열기·닫기 */
        function setMobileMenu(open) {
            mobileNavigation.classList.toggle("is-open", open)
            document.body.classList.toggle("menu-open", open)

            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.setAttribute(
                "aria-label",
                open ? "전체 메뉴 닫기" : "전체 메뉴 열기"
            );

            /* 전체 메뉴를 닫으면 열려 있던 서브메뉴도 초기화 */
            if (!open) {
                closeAllSubmenus()
            }
        }

        /* 햄버거·닫기 버튼 */
        menuButton.addEventListener("click", function () {
            const isOpen = mobileNavigation.classList.contains("is-open");

            setMobileMenu(!isOpen);
        });

        /* 메뉴 바깥 배경을 클릭하면 전체 메뉴 닫기 */
        mobileMenuBackdrop.addEventListener("click", function () {
            setMobileMenu(false)
        });

        /* 메인메뉴 아코디언 */
        submenuButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const menuItem = button.closest(".main-menu-item");
                const isExpanded =
                    button.getAttribute("aria-expanded") === "true";

                /* 먼저 다른 서브메뉴를 모두 닫음 */
                closeAllSubmenus();

                /* 클릭한 메뉴가 닫혀 있었을 때만 열기 */
                if (!isExpanded) {
                    button.setAttribute("aria-expanded", "true");
                    menuItem.classList.add("is-expanded");
                }
            });
        });

        /* Escape 키로 전체 메뉴 닫기 */
        document.addEventListener("keydown", function (event) {
            const isMenuOpen =
                mobileNavigation.classList.contains("is-open");

            if (event.key === "Escape" && isMenuOpen) {
                setMobileMenu(false);
                menuButton.focus();
            }
        });

        /* 데스크톱 화면으로 전환되면 모바일 메뉴 초기화 */
        desktopMedia.addEventListener("change", function (event) {
            if (event.matches) {
                setMobileMenu(false);
            }
        });
    </script>