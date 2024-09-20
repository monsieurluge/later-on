<template>
    <menu>
        <ListMenuButton
            label="today"
            left="true"
            :active="current === 'today'"
            @click="$emit('today-clicked')"
        />
        <ListMenuButton
            label="tomorrow"
            right="true"
            :active="current === 'tomorrow'"
            @click="$emit('tomorrow-clicked')"
        />
    </menu>
</template>

<script setup>
import { defineProps } from 'vue'
import ListMenuButton from './ListMenuButton'

defineProps(['current'])
</script>

<style scoped>
menu {
    margin: 0 0 3px;
    padding: 0;
    display: flex;
    gap: 1px;
    justify-content: space-between;
}
</style>
