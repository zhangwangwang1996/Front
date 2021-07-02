export default {
  data () {
    return {
      fields: [
        {
          prop: 'id',
          label: '用户ID',
          width: 70,
        },
        {
          prop: 'name',
          label: '用户名',
          width: 90,
        },
        {
          prop: 'phone',
          label: '手机号',
          width: 107,
        },
        {
          prop: 'email',
          label: '邮箱',
          width: 190,
          showOverflowTooltip: true,
        },
        {
          prop: 'comment',
          label: '备注',
          minWidth: 120,
          showOverflowTooltip: true,
        },
        {
          prop: 'disabled',
          label: '状态',
          width: 50,
          formatter: row => this.disabledOptions[row.disabled],
        },
        {
          prop: 'created_at',
          label: '注册日期',
          width: 153,
        },
      ],
    }
  },
  computed: {
    ...Vuex.mapState({
      disabledOptions: state => state.demo.disabledOptions,
    }),
  },
  methods: {},
}
