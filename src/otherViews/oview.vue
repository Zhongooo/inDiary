<template>
    <div class="oview">
        <div class="row">
            <div class="txt">10</div>
            <div class="progress" style="height: 6rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">开心</div>
        </div>
        <div class="row">
            <div class="txt">0</div>
            <div class="progress" style="height:0.5rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">难过</div>
        </div>
        <div class="row">
            <div class="txt">3</div>
            <div class="progress" style="height:1.5rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">激动</div>
        </div>
        <div class="row">
            <div class="txt">6</div>
            <div class="progress" style="height:3rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">平静</div>
        </div>
        <div class="row">
            <div class="txt">5</div>
            <div class="progress" style="height:2.5rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">不爽</div>
        </div>
        <div class="row">
            <div class="txt">8</div>
            <div class="progress" style="height:4rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">得意</div>
        </div>
        <div class="row">
            <div class="txt">6</div>
            <div class="progress" style="height:3rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">狂喜</div>
        </div>
        <div class="row">
            <div class="txt">3</div>
            <div class="progress" style="height:1.5rem;">
                <span class="pg-data"></span>
            </div>
            <div class="mood">不知道</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'oview',
        data() {
            return {
            }
        }
    };
</script>
<style scoped>
    @import '../style/otherviews/oview.css'
</style>