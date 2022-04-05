import { createApp } from "vue";
import Msg from "./Msg.vue";
const obj = {
  install: function (app) {
    const instance = createApp(Msg);
    let msgElement = null;
    msgElement = document.createElement("div");
    msgElement.id = "msg";
    document.body.appendChild(msgElement);
    const ins = instance.mount("#msg");

    // nextTick(() => {
    //   ins.visible = true;
    // });
    app.config.globalProperties.$errorMsg = (text) => {
      ins.visible = true;
      ins.text = text;
      ins.type = "error";
    };
    app.config.globalProperties.$successMsg = (text) => {
      ins.visible = true;
      ins.text = text;
      ins.type = "success";
    };
  },
};
export default obj;
