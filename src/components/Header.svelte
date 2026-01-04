<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import { onMount } from "svelte";
  import ContactModal from "./ContactModal.svelte";

  let isMenuOpen = false;
  let isScrolled = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    // Lock body scroll when menu is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMenuOpen ? "hidden" : "";
    }
  };

  const closeMenu = () => {
    isMenuOpen = false;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const links = [
    { name: "Portfolio", href: "/portfolios" },
    { name: "Partner", href: "/partnership" },
  ];
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ||
  isMenuOpen
    ? 'bg-background shadow-sm py-4'
    : 'bg-transparent py-6'}"
>
  <div
    class="container mx-auto px-4 flex justify-between items-center relative z-50"
  >
    <a
      href="/"
      class="flex items-center text-2xl font-bold tracking-tighter"
      onclick={closeMenu}
    >
      <img src="/abadicommLogo.webp" alt="AbadiComm Logo" class="w-8 h-8" />
      <span class="text-red-600">Abadi</span><span class="text-blue-400"
        >Comm</span
      >
    </a>

    <!-- Desktop Menu -->
    <nav class="hidden md:flex items-center gap-8">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm font-medium hover:text-primary transition-colors"
        >
          {link.name}
        </a>
      {/each}

      <ContactModal>
        <button
          class="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Contact US
        </button>
      </ContactModal>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden p-2 text-foreground"
      onclick={toggleMenu}
      aria-label="Toggle menu"
    >
      {#if isMenuOpen}
        <X class="w-6 h-6" />
      {:else}
        <Menu class="w-6 h-6" />
      {/if}
    </button>
  </div>

  <!-- Mobile Menu Overlay -->
  {#if isMenuOpen}
    <div
      class="fixed inset-0 bg-background z-40 md:hidden flex flex-col pt-24 px-8 pb-8 gap-6 overflow-y-auto"
    >
      {#each links as link}
        <a
          href={link.href}
          class="text-2xl font-bold hover:text-primary border-b pb-4"
          onclick={closeMenu}
        >
          {link.name}
        </a>
      {/each}

      <div class="mt-4 w-full">
        <ContactModal>
          <button
            class="bg-primary text-primary-foreground px-6 py-4 rounded-xl text-center font-bold text-lg w-full cursor-pointer"
          >
            Contact US
          </button>
        </ContactModal>
      </div>
    </div>
  {/if}
</header>
