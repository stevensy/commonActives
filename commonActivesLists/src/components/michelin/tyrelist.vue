<template>
   <div class="app-page">
        <h3 v-show="showB14&&type==0" class="fb14"><span>14寸</span><cite @click="showInfo">规格说明</cite></h3>
        <h3 v-show="showB15&&type==0" class="fb15"><span>15寸</span></h3>
        <h3 v-show="showB16&&(type==0||type==1||type==2)" class="fb16" :style="(type==1||type==2)?'top:0':''"><span>16寸</span><cite v-show="type==1||type==2" @click="showInfo">规格说明</cite></h3>
        <h3 v-show="showB17&&(type==2||type==3||type==4)" class="fb17" v-bind:class="{ fbt17: type==2 }"><span>17寸</span><cite v-show="type==3||type==4" @click="showInfo">规格说明</cite></h3>
        <h3 v-show="showB18&&(type==3||type==4)" class="fb18" v-bind:class="{ fbt18: type==4 }"><span>18寸</span></h3>
        <h3 v-show="showB19&&type==4" class="fb19"><span>19寸</span></h3>
        <div v-for="(item,index) in typelist" :key="item">
        <h3 :id="'b'+item.size"><span>{{item.size}}寸</span><cite @click="showInfo" v-if="index==0">规格说明</cite></h3>
        <ul class="tyrelist">
            <li v-for="item in item.list" :key="item">
                <a :href="item.url">
                <dl>
                    <dt>
                        <img :src="item.src" alt="我是轮胎"/>
                    </dt>
                    <dd class="des">
                        <div class="content">
                            <p class="info">{{item.name}}</p>
                            <p class="price"><sup>¥</sup><span>{{item.price}}</span></p>
                        </div>
                    </dd>
                    <dd class="arrow"><cite><img class="arrow" src="../../assets/images/michelin/arrow-icon.png"/></cite></dd>
                </dl>
                </a>
            </li>
            <!-- <li>
                <dl>
                    <dt>
                        <img src="../../assets/images/michelin/tyre.png" alt="我是轮胎"/>
                    </dt>
                    <dd class="des">
                        <div class="content">
                            <p class="info">米其林 185/65R14 86H TL ENERGY XM2 GRNX MI</p>
                            <p class="price"><sup>¥</sup><span>350</span></p>
                        </div>
                    </dd>
                    <dd class="arrow"><cite><img class="arrow" src="../../assets/images/michelin/arrow-icon.png"/></cite></dd>
                </dl>
            </li> -->
        </ul>
        </div>
        <!-- <h3 ref="b15"><span>15寸</span></h3>
        <ul class="tyrelist">
            <li>
                <dl>
                    <dt>
                        <img src="../../assets/images/michelin/tyre.png" alt="我是轮胎"/>
                    </dt>
                    <dd class="des">
                        <div class="content">
                            <p class="info">米其林 185/65R14 86H TL ENERGY XM2 GRNX MI</p>
                            <p class="price"><sup>¥</sup><span>350</span></p>
                        </div>
                    </dd>
                    <dd class="arrow"><cite><img class="arrow" src="../../assets/images/michelin/arrow-icon.png"/></cite></dd>
                </dl>
            </li>
        </ul> -->
        <div class="popwindow" v-show="showWindow">
            <h2>轮胎侧面查看轮胎型号</h2>
            <div class="content">
                <img src="../../assets/images/michelin/Bitmap.jpg"/>
            </div>
            <div class="btn" @click="closeInfo">我知道了</div>
        </div>
        <div class="overlay" v-show="showShadow"></div>
        <Gotop></Gotop>
   </div>
</template>

