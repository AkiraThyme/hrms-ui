<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <a
            :class="{ selected: activeSection === 'employee' }"
            @click.prevent="navigateTo('employee')"
          >
            <i class="icon"><IconMdiAccount /></i>
            Employee
          </a>
        </li>
        <li>
          <a
            :class="{ selected: activeSection === 'department' }"
            @click.prevent="navigateTo('department')"
          >
            <i class="icon"><IconMdiOfficeBuilding /></i>
            Department
          </a>
        </li>
        <li>
          <a
            :class="{ selected: activeSection === 'payslip' }"
            @click.prevent="navigateTo('payslip')"
          >
            <i class="icon"><IconMdiFileDocument /></i>
            Payslip
          </a>
        </li>
        <li>
          <a
            :class="{ selected: activeSection === 'reports' }"
            @click.prevent="navigateTo('reports')"
          >
            <i class="icon"><IconMdiChartBar /></i>
            Reports
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import IconMdiAccount from '~icons/mdi/account';
import IconMdiOfficeBuilding from '~icons/mdi/office-building';
import IconMdiFileDocument from '~icons/mdi/file-document';
import IconMdiChartBar from '~icons/mdi/chart-bar';

const activeSection = ref(null);
const router = useRouter();

function navigateTo(section) {
  activeSection.value = section;
  router.push({ name: section });
}
</script>
