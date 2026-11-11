<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/portfolio'

const topics = [
  { id: 'ai', label: 'AI / ML role', icon: 'fa-solid fa-brain' },
  { id: 'web', label: 'Full-stack role', icon: 'fa-solid fa-code' },
  { id: 'freelance', label: 'Freelance project', icon: 'fa-solid fa-briefcase' },
  { id: 'hi', label: 'Just saying hi', icon: 'fa-regular fa-hand' },
]
const topic = ref('ai')

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const copied = ref(false)

const socials = [
  { href: profile.linkedin, icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope', label: 'Email' },
]

const facts = [
  { icon: 'fa-solid fa-bullseye', k: 'Open to', v: 'AI Engineer · Full-Stack Developer roles' },
  { icon: 'fa-solid fa-earth-asia', k: 'Location', v: `${profile.location} · PKT (UTC+5) · remote-friendly` },
  { icon: 'fa-solid fa-bolt', k: 'Response', v: 'Usually within 24 hours' },
]

// No backend: open the visitor's mail client with the message pre-filled.
const submit = () => {
  const subject = `${topics.find((t) => t.id === topic.value).label}: hello from ${form.name}`
  const body = `${form.message}\n\n— ${form.name} (${form.email})`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
  setTimeout(() => (sent.value = false), 4000)
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {}
}
</script>

<template>
  <section id="contact" class="relative overflow-hidden py-14 sm:py-20">
    <!-- Kinetic headline -->
    <div class="mb-12 overflow-hidden select-none" aria-hidden="true">
      <div class="flex w-max animate-marquee">
        <p
          v-for="n in 2"
          :key="n"
          class="flex items-center gap-8 pr-8 font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap"
        >
          <span class="text-fg">Let's talk</span>
          <i class="fa-solid fa-asterisk animate-spin-slow text-[0.5em] text-accent" />
          <span class="text-outline">Say hello</span>
          <i class="fa-solid fa-asterisk animate-spin-slow text-[0.5em] text-accent-3" />
        </p>
      </div>
    </div>

    <div class="container-x">
      <div v-reveal:zoom class="glass ring-glow relative grid overflow-hidden rounded-[2.5rem] lg:grid-cols-[0.95fr_1.05fr]">
        <!-- ============ Info side ============ -->
        <div class="relative overflow-hidden border-b border-line p-7 sm:p-10 lg:border-r lg:border-b-0">
          <!-- Mesh + 3D orbit decoration -->
          <div class="pointer-events-none absolute inset-0 -z-0">
            <div class="absolute -top-24 -left-24 size-80 rounded-full bg-accent/25 blur-3xl" />
            <div class="absolute -right-20 -bottom-24 size-80 rounded-full bg-accent-3/25 blur-3xl" />
            <div class="absolute -right-10 -bottom-10 size-64 [perspective:600px] opacity-70" aria-hidden="true">
              <div class="absolute inset-0 preserve-3d [transform:rotateX(70deg)]">
                <div class="absolute inset-0 animate-[ring-spin_14s_linear_infinite] rounded-full border border-accent/40" />
                <div class="absolute inset-8 animate-[ring-spin_10s_linear_infinite_reverse] rounded-full border border-dashed border-accent-3/50" />
              </div>
              <i class="fa-solid fa-paper-plane absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float text-4xl text-accent" />
            </div>
          </div>

          <div class="relative">
            <p class="eyebrow">
              <span class="grid size-8 place-items-center rounded-full border border-line font-mono text-[10px] tracking-normal text-fg">07</span>
              Contact
            </p>
            <h2 class="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-fg sm:text-5xl">
              Let's build something
              <span class="text-gradient italic">intelligent.</span>
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Whether you're hiring for AI or for the web, or you have a product idea, I'd love to hear about it.
            </p>

            <ul class="mt-8 space-y-4">
              <li v-for="f in facts" :key="f.k" class="flex items-start gap-3.5">
                <span class="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-fg/[0.04] text-sm text-accent-ink">
                  <i :class="f.icon" />
                </span>
                <span>
                  <span class="block font-mono text-[10px] tracking-widest text-subtle uppercase">{{ f.k }}</span>
                  <span class="block text-sm font-semibold text-fg">{{ f.v }}</span>
                </span>
              </li>
            </ul>

            <!-- Email pill -->
            <button
              type="button"
              class="group mt-8 flex w-full max-w-md items-center gap-3 rounded-2xl border border-line bg-[color-mix(in_oklab,var(--bg)_50%,transparent)] p-2 pr-4 text-left transition hover:border-accent/60"
              @click="copyEmail"
            >
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-on-accent">
                <Transition name="swap" mode="out-in">
                  <i v-if="copied" key="ok" class="fa-solid fa-check" />
                  <i v-else key="c" class="fa-regular fa-copy" />
                </Transition>
              </span>
              <span class="min-w-0 flex-1 truncate font-semibold text-fg">{{ profile.email }}</span>
              <span class="font-mono text-[10px] text-subtle uppercase">{{ copied ? 'copied' : 'copy' }}</span>
            </button>

            <div class="mt-5 flex items-center gap-2">
              <a
                v-for="s in socials"
                :key="s.label"
                v-magnetic="0.35"
                :href="s.href"
                :aria-label="s.label"
                target="_blank"
                rel="noopener"
                class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                <i :class="s.icon" />
              </a>
              <a :href="profile.resume" download class="ml-2 inline-flex items-center gap-2 text-sm font-semibold text-fg transition hover:text-accent-ink">
                <i class="fa-solid fa-arrow-down text-xs" /> Resume
              </a>
            </div>
          </div>
        </div>

        <!-- ============ Form side ============ -->
        <form class="relative p-7 sm:p-10" @submit.prevent="submit">
          <p class="font-display text-2xl font-bold tracking-tight text-fg">Send a message</p>
          <p class="mt-1 text-sm text-muted">Pick a topic and I'll get back to you.</p>

          <fieldset class="mt-6">
            <legend class="sr-only">Topic</legend>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="t in topics"
                :key="t.id"
                class="flex cursor-pointer items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-sm font-medium transition-all duration-300"
                :class="topic === t.id ? 'border-accent bg-accent/10 text-fg shadow-[0_8px_24px_-12px_var(--accent)]' : 'border-line text-muted hover:border-fg/25 hover:text-fg'"
              >
                <input v-model="topic" type="radio" name="topic" :value="t.id" class="sr-only" />
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-lg text-xs transition-colors"
                  :class="topic === t.id ? 'bg-accent text-on-accent' : 'bg-fg/5'"
                >
                  <i :class="t.icon" />
                </span>
                {{ t.label }}
              </label>
            </div>
          </fieldset>

          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <label class="relative block">
              <input v-model="form.name" type="text" required placeholder=" " class="field peer" />
              <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted transition-all duration-300 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px]">Your name</span>
            </label>
            <label class="relative block">
              <input v-model="form.email" type="email" required placeholder=" " class="field peer" />
              <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted transition-all duration-300 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px]">Email address</span>
            </label>
            <label class="relative block sm:col-span-2">
              <textarea v-model="form.message" required rows="4" placeholder=" " class="field peer resize-none" />
              <span class="pointer-events-none absolute top-5 left-4 text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]">Tell me about the role or project…</span>
            </label>
          </div>

          <button type="submit" class="btn-accent group mt-5 w-full !py-4 text-base">
            <Transition name="swap" mode="out-in">
              <span v-if="sent" key="sent"><i class="fa-solid fa-check mr-2" />Opening your email app…</span>
              <span v-else key="send">Send message <i class="fa-solid fa-paper-plane ml-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </Transition>
          </button>
          <p class="mt-3 text-center font-mono text-[10px] text-subtle">Opens your email app · nothing is stored on this site</p>
        </form>
      </div>
    </div>
  </section>
</template>
