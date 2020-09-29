<template>
    <div class="oview">
        <div class="row">
            <div class="txt">10</div>
            <div class="progress" style="height: 200px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">开心</div>
        </div>
        <div class="row">
            <div class="txt">0</div>
            <div class="progress" style="height:10px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">难过</div>
        </div>
        <div class="row">
            <div class="txt">3</div>
            <div class="progress" style="height:60px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">激动</div>
        </div>
        <div class="row">
            <div class="txt">6</div>
            <div class="progress" style="height:120px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">平静</div>
        </div>
        <div class="row">
            <div class="txt">5</div>
            <div class="progress" style="height:100px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">不爽</div>
        </div>
        <div class="row">
            <div class="txt">8</div>
            <div class="progress" style="height:160px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">得意</div>
        </div>
        <div class="row">
            <div class="txt">6</div>
            <div class="progress" style="height:120px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">狂喜</div>
        </div>
        <div class="row">
            <div class="txt">3</div>
            <div class="progress" style="height:60px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">不知道</div>
        </div>
        <div class="row">
            <div class="txt">1</div>
            <div class="progress" style="height:20px;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">烦乱</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'oview',
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
    left:6px;
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
    background:linear-gradient(0deg,#9dd8e0 0%,#b0e6d1 100%);
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