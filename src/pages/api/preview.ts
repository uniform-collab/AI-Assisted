import { createPreviewHandler } from "@uniformdev/canvas-next";

const handler = createPreviewHandler({
  // this is set in .env to an arbitrary value
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || "hello-world",
  // optionally configure the playground route to enable previewing patterns
  playgroundPath: "/playground",
});

export default handler;
