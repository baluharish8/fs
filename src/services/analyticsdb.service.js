import { deleteItem, getData, saveData, updateData } from "./context.service";


let saveClickItemUrl="http://localhost:4006/click";
let saveViewItemUrl="http://localhost:4006/view";
let saveSearchQueryItemUrl="http://localhost:4006/search";
let getPopularCategoriesUrl="http://localhost:4006/analytics/popular-categories";
let getSearchCountUrl="http://localhost:4006/getsearchcount";
let getclickcountUrl="http://localhost:4006/getclickcount";
let getviewcountUrl="http://localhost:4006/getviewcount";
let savesessiondurationUrl="http://localhost:4006/sendsessionduration";
let getAverageSessionDurationUrl="http://localhost:4006/analytics/average-session-duration";
let getPopularClicksUrl="http://localhost:4006/analytics/popular-clicks";
let getPopularViewsUrl="http://localhost:4006/analytics/popular-views";
let getPopularsearchesUrl="http://localhost:4006/analytics/popular-searches";
let sendGetVendorItemPopularClicksUrl="http://localhost:4006/analytics/vendor/popular-clicks";
let sendGetVendorItemPopularViewsUrl="http://localhost:4006/analytics/vendor/popular-views";









export function saveClickItem(itemId){
    return saveData(saveClickItemUrl,itemId)
}
export function saveViewItem(itemId){
    return saveData(saveViewItemUrl,itemId)
}
export function saveSearchQueryItem(data){
    return saveData(saveSearchQueryItemUrl,data)
}
export function getPopularCategories(){
    return getData(getPopularCategoriesUrl)
}
export function getSearchCount(){
    return getData(getSearchCountUrl)
}
export function getclickcount(){
    return getData(getclickcountUrl)
}
export function getviewcount(){
    return getData(getviewcountUrl)
}
export function savesessionduration(data){
    return saveData(savesessiondurationUrl,data)
}
export function getAverageSessionDuration(){
    return getData(getAverageSessionDurationUrl)
}
export function getPopularClicks(){
    return getData(getPopularClicksUrl)
}
export function getPopularViews(){
    return getData(getPopularViewsUrl)
}
export function getPopularsearches(){
    return getData(getPopularsearchesUrl)
}
export function sendGetVendorItemPopularClicks(data){
    return saveData(sendGetVendorItemPopularClicksUrl,data)
}
export function sendGetVendorItemPopularViews(data){
    return saveData(sendGetVendorItemPopularViewsUrl,data)
}