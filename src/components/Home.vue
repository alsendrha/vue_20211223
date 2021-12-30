<template>
  <div>
    <h3>Home.vue</h3>
    <vueper-slides autoplay="true" Default="12">
      <vueper-slide v-for="(tmp, idx) in items" 
      :key="idx" 
      :title="items.title" 
      :content="items.content"
      :image="tmp.image" @click="handleClick(idx)" />
    </vueper-slides>
  </div>
</template>

<script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  export default {
    components: { 
      VueperSlides, VueperSlide 

    },
    data(){
      return{
        items : [
          {title : 'a', content : 'b', image : 'https://picsum.photos/500/300?image=1'},
          {title : 'a', content : 'b', image : 'https://picsum.photos/500/300?image=2'},
          {title : 'a', content : 'b', image : 'https://picsum.photos/500/300?image=3'},
        ],
      }
    },
    methods:{
      handleClick(idx){
        this.$router.push({name:'Board'});
        console.log(idx);
      }
    }
    
  }
</script>

<style scoped>

</style>