/* global Vue, axios */

Vue.component('room-item', {
  template: '\
    <li>\
      {{ title }}\
      <i class="el-icon-right"></i>\
      {{ pow }} {{ ld }}\
      <el-button icon="el-icon-delete" size="mini" circle v-on:click="$emit(\'remove\')"></el-button>\
    </li>\
  ',
  props: ['title', 'pow', 'ld'],
});

var Main = {
  data() {
    return {
      nominalVoltage: 220,
      power: 5.0,
      loadDimension: 'кВт',
      links: [],
      roomName: '',
      roomsToLoad: [],
      nextRoomId: 1,
      tableResult: [],
      loading: false,
      errored: false,
    };
  },
  methods: {
    addNewRoom: function () {
      var name = (this.roomName || '').trim();
      if (name === '') name = 'Помещение № ' + this.nextRoomId;

      var p = Number(this.power);
      if (!isFinite(p) || p <= 0) p = 1;

      this.roomsToLoad.push({
        id: this.nextRoomId++,
        title: name,
        pow: p,
        ld: this.loadDimension,
      });

      this.roomName = '';
      this.power = 5.0;
    },

    cableCalc: function () {
      var valuesArray = this.roomsToLoad.map(function (item) {
        return { roomName: item.title, electricalPower: item.pow };
      });

      this.loading = true;
      this.errored = false;

      return axios
        .post('https://api.ovvio.pro/api/electrics/electrical-wiring-calculation', {
          voltage: this.nominalVoltage,
          rooms: valuesArray,
        })
        .then((response) => {
          this.tableResult = (response && response.data && response.data.rooms) ? response.data.rooms : [];
          this.roomsToLoad = [];
        })
        .catch(() => {
          this.errored = true;
          this.tableResult = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    deleteText: function () {
      this.power = 5.0;
      this.roomName = '';
      this.loadDimension = 'кВт';
      this.nominalVoltage = 220;
      this.roomsToLoad = [];
      this.tableResult = [];
      this.nextRoomId = 1;
      this.errored = false;
    },

    querySearch(queryString, cb) {
      var q = (queryString || '').toLowerCase();
      var results = q
        ? this.links.filter(function (link) {
            return (link.value || '').toLowerCase().indexOf(q) === 0;
          })
        : this.links;
      cb(results);
    },

    loadAll() {
      return [
        { value: 'кухня' },
        { value: 'спальня' },
        { value: 'ванная' },
        { value: 'прихожая' },
        { value: 'туалет' },
        { value: 'гостиная' },
        { value: 'детская' },
      ];
    },
  },
  mounted() {
    this.links = this.loadAll();
  },
};

var Ctor = Vue.extend(Main);
new Ctor().$mount('#cable-app');

