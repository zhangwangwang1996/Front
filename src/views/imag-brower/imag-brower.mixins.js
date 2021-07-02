export default {
  data () {
    return {
      fields: [
        {
          prop: 'id',
          label: 'imagBrowerID',
          width: 70,
        },
        {
          prop: 'name',
          label: 'imagBrower名称',
          minWidth: 90,
        },
        {
          prop: 'created_at',
          label: '添加日期',
          width: 153,
        },
      ],
    }
  },
  computed: {
    ...Vuex.mapState({}),
  },
  methods: {},
}
