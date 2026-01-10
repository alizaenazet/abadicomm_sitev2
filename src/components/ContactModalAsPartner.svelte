<script lang="ts">
  import { X } from "@lucide/svelte";

  let isOpen = false;

  let name = "";
  let nameOfInstitution = "";
  let offerInfo = "";

  const partnerOffersOptions = ["Jasa", "Barang", "Lainnya"];
  let partnerOffer: "Jasa" | "Barang" | "Lainnya" = "Jasa";

  $: isHaveOtherNeed = partnerOffer === "Lainnya";
  let otherNeed = "";

  $: message = (() => {
    let greeting =
      "Selamat pagi, siang, atau malam. Semoga Anda sehat dan bahagia.%0A";
    let intro = `Perkenalkan, saya ${name} dari ${nameOfInstitution}`;

    let purpose = `saya ingin memberikan penawaran ${isHaveOtherNeed ? otherNeed : partnerOffer}`;
    let extraInfo = "";

    if (offerInfo) {
      extraInfo = `%0AInformasi penawaran:%0A${offerInfo}.`;
    }

    return `${greeting}${intro} ${purpose}%0A${extraInfo}%0A Senang dapat menghubungi anda.%0ATerimakasih`;
  })();

  let whatsappNumber = "6281332350902"; // TODO: MAKE IT CONFIGURABLE IN SVELTIA

  $: isFormFilled =
    name &&
    nameOfInstitution &&
    offerInfo &&
    (isHaveOtherNeed ? otherNeed : partnerOffer);

  const toggle = () => {
    isOpen = !isOpen;
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  };

  /**
   * Action to portal the node to the body
   */
  function portal(node: HTMLElement) {
    let hasMoved = false;
    if (typeof document !== "undefined") {
      document.body.appendChild(node);
      hasMoved = true;
    }

    return {
      destroy() {
        if (hasMoved && node.parentNode) {
          node.parentNode.removeChild(node);
        }
      },
    };
  }
</script>

<!-- Trigger Slot Wrapper -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={toggle} class="contents">
  <slot />
</div>

{#if isOpen}
  <div
    use:portal
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm text-foreground"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-background rounded-2xl w-full max-w-md p-6 md:p-8 relative shadow-xl overflow-y-auto max-h-[90vh]"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        onclick={toggle}
        class="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground bg-secondary/50 rounded-full cursor-pointer"
        aria-label="Close modal"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-2xl font-bold mb-2">Get in Touch</h2>

      <form class="space-y-4">
        <div class="space-y-2">
          <label for="nama" class="text-sm font-medium">Nama *</label>
          <input
            type="text"
            id="nama"
            placeholder="Nama Anda"
            bind:value={name}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div class="space-y-2">
          <label for="name-of-institution" class="text-sm font-medium"
            >Nama Perusahaan *</label
          >
          <input
            type="text"
            id="name-of-institution"
            placeholder="Nama Perusahaan Anda"
            bind:value={nameOfInstitution}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div class="space-y-2">
          <label for="partner-offer" class="text-sm font-medium"
            >Jenis penawaran *</label
          >
          <select
            id="partner-offer"
            bind:value={partnerOffer}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {#each partnerOffersOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        {#if isHaveOtherNeed}
          <div class="space-y-2">
            <label for="other-need" class="text-sm font-medium"
              >Jenis penawaran lainnya *</label
            >
            <input
              type="text"
              id="other-need"
              placeholder="Jelaskan jenis penawaran lainnya"
              bind:value={otherNeed}
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        {/if}

        <div class="space-y-2">
          <label for="info" class="text-sm font-medium"
            >Informasi penawaran</label
          >
          <textarea
            id="info"
            rows="4"
            placeholder="Tell us about your event..."
            bind:value={offerInfo}
            class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          ></textarea>
        </div>

        <div class="pt-2">
          {#if isFormFilled}
            <a
              href={`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${message}&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full"
            >
              <button
                type="button"
                class="w-full bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Kirim Pesan
              </button>
            </a>
          {:else}
            <button
              type="button"
              disabled
              class="w-full bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md font-medium opacity-50 cursor-not-allowed"
            >
              Kirim Pesan
            </button>
          {/if}
        </div>
      </form>
    </div>
    <!-- Backdrop click to close -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute inset-0 -z-10" onclick={toggle}></div>
  </div>
{/if}
