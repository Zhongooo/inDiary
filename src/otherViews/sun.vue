<template>
        <div class="sun">
            <div class="row">
                <div class="txt">3</div>
                <div class="progress" style="height: 60px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">晴天</div>
            </div>
            <div class="row">
                <div class="txt">0</div>
                <div class="progress" style="height:10px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">小雨</div>
            </div>
            <div class="row">
                <div class="txt">10</div>
                <div class="progress" style="height:200px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">多云</div>
            </div>
            <div class="row">
                <div class="txt">2</div>
                <div class="progress" style="height:40px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">大雨</div>
            </div>
            <div class="row">
                <div class="txt">6</div>
                <div class="progress" style="height:120px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">转晴</div>
            </div>
            <div class="row">
                <div class="txt">1</div>
                <div class="progress" style="height:20px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">小雪</div>
            </div>
            <div class="row">
                <div class="txt">2</div>
                <div class="progress" style="height:40px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">大雪</div>
            </div>
            <div class="row">
                <div class="txt">0</div>
                <div class="progress" style="height:10px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">雷雨</div>
            </div>
            <div class="row">
                <div class="txt">7</div>
                <div class="progress" style="height:140px;">
                    <span class="pg-data"></span>
                </div>
                <div class="mood">大暴雨</div>
            </div>
        </div>
    </template>
    <script>
    export default {
        name: 'sun',
        data () {
            return {
            }
        },
        methods: {
    
        },
    };
    </script>
    <style>
    .row{
        position: relative;
        top:20px;
        z-index:1;
        margin-bottom: 20px;
        float: left;
        margin-right:10px;
        left:10px;
    }
    .txt{
        font-size:12px;
        line-height:.2px;
        margin-bottom: 6px;
        margin-left:10px;
    }
    .pg-data{
        display:block;
        width:10px;
        height:100%;
        margin:0 auto;
        background:linear-gradient(0deg,#b0e6d1 0%,#9dd8e0 100%);
        box-shadow: 0 1px 1px rgba(129,93,255.0.4);
        border-radius:6px;
    }
    .mood{
        font-size:13px;
        line-height:2px;
        margin-top:10px;
        color:#666;
    }
    </style>