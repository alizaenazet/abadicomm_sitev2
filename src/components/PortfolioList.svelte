<script lang="ts">
    import { ArrowRight, Check, Filter } from "@lucide/svelte";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";

    // Define interface locally or import from a shared type file
    interface PortfolioItem {
        id: string; // This will be the slug from Astro
        slug: string;
        title: string;
        categories: string[];
        year: string;
        hosters: string[];
        description: string;
        thumbnail: string;
        images: string[];
    }

    export let items: PortfolioItem[] = [];

    let selectedCategories: string[] = [];
    let selectedYears: string[] = [];
    let isFiltersOpen = false;

    // Get unique categories and years
    $: categories = [
        ...new Set(items.flatMap((item) => item.categories)),
    ].sort();
    $: years = [...new Set(items.map((item) => item.year))].sort().reverse();

    // Initialize from URL on mount
    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get("categories");
        const yearParam = params.get("years");

        if (categoryParam) {
            selectedCategories = categoryParam.split(",");
        }

        if (yearParam) {
            selectedYears = yearParam.split(",");
        }

        // Handle back/forward browser buttons
        window.addEventListener("popstate", () => {
            const p = new URLSearchParams(window.location.search);
            const c = p.get("categories");
            const y = p.get("years");

            selectedCategories = c ? c.split(",") : [];
            selectedYears = y ? y.split(",") : [];
        });
    });

    // Update URL helper
    const updateURL = (cats: string[], yrs: string[]) => {
        const params = new URLSearchParams();
        if (cats.length > 0) params.set("categories", cats.join(","));
        if (yrs.length > 0) params.set("years", yrs.join(","));

        const queryString = params.toString();
        const url = queryString ? `?${queryString}` : window.location.pathname;

        window.history.pushState({}, "", url);
    };

    // Toggle helper
    const toggleSelection = (list: string[], item: string) => {
        if (list.includes(item)) {
            return list.filter((i) => i !== item);
        } else {
            return [...list, item];
        }
    };

    const toggleCategory = (cat: string) => {
        selectedCategories = toggleSelection(selectedCategories, cat);
        updateURL(selectedCategories, selectedYears);
    };

    const toggleYear = (year: string) => {
        selectedYears = toggleSelection(selectedYears, year);
        updateURL(selectedCategories, selectedYears);
    };

    const clearFilters = () => {
        selectedCategories = [];
        selectedYears = [];
        updateURL([], []);
    };

    $: filteredItems = items.filter((item) => {
        const categoryMatch =
            selectedCategories.length === 0 ||
            item.categories.some((c) => selectedCategories.includes(c));
        const yearMatch =
            selectedYears.length === 0 || selectedYears.includes(item.year);
        return categoryMatch && yearMatch;
    });
</script>

