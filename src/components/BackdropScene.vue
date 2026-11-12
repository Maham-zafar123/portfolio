<template>
  <!--
    Fixed colour field behind the glass. Deliberately static: anything moving here
    forces every translucent panel above it to repaint on every frame.
  -->
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
    <div class="absolute inset-0" :style="{ opacity: 'var(--blob-opacity)' }">
      <div
        class="absolute -top-[20vh] -left-[10vw] size-[70vmax] rounded-full"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent)"
      />
      <div
        class="absolute top-[25vh] -right-[20vw] size-[65vmax] rounded-full"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent-3) 60%, transparent), transparent)"
      />
      <div
        class="absolute -bottom-[30vh] left-[20vw] size-[60vmax] rounded-full"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent-2) 45%, transparent), transparent)"
      />
    </div>

    <!-- 3D grid floor -->
    <div class="absolute inset-x-0 bottom-0 h-[50vh] [perspective:600px]">
      <div
        class="grid-lines absolute inset-x-[-60%] -bottom-1/2 h-[200%] origin-bottom [transform:rotateX(70deg)] [mask-image:linear-gradient(to_top,black_10%,transparent_60%)]"
      />
    </div>

    <!-- Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)] opacity-70" />
  </div>
</template>
