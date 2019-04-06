<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  
  mounted(){
    this.$axios({
      url:"/admin/account/islogin"
    }).then(res => {
      console.log(res.data);
      if(res.data.code == "nologin"){
        this.$router.push('/login')
      }
      
    })
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}


</style>
