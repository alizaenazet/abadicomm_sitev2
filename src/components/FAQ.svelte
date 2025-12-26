<script lang="ts">
  import { ChevronDown, ChevronUp } from "@lucide/svelte";
  import { slide } from "svelte/transition";

  export let faqs = [
    {
      question: "Apa saja layanan eo? Abadicomm?",
      answer: "Kami menyediakan layanan lengkap mulai dari Konsep Kreatif, Produksi Acara, Manajemen Talenta, hingga Dekorasi Venue untuk berbagai jenis acara seperti Corporate Gathering, Wedding, Konser Musik, dan Pameran."
    },
    {
      question: "Apakah melayani acara di luar Surabaya?",
      answer: "Ya, meskipun basis kami di Surabaya, kami siap melayani kebutuhan acara di seluruh Indonesia dengan tim yang profesional dan berpengalaman."
    },
    {
      question: "Bagaimana cara memesan jasa Abadicomm?",
      answer: "Anda dapat menghubungi kami melalui tombol 'Contact US' di website ini atau melalui WhatsApp yang tertera. Tim kami akan segera menjadwalkan konsultasi gratis untuk membahas kebutuhan acara Anda."
    }
  ];

  let openIndex: number | null = null;
  // Initialize to null, type explicitly to be safe, though inference should work.

  const toggle = (index: number) => {
    openIndex = openIndex === index ? null : index;
  };
</script>

<div class="space-y-4 max-w-2xl mx-auto">
  {#each faqs as faq, i}
    <div class="border rounded-lg overflow-hidden">
      <button
        class="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-muted/50 transition-colors"
        onclick={() => toggle(i)}
      >
        <span>{faq.question}</span>
        {#if openIndex === i}
          <ChevronUp class="w-5 h-5 text-muted-foreground" />
        {:else}
          <ChevronDown class="w-5 h-5 text-muted-foreground" />
        {/if}
      </button>
      {#if openIndex === i}
        <div transition:slide class="p-4 pt-0 text-muted-foreground text-sm leading-relaxed">
          {faq.answer}
        </div>
      {/if}
    </div>
  {/each}
</div>
