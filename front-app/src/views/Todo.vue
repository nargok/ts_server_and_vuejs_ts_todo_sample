<template>
  <div class="todo">
    <h1>TODO APP</h1>
    <div class="create">
      <div class="title">
        <label for="">title:</label>
        <input type="text" v-model="title" />
        <button @click="createTodo">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import axios from "axios";

const baseURL = "http://localhost:3000/";

export default defineComponent({
  name: "Todo",
  setup() {
    const state = reactive({
      title: "",
    });

    const createTodo = async () => {
      await axios.post(baseURL, { title: state.title });
      state.title = "";
    };

    return {
      ...toRefs(state),
      createTodo,
    };
  },
});
</script>
