<template>
    <div class="page-loading">
        
    </div>
</template>
<style lang="scss" scoped>
    @function rem($px){
        @return $px / ($px * 0 + 1) / 37.5 * 1rem;
    }

    .page-loading{
        position: fixed;
        top: 0;
        left: 0;
        bottom:0;
        right: 0;
        z-index:9999;
        background:url(../../assets/images/common/loading.gif) center center no-repeat, rgba(0,0,0, .6);   
        background-size:20%;     
    }
</style>
