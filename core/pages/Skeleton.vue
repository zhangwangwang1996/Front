<template>
  <div>
    <div class="loader-bg">
    </div>
    <div class="loader">
      <div class="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
}
</script>

<style lang="scss">
// 加载动画取自 loaders.css
// https://github.com/ConnorAtherton/loaders.css/
// https://connoratherton.com/loaders
$primary-color: #fff !default;
$ball-size: 15px !default;
$margin: 2px !default;
$size: 25px;

@mixin global-bg() {
  background-color: $primary-color;
}

@mixin balls() {
  @include global-bg();

  width: $ball-size;
  height: $ball-size;
  border-radius: 100%;
  margin: $margin;
}

@function delay($interval, $count, $index) {
  @return ($index * $interval) - ($interval * $count);
}

@keyframes rotate_pacman_half_up {
  0% {
    transform: rotate(270deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes rotate_pacman_half_down {
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@mixin pacman_design() {
  width: 0px;
  height: 0px;
  border-right: $size solid transparent;
  border-top: $size solid $primary-color;
  border-left: $size solid $primary-color;
  border-bottom: $size solid $primary-color;
  border-radius: $size;
}

@keyframes pacman-balls {
  75% {
    opacity: 0.7;
  }
  100% {
    transform: translate(-4 * $size, -$size / 4);
  }
}

@mixin ball-placement($n:3, $start:0) {
  @for $i from $start through $n {
    > div:nth-child(#{$i + 2}) {
      animation: pacman-balls 1s delay(.33s, $n, $i) infinite linear;
    }
  }
}

.pacman {
  @include ball-placement();

  position: relative;

  > div:first-of-type {
    @include pacman_design();
    animation: rotate_pacman_half_up 0.5s 0s infinite;
    position: relative;
    left: -30px;
  }

  > div:nth-child(2) {
    @include pacman_design();
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -2 * $size;
    position: relative;
    left: -30px;
  }

  > div:nth-child(3),
  > div:nth-child(4),
  > div:nth-child(5),
  > div:nth-child(6) {
    @include balls();

    width: 10px;
    height: 10px;

    position: absolute;
    transform: translate(0, -$size / 4);
    top: 25px;
    left: 70px;
  }
}
</style>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
}

.loader-bg {
  background: #2d2f33;
  height: 100%;
  width: 100%;
  position: absolute;
}

.loader {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 0px;
}
</style>
