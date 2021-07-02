<template>
  <div class="home-page">
    <div class="glitch-container">
      <h1 class="glitched">{{message}}</h1>
      <div class="glitch-window">
        <h1 class="glitched">{{message}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      message: 'This is not a bug',
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {},
  filters: {},
}
</script>
<style lang="scss">
// 全局CSS
</style>
<style lang="scss"
       scoped>
// 带作用域的CSS
// https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html
// 故障文字特效
// https://redstapler.co/16-awesome-pure-css-text-effect-you-should-try/
// https://codepen.io/derekjp/pen/ozEdgK
$background-color: #eff0f4;
$text-color: #C0C4CC;
$font-size: 5rem;
.home-page {
  box-sizing: border-box;
  background-color: $background-color;

  .glitch-container {
    font-family: 'Raleway', sans-serif;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);

    h1 {
      font-size: $font-size;
      color: $text-color;
      text-align: center;
      margin-top: 0;
      text-transform: uppercase;
      font-weight: 900;
    }
  }

  .glitch-window {
    position: absolute;
    top: 0;
    left: -2px;
    width: 100%;
    color: $text-color;
    text-shadow: 2px 0 $background-color, -1px 0 yellow, -2px 0 green;
    overflow: hidden;
    animation: crt-me 2500ms infinite linear alternate-reverse;
    // background: red;
  }

  //Animation Keyframes
  @keyframes crt-me {
    0% {
      clip: rect(31px, 9999px, 94px, 0)
    }
    10% {
      clip: rect(112px, 9999px, 76px, 0)
    }
    20% {
      clip: rect(85px, 9999px, 77px, 0)
    }
    30% {
      clip: rect(27px, 9999px, 97px, 0)
    }
    40% {
      clip: rect(64px, 9999px, 98px, 0)
    }
    50% {
      clip: rect(61px, 9999px, 85px, 0)
    }
    60% {
      clip: rect(99px, 9999px, 114px, 0)
    }
    70% {
      clip: rect(34px, 9999px, 115px, 0)
    }
    80% {
      clip: rect(98px, 9999px, 129px, 0)
    }
    90% {
      clip: rect(43px, 9999px, 96px, 0)
    }
    100% {
      clip: rect(82px, 9999px, 64px, 0)
    }

  }
}
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
