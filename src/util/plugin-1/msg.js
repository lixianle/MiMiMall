import { provide, inject, reactive, createApp, h } from "vue";
import Msg from "./Msg.vue";
const msgSymbol = Symbol();

// 在App中配置
const globalConfig = {
  type: "center", // msg 位置
  duration: 2500, // 持续时间
  wordWrap: false, // 是否自动换行
  width: "auto", // 宽度
};

// 在使用的组件中配置
const state = reactive({
  show: false, // msg 元素是否显示
  text: "", // msg 内容
});

let [msgVM, msgElement, msgTimer] = [null, null, null];

const _msg = (text) => {
  state.show = true;
  state.text = text;
  // 如果 msgVM 存在则不重新创建
  if (!msgVM) {
    msgVM = createApp({
      setup() {
        return () =>
          h(
            Msg,
            {
              // 这里是根据配置显示一样不同的样式
              // class: [
              //   "lx-toast",
              //   `lx-toast-${globalConfig.type}`,
              //   globalConfig.wordWrap ? "lx-word-wrap" : "",
              // ],
              style: {
                display: state.show ? "block" : "none",
                width: globalConfig.width,
              },
            },
            state.text
          );
      },
    });
  }

  // 如果挂载节点以经存在则不重新创建
  if (!msgElement) {
    msgElement = document.createElement("div");
    msgElement.id = "msg";
    document.body.appendChild(msgElement);
    msgVM.mount("#msg");
  }

  // 定时器，持续时长之后隐藏
  if (msgTimer) clearTimeout(msgTimer);
  msgTimer = setTimeout(() => {
    state.show = false;
    clearTimeout(msgTimer);
  }, globalConfig.duration);
};

// 暴露给App
export function provideMsg(config = {}) {
  for (const key in config) {
    globalConfig[key] = config[key];
  }
  provide(msgSymbol, _msg);
}

// 暴露给使用的组件
export function useMsg() {
  const msg = inject(msgSymbol);
  if (!msg) {
    throw new Error("error");
  }
  return msg;
}
