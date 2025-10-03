import { UniformPlayground } from "@uniformdev/canvas-react";

export default function Playground() {
  // wrap UniformPlayground in your page shell/styles to wrap the pattern previews with
  return <UniformPlayground behaviorTracking="onLoad" />;
}
