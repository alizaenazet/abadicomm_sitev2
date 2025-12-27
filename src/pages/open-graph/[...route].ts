import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const collectionEntries = await getCollection('portfolios');
const pages = Object.fromEntries(collectionEntries.map(({ slug, data }) => [slug, data]));

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  // Change the page title spaces into `_` to make the pages name.
  pages: {
    homepage: {
      title: "Abadicomm Surabaya",
      description:
        "Kami menyediakan layanan manajemen acara yang kreatif dan profesional.",
    },
    partnership: {
      title: "Kerjasama dengan Abadicomm",
      description:
        "Jalin Kerjasama dengan Abadicomm untuk kesuksesan acara-acara kita.",
    },
    gallery: {
      title: "Galeri Abadicomm",
      description:
        "Lihat momen-momen berkesan dari acara-acara yang kami kelola.",
    },
    portfolios: {
        title: "Portofolio Abadicomm",
        description: "Jelajahi portofolio acara-acara sukses yang telah kami kelola.",
    },
    ...pages,
  },

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./public/abadicommLogo.png",
      size:[128,128],
    },
    font:{
        title: {
            color: [255,255,255],
            size: 64,
        },
        description:{
            color: [255,255,255]
        }
    },
    bgImage: {
       path: "./src/assets/OGBackground.jpeg",
       fit: "cover",
    },
    // There are a bunch more options you can use here!
    cacheDir: false,
  }),
});
