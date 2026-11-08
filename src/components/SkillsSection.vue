<script setup>
import { computed, ref } from 'vue'
import { skillGroups } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'
import TechIcon from './TechIcon.vue'

const active = ref(skillGroups[0].id)
const current = computed(() => skillGroups.find((g) => g.id === active.value))
const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)
</script>

<template>
  <section id="skills" class="relative py-24 sm:py-32">
    <div class="container-x">
      <SectionHeading
        index="03"
        eyebrow="Stack"
        title="The toolbox."
        description="Languages, frameworks and tools I use to take AI ideas to production."
      />

      <div v-reveal class="panel overflow-hidden shadow-2xl shadow-black/5">
        <!-- Window chrome -->
        <div class="flex items-center gap-1.5 border-b border-line bg-surface-2/60 px-4 py-3">
          <span class="size-2.5 rounded-full bg-[#ff5f57]" />
          <span class="size-2.5 rounded-full bg-[#febc2e]" />
          <span class="size-2.5 rounded-full bg-[#28c840]" />
          <span class="ml-3 font-mono text-[11px] text-subtle">~/skills</span>
          <span class="ml-auto hidden font-mono text-[11px] text-subtle sm:block">{{ skillGroups.length }} folders · {{ total }} files</span>
        </div>

        <div class="grid md:grid-cols-[250px_1fr]">
          <!-- Explorer -->
          <aside class="min-w-0 border-b border-line p-3 md:border-r md:border-b-0">
            <p class="hidden px-3 pt-1 pb-2 font-mono text-[10px] tracking-widest text-subtle uppercase md:block">Explorer</p>
            <ul class="flex gap-1 overflow-x-auto pb-1 md:flex-col md:pb-0">
              <li v-for="group in skillGroups" :key="group.id">
                <button
                  type="button"
                  class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-mono text-[13px] whitespace-nowrap transition-colors"
                  :class="active === group.id ? 'bg-accent/12 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'"
                  @click="active = group.id"
                >
                  <i
                    class="fa-solid w-4 text-xs"
                    :class="active === group.id ? 'fa-folder-open text-accent-ink' : 'fa-folder text-subtle'"
                  />
                  {{ group.id }}/
                  <span class="ml-auto pl-3 text-[11px] text-subtle">{{ group.skills.length }}</span>
                </button>
              </li>
            </ul>
          </aside>

          <!-- Folder contents -->
          <div class="min-h-[22rem] min-w-0 p-5 sm:p-8">
            <Transition name="swap" mode="out-in">
              <div :key="current.id">
                <div class="flex items-center gap-3">
                  <span class="grid size-11 place-items-center rounded-xl bg-brand-gradient text-on-accent">
                    <i :class="current.icon" />
                  </span>
                  <div>
                    <h3 class="text-xl font-semibold tracking-tight text-fg">{{ current.label }}</h3>
                    <p class="font-mono text-xs text-subtle">~/skills/{{ current.id }}/</p>
                  </div>
                </div>

                <ul class="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
                  <li
                    v-for="(skill, i) in current.skills"
                    :key="skill"
                    class="group flex animate-rise items-center gap-3 rounded-xl border border-line bg-surface-2/50 px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
                    :style="{ animationDelay: `${i * 35}ms` }"
                  >
                    <span class="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface transition-transform duration-300 group-hover:scale-110">
                      <TechIcon :name="skill" size="size-5" />
                    </span>
                    <span class="text-sm leading-tight text-fg">{{ skill }}</span>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
