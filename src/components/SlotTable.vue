<template>
  <table v-if="computedHeaders.length" class="generic-table">
    <thead>
      <tr>
        <th v-for="header in computedHeaders" :key="header.key" @click="sortBy(header.key)">
          {{ header.label }}
          <MaterialSymbolsArrowDropUp v-if="sortKey === header.key && sortOrder === 'asc'" class="sort-icon" />
          <MaterialSymbolsArrowDropDown v-else-if="sortKey === header.key && sortOrder === 'desc'" class="sort-icon" />
          <MaterialSymbolsArrowRight v-else class="sort-icon" />
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in paginatedItems" :key="item.id">
        <td v-for="header in computedHeaders" :key="header.key">
          <template v-if="props.badgeColumns[header.key]">
            <span class="status-badge" :class="props.badgeColumns[header.key].classes[item[header.key]] || ''">
              {{
                props.badgeColumns[header.key].textMap
                  ? props.badgeColumns[header.key].textMap[item[header.key]]
                  : item[header.key]
              }}
            </span>
          </template>
          <template v-else>
            {{ item[header.key] }}
          </template>
        </td>
        <td>
          <button @click="emit('edit', item)" class="edit-button">
            <MaterialSymbolsEditRounded />
          </button>
          <button @click="emit('delete', item.id)" class="delete-button">
            <MaterialSymbolsDeleteRounded />
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="totalPages > 1" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">
      <MaterialSymbolsKeyboardDoubleArrowLeftRounded />
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      <MaterialSymbolsKeyboardDoubleArrowRightRounded />
    </button>
  </div>
</template>

<script setup>
import MaterialSymbolsArrowDropUp from '~icons/material-symbols/arrow-drop-up'
import MaterialSymbolsArrowDropDown from '~icons/material-symbols/arrow-drop-down'
import MaterialSymbolsArrowRight from '~icons/material-symbols/arrow-right'
import MaterialSymbolsEditRounded from '~icons/material-symbols/edit-rounded'
import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded'
import MaterialSymbolsKeyboardDoubleArrowLeftRounded from '~icons/material-symbols/keyboard-double-arrow-left-rounded'
import MaterialSymbolsKeyboardDoubleArrowRightRounded from '~icons/material-symbols/keyboard-double-arrow-right-rounded'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  badgeColumns: {
    type: Object,
    default: () => ({}),
  },
})


const emit = defineEmits(['edit', 'delete'])

const sortKey = ref(null) // Initialize to null
const sortOrder = ref('asc')
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Helper to create nice labels from object keys (e.g., 'fname' -> 'Fname')
const formatHeaderLabel = (key) => {
  if (!key) return ''
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// FIX 4: Correctly generate an array of {key, label} objects
const computedHeaders = computed(() => {
  if (!props.items.length) return []
  return Object.keys(props.items[0]).map(key => ({
    key: key,
    label: formatHeaderLabel(key)
  }))
})

// FIX 5: Use a watcher to set the default sort key AFTER headers are available
watch(computedHeaders, (newHeaders) => {
  // If sortKey hasn't been set yet and we now have headers, set it to the first one.
  if (!sortKey.value && newHeaders.length > 0) {
    sortKey.value = newHeaders[0].key
  }
})

const sortedItems = computed(() => {
  if (!props.items || props.items.length === 0) return []

  return [...props.items].sort((a, b) => {
    // If no sort key is set yet, don't sort.
    if (!sortKey.value) return 0;

    const valA = a[sortKey.value]
    const valB = b[sortKey.value]

    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder.value === 'asc' ? valA - valB : valB - valA;
    } else {
      return sortOrder.value === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    }
  })
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedItems.value.slice(start, end)
})

const totalPages = computed(() => {
  if (!sortedItems.value.length) return 1
  return Math.ceil(sortedItems.value.length / itemsPerPage.value)
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