<script>
import Gotop from "../common/gotop"
import {getQueryString} from "../../../../utils/common";
export default {
    name:'michelin',
    data() {
        return {
           showWindow:false,
           showShadow:false,
           showB14:false,
           showB15:false,
           showB16:false,
           showB17:false,
           showB18:false,
           showB19:false,
           type0:[
               {
             size:14,
               list:[{
                  name:"米其林185/60R14 82H TL ENERGY XM2 GRNX MI",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/c4dd49205ff0435c8f4770d7127d0316.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066682&spuCode=1083235&isMatch=true",price:"360"
               },{
                  name:"米其林185/65R14 86H TL ENERGY XM2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/a22cb8b7ae864324bf2f4dbcaf156cef.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066683&spuCode=1083236&isMatch=true",price:"480"
               },
               {
                  name:"米其林195/60R14 86H TL ENERGY XM2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/14ef24a0b3aa49f9903e5db1c84b2ed8.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066684&spuCode=1083237&isMatch=true",price:"380"
               }]
              
        },
        {
             size:15,
               list:[{
name:"米其林175/65R15 84H TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/339273d9362640ac957862fa42d901a0.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066685&spuCode=1083238&isMatch=true",price:"520"
               },{
name:"米其林185/60R15 84H TL ENERGY XM2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/cb1ef43bb2244f2390d1f6e4519f5e1c.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066687&spuCode=1083240&isMatch=true",price:"530"

               },{
name:"米其林185/65R15 88H TL ENERGY XM2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/4d8a4a3d19e1413aaeb9d4f89867f379.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066688&spuCode=1083241&isMatch=true",price:"460"

               },{
name:"米其林195/55R15 85V TL ENERGY XM2 GRNX MI",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/18af7fa3013b4946ba8254bedd43d88b.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066689&spuCode=1083242&isMatch=true",price:"480"

               },{
name:"米其林195/60R15 88V TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/725cb0d1210e42b5b440c4232c1ed0c9.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066690&spuCode=1083243&isMatch=true",price:"460"

               },{
name:"米其林195/65R15 91V TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/1caa4896666849729d054de97900b1f0.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066692&spuCode=1083245&isMatch=true",price:"490"

               },{
name:"米其林205/65R15 94V TL ENERGY XM2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/a80ac7dbd1f6477c84c3f746a9626146.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066693&spuCode=1083246&isMatch=true",price:"680"

               },{
name:"米其林195/60R16 89H TL ENERGY XM2 GRNX MI",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/d9e16d4f772346f8930e33e2e6188e71.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066694&spuCode=1083247&isMatch=true",price:"610"

               }]
        },
        {
               size:16,
               list:[{
name:"米其林205/55R16 91V TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/5f8a12aff81341edb3e6999e748ec596.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066697&spuCode=1083250&isMatch=true",price:"660"

               },{
name:"米其林205/60R16 92V TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/b0ffb308bbdb4e59977db963b4586582.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066699&spuCode=1083252&isMatch=true",price:"660"

               },{
name:"米其林215/55R16 93V TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/6d9e24d8e3b048bea453ab15f3295229.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066702&spuCode=1083255&isMatch=true",price:"840"

               },{
name:"米其林215/60R16 95H TL ENERGY XM2 GRNX MI",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/6a1d5631cb2e4a5b8b5daba3ad4057b0.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066705&spuCode=1083258&isMatch=true",price:"720"

               },{
name:"米其林225/60R16 98V TL ENERGY XM2 GRNX MI",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/001a7c86071e4ee587b8820a68d2d88b.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066709&spuCode=1083262&isMatch=true",price:"920"

               }]
        }],
        type1:[
               {
             size:16,
               list:[{
name:"米其林235/45R17 97W EXTRA LOAD TL PILOT SPORT 3 ST MI     ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/4be848dd606342ce8d417b9617b369d6.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066725&spuCode=1083278&isMatch=true",price:"1150"

               },{
name:"米其林235/55R18 100V TL PILOT SPORT 3 ST MI                ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/95a12330656a45c7a993e75c38351220.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066733&spuCode=1083286&isMatch=true",price:"1040"

               },
               {
name:"米其林245/45R18 100Y EXTRA LOAD TL PILOT SPORT 3 ST AO MI  ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/8d09632b10a44f93b1ac579fe7400051.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066736&spuCode=1083289&isMatch=true",price:"1340"

               },
               {
name:"米其林255/55R18 109Y EXTRA LOAD TL LATITUDE SPORT 3 GRNX MI",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/90cf622a66474e38907ec47b4a684778.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066738&spuCode=1083291&isMatch=true",price:"1520"

               }]
              
        }],
        type2:[
               {
             size:16,
               list:[{
name:"米其林195/65R15 91V TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/143a278782034af7b3d21d884ca6e816.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066691&spuCode=1083244&isMatch=true",price:"510"

               },{
name:"米其林205/55R16 91W TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/4a001a44a1394be880e371118515052c.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066695&spuCode=1083248&isMatch=true",price:"680"

               },
               {
name:"米其林205/55R16 91V TL PRIMACY 3 ST GRNX MI                ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/b0ffb308bbdb4e59977db963b4586582.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066696&spuCode=1083249&isMatch=true",price:"660"

               },
               {
name:"米其林205/65R16 95V TL PRIMACY 3 ST GRNX MI                ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/4642790b385648678ffd6d8ab20128d0.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066700&spuCode=1083253&isMatch=true",price:"720"

               },{
name:"米其林215/55R16 97W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/e0b58d94f07e4e039bfd4bdbd9ca27db.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066701&spuCode=1083254&isMatch=true",price:"870"

               },{
name:"米其林215/60R16 99V EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/241df9ed016c44c9ab8541a9e64c2782.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066703&spuCode=1083256&isMatch=true",price:"750"

               },{
name:"米其林215/60R16 95V TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/902111d1bfbb4891b70c6de8beac0f56.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066704&spuCode=1083257&isMatch=true",price:"730"

               }]
              
        },{
             size:17,
               list:[{
name:"米其林225/55R16 99W EXTRA LOAD TL PRIMACY 3 ST GRNX  MI    ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/eeb4a8267c4e48119784bcc4f1ffbcad.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066707&spuCode=1083260&isMatch=true",price:"1070"

               },{
name:"米其林225/60R16 98W TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/f105a1dcb9a8436c9b3f63bd1d3c9e71.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066708&spuCode=1083261&isMatch=true",price:"900"

               },
               {
name:"米其林205/50R17 93W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/e87af81a07974207ab8a353c59998fcd.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066710&spuCode=1083263&isMatch=true",price:"1100"

               },
               {
name:"米其林215/50R17 95W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/7cb973da9f5c42f5b638b586e0b93661.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066712&spuCode=1083265&isMatch=true",price:"940"

               },{
name:"米其林215/55R17 94V TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/eef98a39db664e16993c656e0f43215e.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066713&spuCode=1083266&isMatch=true",price:"880"

               },{
name:"米其林215/55R17 94V TL PRIMACY 3 ST DT GRNX MI             ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/5f6e27f220ec43a58d1066ce58b712d7.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066714&spuCode=1083267&isMatch=true",price:"860"

               },{
name:"米其林215/55R17 94V TL PRIMACY 3 ST DT5 GRNX MI            ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/b3b46af8591a420da607eb13af72466b.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066715&spuCode=1083268&isMatch=true",price:"860"

               },{
name:"米其林215/55R17 94V TL PRIMACY 3 ST DT2 GRNX MI",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/77ecffa5ab5a4af9accfc3594f5d71af.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066716&spuCode=1083269&isMatch=true",price:"860"

               },{
name:"米其林215/60R17 96V TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/a0f5dee45253433dbf81d00d058aa4f8.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066717&spuCode=1083270&isMatch=true",price:"900"

               },{
name:"米其林225/45R17 94W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/1c2f54e7f4ea47048dc0f6fd8e592892.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066718&spuCode=1083271&isMatch=true",price:"1030"

               },{
name:"米其林225/50R17 98W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/c5c40c9beb034e4cbd065650f6eebb52.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066720&spuCode=1083273&isMatch=true",price:"1000"

               },{
name:"米其林225/55R17 101W EXTRA LOAD TL PRIMACY 3 ST GRNX MI    ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/1fa8f05cd9eb48e49e35a3dd8b2e612e.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066722&spuCode=1083275&isMatch=true",price:"990"

               },{
name:"米其林225/60R17 103V EXTRA LOAD TL PRIMACY 3 ST GRNX MI    ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/a2433b397c5545bfbd7156da2ed2ae30.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066723&spuCode=1083276&isMatch=true",price:"880"

               },{
name:"米其林235/45R17 97W EXTRA LOAD TL PRIMACY 3 ST GRNX MI     ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/458484272425495380697a3dd130dc45.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066726&spuCode=1083279&isMatch=true",price:"1150"

               },{
name:"米其林235/50R17 96V TL PRIMACY 3 ST GRNX MI                ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/0974b6df85fb4a6687cfb13f0b1801b0.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066728&spuCode=1083281&isMatch=true",price:"1360"

               },{
name:"米其林235/55R17 103W EXTRA LOAD TL PRIMACY 3 ST GRNX MI    ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/73c3f73dec2749e5bf3dfb37a033da6d.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066729&spuCode=1083282&isMatch=true",price:"1030"

               },{
name:"米其林235/50R18 97W TL PRIMACY 3 ST DT GRNX MI             ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/4d167d50471b46f6aff589daf69fa6d8.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066732&spuCode=1083285&isMatch=true",price:"990"

               },{
name:"米其林245/45R18 100W EXTRA LOAD TL PRIMACY 3 ST GRNX MI    ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/81da8fa28ff54f2c8eaf06dff73b797c.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066737&spuCode=1083290&isMatch=true",price:"1310"

               },{
name:"米其林225/55R17 97W TL PRIMACY 3 ST ZP * GRNX MI           ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/141e3e2574384dcca88568d2f0667b9c.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066741&spuCode=1083294&isMatch=true",price:"1370"

               }]
              
        }],
         type3:[{
             size:17,
               list:[{
name:"米其林205/60R16 92V TL PRIMACY LC DT MI  ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/6fb15c28d2314850b47b4d695f21336f.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066698&spuCode=1083251&isMatch=true",price:"670"

               }]
              
        },{
             size:18,
               list:[{
name:"米其林215/50R17 91W TL PRIMACY LC MI     ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/77b4b3c4936f4f179357b8d27e3bd9dc.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066711&spuCode=1083264&isMatch=true",price:"970"

               },{
name:"米其林225/50R17 94V TL PRIMACY LC DT MI  ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/eea1d3026ce94c1a87b79fd485e6c17d.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066719&spuCode=1083272&isMatch=true",price:"1030"

               },
               {
name:"米其林225/55R17 97Y TL PRIMACY LC AO MI  ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/98a95243ca6f4e48acc9490fd75fe26e.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066721&spuCode=1083274&isMatch=true",price:"1080"

               }]
              
        }],
         type4:[{
             size:17,
               list:[{
name:"米其林215/65R16 102H EXTRA LOAD TL PRIMACY SUV MI          ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/93e07b86b74c4822972dbcf8c152766d.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066706&spuCode=1083259&isMatch=true",price:"730"

               }]
              
        },{
             size:18,
               list:[{
name:"米其林225/65R17 102H TL PRIMACY SUV MI   ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/e9021bd7bfa94b9ca0935facd39c065f.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066724&spuCode=1083277&isMatch=true",price:"800"

               },{
name:"米其林235/65R17 108V EXTRA LOAD TL PRIMACY SUV MI          ",src:"//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/0380abbb770c403eb5daa47fa09bb9ab.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066730&spuCode=1083283&isMatch=true",price:"1150"

               },
               {
name:"米其林235/60R18 103V TL PRIMACY SUV MI   ",src:"//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/ff3f8c88eedd401c9ab3c9f560fa9fcc.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066735&spuCode=1083288&isMatch=true",price:"1230"

               }]
              
        },{
             size:19,
               list:[{
name:"米其林245/55R19 103H TL PRIMACY SUV MI          ",src:"//i2.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/6e0bc3bfe65943b78177e1918f7fc637.png",url:"//h.jia.chexiang.com/tyre/tyreDetail.htm?skuCode=1066740&spuCode=1083293&isMatch=true",price:"1100"

               }]
              
        }],
        type:getQueryString("type").type,
        typelist:[]  
        }
    },
    created() {
        if(this.type == 0){
           document.title = "ENERGY XM2 韧悦";
        }else if(this.type == 1){
           document.title = "Pilot Sport 3 竞驰";
        }else if(this.type == 2){
           document.title = "Primacy 3 ST 浩悦";
        }else if(this.type == 3){
           document.title = "Primacy LC 博悦";
        }else if(this.type == 4){
           document.title = "Primacy SUV 旅悦";
        }
    },
    mounted() {
        //打点
        (new Analytics).scan(); 
        if(this.type==0){
            this.typelist = this.type0;
        }else if(this.type == 1){
             this.typelist = this.type1;
        }else if(this.type == 2){
            this.typelist = this.type2;
        }else if(this.type == 3){
            this.typelist  = this.type3;
        }else if(this.type == 4){
            this.typelist = this.type4;
        }
        window.scrollTo(0,0);
        this.fixBanner();         
    },
    destroyed(){
        window.removeEventListener("scroll", this.scrollFn);
    },
    methods: {
        showInfo:function(){
            this.showWindow = true;
            this.showShadow = true;
        },
        closeInfo:function(){
            this.showWindow = !this.showWindow;
            this.showShadow = !this.showShadow;
        },
        fixBanner:function(){
            var vm = this;
            window.addEventListener("scroll", this.scrollFn)
        },
        scrollFn(){
            var  vm = this;
                var b14 = document.getElementById("b14");
                var b15 = document.getElementById("b15");
                var b16 = document.getElementById("b16");
                var b17 = document.getElementById("b17");
                var b18 = document.getElementById("b18");
                var b19 = document.getElementById("b19");
                var s14 = b14?b14.offsetTop-b14.clientHeight:10000;
                var s15 = b15?b15.offsetTop-b15.clientHeight:10000;
                var s16 = b16?b16.offsetTop-b16.clientHeight-b16.clientHeight:10000;
                var s17 = b17?b17.offsetTop-b17.clientHeight:10000;
                var s18 = b18?b18.offsetTop-b18.clientHeight:10000;
                var s19 = b19?b19.offsetTop-b19.clientHeight:10000;
                console.log(s18+",s18");
                console.log(scrollY+","+s19+",s19");
                if(window.scrollY > s14){
                    vm.showB14 = true;
                }else{
                    vm.showB14 = false;
                }
                if(window.scrollY > s15){
                    vm.showB15 = true;
                }else{
                    vm.showB15 = false;
                }
                if(window.scrollY > s16){
                    vm.showB16 = true;
                }else{
                    vm.showB16 = false;
                }
                if(window.scrollY > s17){
                    vm.showB17 = true;
                }else{
                    vm.showB17 = false;
                }
                if(window.scrollY > s18){
                    vm.showB18 = true;
                }else{
                    vm.showB18 = false;
                }
                if(window.scrollY > s19){
                    vm.showB19 = true;
                }else{
                    vm.showB19 = false;
                }
            }
    },
    components: {
        Gotop
    }
 }

