<template>
  <section class="panel">
    <header v-if="!hideHeader"
            :class="['panel-heading', isCollapse?'up':'']">
      <span class="panel-heading-title"><slot name="header"></slot></span>
      <span class="tools">
        <slot name="tools"></slot>
        <el-tooltip v-if="onExport"
                    content="导出"
                    placement="top">
          <button class="sj-icon-export"
                  @click="onExport"></button>
        </el-tooltip>
        <el-tooltip v-if="onRefresh"
                    content="刷新"
                    placement="top">
          <button class="el-icon-refresh"
                  @click="onRefresh"></button>
        </el-tooltip>
        <el-tooltip :content="isCollapse?'展开':'收起'"
                    placement="top">
          <button
            v-if="hideCollapse === false"
            :class="[isCollapse?'el-icon-arrow-up':'el-icon-arrow-down']"
            @click="isCollapse = !isCollapse"></button>
        </el-tooltip>
      </span>
    </header>
    <el-collapse-transition>
      <div v-show="!isCollapse">
        <div class="panel-body"
             :style="bodyStyle">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </section>
</template>

<script>
export default {
  name: 'SjPanel',
  props: {
    hideHeader: Boolean,
    hideCollapse: Boolean,
    collapse: Boolean,
    onRefresh: Function,
    onExport: Function,
    bodyStyle: [String, Array, Object],
  },
  data () {
    return {}
  },
  computed: {
    isCollapse: {
      get () {
        return this.collapse
      },
      set (value) {
        this.collapse = value
      },
    },
  },
}
</script>
<style lang="scss">
.panel {
  border: none;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  .panel-heading {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-transform: uppercase;
    color: #535351;
    font-size: 14px;
    font-weight: bold;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    .panel-heading-title {
      padding-right: 15px;
    }

    &.up {
      border-color: transparent;
      transition: border-color 0.5s;
    }

    .tools {
      margin: -7px -5px;
      float: right;

      button {
        margin-left: 3px;
        min-height: 30px;
        min-width: 30px;
        border-width: 0;
        background: #e3e4e8;
        border-radius: 3px;
        color: #858582;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          background-color: #66b1ff;
          color: #fff;
        }
      }
    }
  }

  .panel-body {
    overflow: auto;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
  }

  .pagination {
    margin: 25px auto 10px;
    text-align: center;
  }
}
</style>
