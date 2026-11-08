<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/portfolio'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sent = ref(false)
const copied = ref(false)

const channels = [
  { label: 'LinkedIn', value: 'in/maham-zafar', href: profile.linkedin, icon: 'fa-brands fa-linkedin-in' },
  { label: 'GitHub', value: '@Maham-zafar123', href: profile.github, icon: 'fa-brands fa-github' },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope' },
]

// No backend: open the visitor's mail client with the message pre-filled.
const submit = () => {
  const body = `${form.message}\n\n— ${form.name} (${form.email})`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
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
  <section id="contact" class="relative isolate overflow-hidden py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -bottom-48 left-1/4 size-[32rem] rounded-full bg-accent/10 blur-[120px]" />
      <div class="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_65%)]" />
    </div>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />

    <div class="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div v-reveal:left>
        <p class="flex items-center gap-3 font-mono text-xs text-accent-ink">
          <span>[06]</span><span class="h-px w-10 bg-accent/60" /><span class="tracking-[0.2em] uppercase">Contact</span>
        </p>
        <h2 class="mt-5 text-5xl font-semibold tracking-tighter text-balance text-fg sm:text-6xl">
          Let's build something <span class="text-gradient">intelligent.</span>
        </h2>
        <p class="mt-6 max-w-md text-lg text-muted">
          Open to full-time roles, freelance projects and collaborations in AI and full-stack engineering.
        </p>

        <button type="button" class="group mt-10 flex max-w-full items-center gap-3 text-left" @click="copyEmail">
          <span class="truncate text-xl font-medium text-fg underline decoration-accent decoration-2 underline-offset-8 sm:text-2xl">
            {{ profile.email }}
          </span>
          <span class="grid size-9 shrink-0 place-items-center rounded-full border border-line text-sm text-muted transition group-hover:border-accent group-hover:text-accent-ink">
            <Transition name="fade" mode="out-in">
              <i v-if="copied" key="ok" class="fa-solid fa-check" />
              <i v-else key="copy" class="fa-regular fa-copy" />
            </Transition>
          </span>
        </button>
        <p class="mt-2 h-4 font-mono text-[11px] text-accent-ink">{{ copied ? 'copied to clipboard ✓' : '' }}</p>

        <ul class="mt-8 border-t border-line">
          <li v-for="c in channels" :key="c.label" class="border-b border-line">
            <a
              :href="c.href"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-4 py-4 transition-all duration-300 hover:pl-2"
            >
              <i :class="c.icon" class="w-5 text-lg text-muted transition group-hover:text-accent-ink" />
              <span class="font-medium text-fg">{{ c.label }}</span>
              <span class="ml-auto truncate font-mono text-xs text-subtle">{{ c.value }}</span>
              <i class="fa-solid fa-arrow-right text-xs text-subtle transition group-hover:translate-x-1 group-hover:text-accent-ink" />
            </a>
          </li>
        </ul>
      </div>

      <form v-reveal:right class="panel self-start overflow-hidden shadow-2xl shadow-black/10" @submit.prevent="submit">
        <div class="flex items-center gap-1.5 border-b border-line bg-surface-2/60 px-4 py-3">
          <span class="size-2.5 rounded-full bg-[#ff5f57]" />
          <span class="size-2.5 rounded-full bg-[#febc2e]" />
          <span class="size-2.5 rounded-full bg-[#28c840]" />
          <span class="ml-3 font-mono text-[11px] text-subtle">~/contact/new-message.md</span>
        </div>
        <div class="space-y-5 p-6 sm:p-8">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-2 block font-mono text-xs text-muted"><span class="text-accent-ink">$</span> name</span>
              <input v-model="form.name" required type="text" placeholder="Ada Lovelace" class="field" />
            </label>
            <label class="block">
              <span class="mb-2 block font-mono text-xs text-muted"><span class="text-accent-ink">$</span> email</span>
              <input v-model="form.email" required type="email" placeholder="you@company.com" class="field" />
            </label>
          </div>
          <label class="block">
            <span class="mb-2 block font-mono text-xs text-muted"><span class="text-accent-ink">$</span> subject</span>
            <input v-model="form.subject" required type="text" placeholder="Let's work together" class="field" />
          </label>
          <label class="block">
            <span class="mb-2 block font-mono text-xs text-muted"><span class="text-accent-ink">$</span> message</span>
            <textarea v-model="form.message" required rows="5" placeholder="Tell me about the role or project…" class="field resize-none" />
          </label>
          <button type="submit" class="btn-accent w-full !py-3">
            <Transition name="fade" mode="out-in">
              <span v-if="sent" key="sent"><i class="fa-solid fa-check mr-2" />Opening your email app…</span>
              <span v-else key="send"><i class="fa-solid fa-paper-plane mr-2" />Send message</span>
            </Transition>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
