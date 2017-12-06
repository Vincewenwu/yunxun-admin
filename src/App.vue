<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  ::-webkit-scrollbar/*整体部分*/
  {
    width: 6px;
    height:5px;
  }

  ::-webkit-scrollbar-track/*滑动轨道*/
  {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    border-radius: 0px;
    background: rgba(0,0,0,0.2);
  }

  ::-webkit-scrollbar-thumb/*滑块*/
  {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.2);
  }

  ::-webkit-scrollbar-thumb:hover/*滑块效果*/
  {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.2);
  }
</style>
