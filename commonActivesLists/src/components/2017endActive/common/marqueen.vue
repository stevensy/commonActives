<template>
    <div class="marqueen">
        <ul class="resultList" ref="result">                     
            <li v-for="item in datalist" :key="item">{{item}}</li>
        </ul>
        <ul class="resultList" ref="result1">                     
            <li v-for="item in datalist" :key="item">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default{
    name:"marqueen",
    props: ["datalist"],
    data(){
        return {

        }
    },
    mounted(){},
    methods:{
        //滚屏
        marqueen(){
            /* 
            * top:第一个ul的top值
            * top1: 第二个ul的top值
            * h: ul的高度
            * ch: 父组件容器的高度
            */
            let top = 0,top1 = 0, h = this.$refs.result.firstChild.offsetHeight * this.datalist.length, ch = this.$parent.$refs.marqueen.$el.parentNode.parentNode.offsetHeight;
            if(this.datalist.length>6){
                setInterval(_ => {
                    top--;
                    top1--;
                    if(2*h - Math.abs(top) <= ch) top =  ch;
                    if(h - Math.abs(top) >=ch && Math.abs(top1)>= 3*h - ch) top1 = -( h - ch);
                    this.$refs.result.style.top = top + "px";
                    this.$refs.result1.style.top = top1  + "px";
                }, 50);
            }             
        },
    }
}
</script>

<style lang="scss" scoped>
.resultList{
    position:relative;        
    li{
        height:rem(25);
        width:100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }
}   
</style>