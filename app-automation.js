auto.waitFor();
let keyword = 123; //搜索关键词
let times = 5; //翻页次数
let brand = qwqe; //品牌

start();
search(keyword);
filter();
check(brand,times);
console.log("程序运行成功");

// 打开lazada
function start() {
    var appname = getPackageName("Lazada"); 
    launch(appname);
}

// 搜索关键词
function search(keyword) {
    id("laz_homepage_search_view_container").findOne().click();
    sleep(1000);
    id("search_input_box").findOne().setText(keyword);
    id("search_button").findOne().click();
    sleep(1000);
}

// 筛选
function filter(){
    id("filter_button").findOne().click();
    sleep(1000);
    id("tag_item_text").className("android.widget.TextView").text("China").findOne().parent().parent().click();
    id("tag_item_text").className("android.widget.TextView").text("LazMall").findOne().parent().parent().click();
    id("done_layout").findOne().click();
    sleep(1000);
}

// 加入购物车并返回
function addcart(){
    id("main_action_container").click();
    sleep(1000);
    id("main_action_container").click();
    sleep(1000);
    id("back").click();
    sleep(1000);
}

// 检查产品关键词决定是否点击
function check(brand,times){
    let pset = new Set();
    for (let i = 0; i < times; i++) {
        try {
            var product = className("FrameLayout").depth(18).find();
            console.log("程序运行%d遍",i);
            for (let j = 0; j < product.length; j++) {
                product_text = product[j].findOne(className("TextView").indexInParent(6).depth(20)).text();
                sleep(1000)
                if(product_text.includes(brand)){
                    if (!pset.has(product_text)){
                        pset.add(product_text);
                        product[j].findOne(className("FrameLayout").depth(19)).click();
                        sleep(1000);
                        addcart();
                    }
                }         
            };
            scrollDown(); 
            sleep(2000);
        } catch (error) {
            console.log(error.message);
            scrollUp();
            scrollDown();
            sleep(2000);
          } 
    }
}