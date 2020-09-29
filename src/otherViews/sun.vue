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
    </div>
</template>
<script>
    export default {
        name: 'sun',
        data() {
            return {
            }
        },
        methods: {

        },
    };
</script>
<style scoped>
    @import '../style/otherviews/oview.css'
</style>