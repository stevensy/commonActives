<template>
    <ul class="download" :style="position">
        <li>
            <img src="../assets/image/logo.png"/>
            <span>下载车享家app，了解更多养车秘诀</span>
        </li>
        <li>
            <a :href="url" :ca="ca">
                立即下载
            </a>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ["url", "ca", "position"],
        data() {
            return {};
        }
    };
</script>

<style lang="scss" scoped>
@function rem($px){
  @return $px / 37.5 * 1rem;
} 
.download {
    position: fixed;
    left: 0;         
    z-index: 999;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width:100%;
    box-sizing: border-box;
    padding: rem(4) rem(5);
    background: #000;
    li:nth-of-type(1) {
        flex: 0 0 1;
        color: #fff;
        font-size: rem(13);
        text-align: left;
        img {
            width: rem(40);
            height: rem(40);
            display: inline-block;
            vertical-align: middle;
        }
    }
    li:nth-of-type(2) {
        flex: 0 0 rem(76);
        width: rem(76);
        height: rem(32);
        border-radius: rem(4);
        background: #0084ff;
        font-size: rem(13);
        line-height: rem(32);
        text-align: center;
        a {
            color: #fff;
        }
    }
}
</style>
