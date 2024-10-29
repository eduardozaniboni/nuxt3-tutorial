<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav class="flex items-center justify-between flex-wrap bg-teal-700 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <NuxtLink to="/">
          <span class="font-semibold text-2xl tracking-tight">VideoFlix</span>
        </NuxtLink>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path :class="{ hidden: isOpen, 'inline-block': !isOpen }" class="fill-current" d="M0 0h20v20H0z" />
            <path :class="{ hidden: !isOpen, 'inline-block': isOpen }" class="fill-current" d="M0 0h20v20H0z" />
          </svg>
        </button>
      </div>
      <div :class="{ hidden: !isOpen, block: isOpen }" class="w-full block lg:flex lg:items-center lg:w-auto">
        <div class="text-sm" v-for="rota in rotasSistemas()" :key="rota.nome">
          <NuxtLink
            v-if="!rota.permissao || rota.permissao === user?.permissao"
            :to="rota.path"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            {{ rota.nome }}
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="primary"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
          <select v-model="locale" class="ml-8">
            <option value="pt">pt</option>
            <option value="en">en</option>
          </select>
          <ClientOnly v-if="loggedIn">
            <LayoutUsuario class="mx-2" />
          </ClientOnly>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <UContainer class="my-4 flex-grow w-full">
      <slot />
    </UContainer>

    <!-- Divider at the bottom -->
    <UDivider
      class="mt-auto mb-10"
      label="Eduardo Zaniboni"
      :ui="{ label: 'text-primary-500 dark:text-primary-400' }"
    />
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const { user, clear, loggedIn } = useUserSession();
const isOpen = ref(false);
const colorMode = useColorMode();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>

<style></style>

