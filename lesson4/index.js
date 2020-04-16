Vue.component('Cell', {
  props: [
    'item',
    'x',
    'y'
  ],

  methods: {
    makeMove: function(x, y) {
      console.log(x, y);
      axios.post('http://localhost:2000/move', { x, y });
    }
  },

  template: `
    <div class='cell' v-on:click="makeMove(x,y)">
      <div v-if="item === 1">X</div>
      <div v-if="item === 0">O</div>
    </div>
  `
});


const app = new Vue({
  el: '#app',
  data: {
    field: [[0, 1, 1], [1, 0, 1], [0, 1, 0]],
    message: 'Hello, Mike',
  },

  methods: {
    clickButton: function() {
      this.message = 'Hello, testUser';
    },
    createGame: function() {
      axios.post('http://localhost:2000/createGame');
    },
    resetField: function() {
      axios.post('http://localhost:2000/resetField');
    }
  },

  mounted: function() {
    axios.post('http://localhost:2000/createGame');
    setInterval(() => {

      axios.get('http://localhost:2000/getField')
        .then((res) => {
          this.field = res.data;
        });
    }, 1000);
  }
});