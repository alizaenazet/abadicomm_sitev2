<script lang="ts">
  import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "@lucide/svelte";
</script>

<footer class="bg-secondary/30 pt-16 pb-8 border-t">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <!-- Brand -->
      <div class="space-y-4">
        <a href="/" class="text-2xl font-bold tracking-tighter block">
          Abadi<span class="text-primary">Comm</span>
        </a>
        <p class="text-muted-foreground text-sm leading-relaxed">
          Best and trusted Event Organizer in Surabaya, Indonesia. Creating memorable experiences with creativity and professionalism.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            <Instagram class="w-5 h-5" />
          </a>
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            <Facebook class="w-5 h-5" />
          </a>
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Links -->
      <div>
        <h3 class="font-semibold mb-6">Quick Links</h3>
        <ul class="space-y-3 text-sm text-muted-foreground">
          <li><a href="/" class="hover:text-foreground transition-colors">Home</a></li>
          <li><a href="/portfolios" class="hover:text-foreground transition-colors">Portfolios</a></li>
          <li><a href="/gallery" class="hover:text-foreground transition-colors">Gallery</a></li>
          <li><a href="/partnership" class="hover:text-foreground transition-colors">Partnership</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h3 class="font-semibold mb-6">Services</h3>
        <ul class="space-y-3 text-sm text-muted-foreground">
          <li>Concept Creation</li>
          <li>Event Production</li>
          <li>Talent Management</li>
          <li>Venue Decoration</li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="font-semibold mb-6">Contact Us</h3>
        <ul class="space-y-4 text-sm text-muted-foreground">
          <li class="flex gap-3">
            <MapPin class="w-5 h-5 shrink-0 text-primary" />
            <span>Jl. Tunjungan No. 123,<br>Surabaya, East Java 60275</span>
          </li>
          <li class="flex gap-3 items-center">
            <Mail class="w-5 h-5 shrink-0 text-primary" />
            <a href="mailto:hello@abadicomm.id" class="hover:text-foreground">hello@abadicomm.id</a>
          </li>
          <li class="flex items-center gap-3">
            <Phone class="w-5 h-5 shrink-0 text-primary" />
            <a href="tel:+6281234567890" class="hover:text-foreground">+62 812 3456 7890</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t pt-8 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Abadicomm Event Organizer. All rights reserved.</p>
    </div>
  </div>
</footer>