<div class="space-y-8">
    <!-- Mobile Filter Toggle -->
    <button
        class="md:hidden w-full flex items-center justify-between px-6 py-4 bg-secondary/30 rounded-xl border font-semibold"
        onclick={() => (isFiltersOpen = !isFiltersOpen)}
    >
        <div class="flex items-center gap-2">
            <Filter class="w-5 h-5" />
            Filters
        </div>
        <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {selectedCategories.length + selectedYears.length} Active
        </span>
    </button>

    <!-- Filters Container -->
    {#if isFiltersOpen}
        <div
            transition:slide
            class="bg-secondary/30 p-6 rounded-2xl border space-y-6 md:hidden"
        >
            <!-- Categories -->
            <div class="space-y-3">
                <span
                    class="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                    >Kategori</span
                >
                <div class="flex flex-wrap gap-2">
                    {#each categories as category}
                        <button
                            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2
                    {selectedCategories.includes(category)
                                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                : 'bg-background hover:bg-muted text-foreground border-transparent'}"
                            onclick={() => toggleCategory(category)}
                        >
                            {#if selectedCategories.includes(category)}
                                <Check class="w-3.5 h-3.5" />
                            {/if}
                            {category}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Years -->
            <div class="space-y-3 pt-4 border-t border-border/50">
                <span
                    class="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                    >Tahun</span
                >
                <div class="flex flex-wrap gap-2">
                    {#each years as year}
                        <button
                            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2
                    {selectedYears.includes(year)
                                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                : 'bg-background hover:bg-muted text-foreground border-transparent'}"
                            onclick={() => toggleYear(year)}
                        >
                            {#if selectedYears.includes(year)}
                                <Check class="w-3.5 h-3.5" />
                            {/if}
                            {year}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Active Filters Summary & Clear -->
            {#if selectedCategories.length > 0 || selectedYears.length > 0}
                <div class="pt-4 flex justify-between items-center text-sm">
                    <span class="text-muted-foreground">
                        Showing {filteredItems.length} result{filteredItems.length !==
                        1
                            ? "s"
                            : ""}
                    </span>
                    <button
                        class="text-destructive hover:underline font-medium"
                        onclick={clearFilters}
                    >
                        Clear all filters
                    </button>
                </div>
            {/if}
        </div>
    {/if}

    <!-- Desktop Filters (Always Visible) -->
    <div
        class="hidden md:block bg-secondary/30 p-6 rounded-2xl border space-y-6"
    >
        <!-- Categories -->
        <div class="space-y-3">
            <span
                class="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                >Categories</span
            >
            <div class="flex flex-wrap gap-2">
                {#each categories as category}
                    <button
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2
                {selectedCategories.includes(category)
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-background hover:bg-muted text-foreground border-transparent'}"
                        onclick={() => toggleCategory(category)}
                    >
                        {#if selectedCategories.includes(category)}
                            <Check class="w-3.5 h-3.5" />
                        {/if}
                        {category}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Years -->
        <div class="space-y-3 pt-4 border-t border-border/50">
            <span
                class="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                >Years</span
            >
            <div class="flex flex-wrap gap-2">
                {#each years as year}
                    <button
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2
                {selectedYears.includes(year)
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-background hover:bg-muted text-foreground border-transparent'}"
                        onclick={() => toggleYear(year)}
                    >
                        {#if selectedYears.includes(year)}
                            <Check class="w-3.5 h-3.5" />
                        {/if}
                        {year}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Active Filters Summary & Clear -->
        {#if selectedCategories.length > 0 || selectedYears.length > 0}
            <div class="pt-4 flex justify-between items-center text-sm">
                <span class="text-muted-foreground">
                    Showing {filteredItems.length} result{filteredItems.length !==
                    1
                        ? "s"
                        : ""}
                </span>
                <button
                    class="text-destructive hover:underline font-medium"
                    onclick={clearFilters}
                >
                    Clear all filters
                </button>
            </div>
        {/if}
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredItems as item (item.id)}
            <a
                href={`/portfolios/${item.slug}`}
                class="group block bg-background border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
            >
                <div class="relative aspect-[3/2] overflow-hidden">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <span
                            class="inline-flex items-center gap-2 text-white font-medium border border-white/30 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
                        >
                            View Detail <ArrowRight class="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <div class="p-5 space-y-3">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-wrap gap-1">
                            {#each item.categories.slice(0, 2) as cat}
                                <span
                                    class="inline-block px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full"
                                >
                                    {cat}
                                </span>
                            {/each}
                            {#if item.categories.length > 2}
                                <span
                                    class="inline-block px-1.5 py-1 text-xs text-muted-foreground"
                                    >+</span
                                >
                            {/if}
                        </div>
                        <span
                            class="text-xs font-medium text-muted-foreground border px-2 py-1 rounded-md shrink-0"
                        >
                            {item.year}
                        </span>
                    </div>
                    <h3
                        class="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1"
                    >
                        {item.title}
                    </h3>
                    <p class="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                    </p>
                    <div
                        class="pt-3 flex items-center gap-2 text-xs text-muted-foreground border-t mt-3"
                    >
                        <span class="font-semibold text-foreground"
                            >Peyelenggara:</span
                        >
                        {item.hosters[0]}
                        {item.hosters.length > 1
                            ? `+${item.hosters.length - 1} others`
                            : ""}
                    </div>
                </div>
            </a>
        {/each}
    </div>

    {#if filteredItems.length === 0}
        <div
            class="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed"
        >
            <p class="text-lg text-muted-foreground">
                No portfolios found matching your filters.
            </p>
            <button
                class="mt-4 text-primary hover:underline"
                onclick={clearFilters}
            >
                Clear Filters
            </button>
        </div>
    {/if}
</div>
