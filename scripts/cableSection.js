/* global Vue */

/**
 * Локальный расчёт сечения (без API): ток из P и U, затем подбор по типовым рядам сечений
 * и допустимой плотности тока (~6 А/мм² Cu, ~4 А/мм² Al для кабелей в жилых, упрощённо).
 */
(function (global) {
  function currentFromPowerKw(PKw, voltage) {
    var P = Number(PKw);
    if (!isFinite(P) || P <= 0) return 0;
    var U = Number(voltage);
    if (U === 220) return (P * 1000) / 220;
    if (U === 380) return (P * 1000) / (Math.sqrt(3) * 380);
    return 0;
  }

  function nextStandard(mm2, series) {
    for (var i = 0; i < series.length; i++) {
      if (series[i] >= mm2) return series[i];
    }
    return series[series.length - 1];
  }

  var STD_CU = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95];
  var STD_AL = [2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95];

  global.computeCableLocal = function (roomKw, nominalVoltage) {
    var I = currentFromPowerKw(roomKw, nominalVoltage);
    if (!isFinite(I) || I <= 0) {
      return { cuprum: '—', aluminum: '—', currentA: 0 };
    }
    var sCu = nextStandard(I / 6, STD_CU);
    var sAl = nextStandard(I / 4, STD_AL);
    return {
      cuprum: String(sCu),
      aluminum: String(sAl),
      currentA: I,
    };
  };
})(typeof window !== 'undefined' ? window : this);

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
      /*
            var valuesArray = this.roomsToLoad.map(function (item) {
        return { roomName: item.title, electricalPower: item.pow };
      });
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
        });*/
      var self = this;
      this.loading = true;
      this.errored = false;
      try {
        this.tableResult = this.roomsToLoad.map(function (room) {
          var row = computeCableLocal(room.pow, self.nominalVoltage);
          return {
            roomName: room.title,
            electricalPower: room.pow,
            cuprum: row.cuprum,
            aluminum: row.aluminum,
          };
        });
        this.roomsToLoad = [];
      } catch (e) {
        this.errored = true;
        this.tableResult = [];
      } finally {
        this.loading = false;
      }
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
