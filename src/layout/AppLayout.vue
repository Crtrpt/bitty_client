<template>
   <div class="applayout">
       <div class="flex flex-row h-screen w-screen">
     
      <Workspace class="flex flex-row grow overflow-hidden">
        <Header class="shadow"></Header>
          <router-view  v-slot="{ Component }">
            <transition>
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
       
      </Workspace>
      <!-- <Footer></Footer> -->
    </div>
   </div>
</template>
<script lang="ts">
export default {
  name: "AppLayout",
};
</script>
