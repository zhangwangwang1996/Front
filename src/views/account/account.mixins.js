export default {
  data () {
    return {
      fields: [
        {
          prop: 'id',
          label: '账户ID',
        },
        {
          prop: 'name',
          label: '账户名称',
        },
        {
          prop: 'created_at',
          label: '添加日期',
        },
      ],
    }
  },
  computed: {
    ...Vuex.mapState({}),
  },
  methods: {},
}
