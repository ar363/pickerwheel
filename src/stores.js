import { writable } from 'svelte/store';

export const inps = writable(
  JSON.parse(localStorage.getItem('inps')) || [
    {value: '', selected: false},
  ]
);