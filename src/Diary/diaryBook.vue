<template>
    <div>
        <mt-header fixed title="我的日记">
            <router-link to="/" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:1rem"></i>
            </router-link>
                    
        </mt-header>
        <div v-show="showPwdInput" style="position:relative;top:60px">
            <van-password-input :value="value" info="密码为 4 位数字" :length="4" :focused="showKeyboard"
                @focus="showKeyboard = true" />
            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"
                @blur="showKeyboard = false" />
        </div>

        <diarylist v-show="!needPwd"></diarylist>
    </div>
</template>
<script>
    import diarylist from '@/Diary/diarylist.vue'
    export default {
        name: 'diaryBook',
        components: {
            diarylist
        },
        data() {
            return {
                needPwd: false,
                showPwdInput: false,
                value: '',
                showKeyboard: true,
            }
        },
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 4);
                if (this.value.length == 4) {
                    if (this.value == '8888') {
                        this.$toast('密码正确');
                        this.showPwdInput = false;
                        this.needPwd = false;

                    } else {
                        this.$toast('密码错误');
                    }
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
        },
        created() {
            if (this.needPwd == true) {
                this.showPwdInput = true;
            }
        },
    }
</script>
<style scoped>
    .mint-header {
        font-size: 16px;
        color: black;
        background: #fff;
    }
</style>