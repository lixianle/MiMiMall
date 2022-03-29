import { request } from "./axios";

export function getPro() {
  return request({
    url: "/api/products",
  }).then((res) => {
    console.log(res);
  });
}
// mock
export function getMenuList() {
  return request({
    url: "/mock/menu.json",
  });
}
export function getSlideList() {
  return request({
    url: "/mock/slide.json",
  });
}
export function getAdsList() {
  return request({
    url: "/mock/ads.json",
  });
}
export function getRedmiList() {
  return request({
    url: "/mock/redmi.json",
  });
}
export function getTvList() {
  return request({
    url: "/mock/tv.json",
  });
}