</script>

<style lang="scss" scoped>
// @function rem($px){
//     @return $px/37.5*1.04*1rem;
// } 
*{
    -webkit-tap-highlight-color: transparent;
}
img{width:100%;max-width:100%;height:auto;}
.app-page {
    img {
        display:block;
    }
    h3{
        height: rem(20);
        font-weight: normal;
        line-height: rem(20);
        clear: both;
        overflow: hidden;
        background-color: #F5F5F5;
        padding: rem(12);
        font-size: rem(13);
        color: #666;
        cite{
            float: right;
            font-style: normal;
            display: inline-block;
            padding-right: rem(18);
            background: transparent url(../../assets/images/michelin/info-icon.png) no-repeat center right;
            background-size: rem(14) rem(14);
        }
    }
    .tyrelist{
        li{
            margin-left:rem(10);
            padding: rem(10) rem(10) 0 0;
            position: relative;
            border:none;
        }
        li::after{
            content: '';
            position: absolute;
            left: 0;
            background: #e8e8e8;
            width: 100%;
            height: 1px;
            -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
        }
        dl{
            clear: both;
            overflow: hidden;
            margin-bottom: rem(10);
            dt,dd{
                float: left;
            }
            dt{
                width: rem(80);
                height: rem(80);
                background-color: #EEF3FF;
                img{
                    max-width: rem(80);
                }
            }
            dd{
                img.arrow{
                   width: rem(20);
                }
            }
            dd.des{
                position: relative;
                .content{
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
                width: rem(223);
                height: rem(80);
                margin-left: rem(10);
                .info{
                    font-size: rem(15);
                }
                .price{
                    margin-top: rem(10);
                    color: #f00;
                    sup{
                        font-size: rem(11);
                    }
                    span{
                        font-size: rem(17);
                    }
                }
            }
            dd.arrow{
                position: relative;
                width: rem(20);
                cite{
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
                height: rem(80);
                float: right;
            }
        }
    }
    .overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 15;
    }
    .popwindow{
        width:rem(280);
        height: rem(284);
        background-color: #fff;
        position: fixed;
        _position:absolute;
        z-index:16;
        top: 50%;
        left: 50%;
        margin: rem(-140) 0 0 rem(-142);
        border-radius: rem(6);
        h2{
            text-align: center;
            height: rem(55);
            line-height: rem(55);
            font-size: rem(17);
        }
        .content{
           text-align: center;
           img{
               width: rem(198);
               max-height: rem(168);
               display: inline-block;
           }            
        }
        .btn{
            width: 100%;
            height: rem(48);
            line-height: rem(48);
            font-size: rem(17);
            color: #0084FF;
            text-align: center;
            position: absolute;
            bottom: 0;
        }
        .btn::before{
            content: '';
            position: absolute;
            left: 0;
            background: #e8e8e8;
            width: 100%;
            height: 1px;
            -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
        }
    }
    .fb14{
        position: fixed;
        top: 0;
        width: rem(351);
        z-index: 12;
    }
    .fb15{
        position: fixed;
        top: rem(44);
        width: rem(351);
        z-index: 12;
    }
    .fb16{
        position: fixed;
        top: rem(88);
        width: rem(351);
        z-index: 12;
    }
     .fb17{
        position: fixed;
        top: rem(0);
        width: rem(351);
        z-index: 12;
    }
    .fbt17{
        position: fixed;
        top:rem(44);
        width: rem(351);
        z-index:12;
    }
     .fb18{
        position: fixed;
        top: rem(44);
        width: rem(351);
        z-index: 12;
    }
    .fbt18{
        position: fixed;
        top:rem(44);
        width: rem(351);
        z-index:12;
    }
     .fb19{
        position: fixed;
        top: rem(88);
        width: rem(351);
        z-index: 12;
    }
}
</style>