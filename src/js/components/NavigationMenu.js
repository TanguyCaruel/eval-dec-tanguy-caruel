export default function NavigationMenu() {
    return {
      menuOpen: false,
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      closeMenu() {
        this.menuOpen = false;
      },
    };
  }