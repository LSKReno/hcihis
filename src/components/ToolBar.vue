<template>
  <div class="toolbar">
    <slot></slot>
  </div>
</template>

<style>
  .toolbar {
    width: 100%;
    padding: 8px;
    background-color: #ffffff;
    overflow: hidden;
    line-height: 32px;
    border: 1px solid #e6ebf5;
    border-top-left-radius:15px;
    border-top-right-radius: 15px;
  }
</style>
