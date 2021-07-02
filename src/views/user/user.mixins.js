export default {
  data () {
    return {
      fields: [
        {
          prop: 'id',
          label: 'userID',
          width: 70,
        },
        {
          prop: 'name',
          label: 'user名称',
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
