/**
 * Created by dake on 2018/10/29.
 */
var global={};
global.defs = {};
//通过id，对相应模块进行实例化
var instantiate = function (id) {
    var actual = global.defs[id];
    var dependencies = actual.deps;
    var definition = actual.defn;
    var len = dependencies.length;
    var instances = new Array(len);
    for (var i = 0; i < len; ++i)
        instances[i] = dem(dependencies[i]);
    var defResult = definition.apply(null, instances);
    if (defResult === undefined)
        throw 'module [' + id + '] returned undefined';
    actual.instance = defResult;
};
//定义模块，将模块ID与它的依赖、定义绑定
var def = function (id, dependencies, definition) {
    if (typeof id !== 'string')
        throw 'module id must be a string';
    else if (dependencies === undefined)
        throw 'no dependencies for ' + id;
    else if (definition === undefined)
        throw 'no definition function for ' + id;
    global.defs[id] = {
        deps: dependencies,
        defn: definition,
        instance: undefined
    };
};
//通过一个id，获取这个id对应的模块的实例，如果该实例不存在，则对其实例化
var dem = function (id) {
    var actual = global.defs[id];
    if (actual === undefined)
        throw 'module [' + id + '] was undefined';
    else if (actual.instance === undefined)
        instantiate(id);
    return actual.instance;
};
//加载请求的模块，在加载完成后的环境中运行代码
var req = function (ids, callback) {
    var len = ids.length;
    var instances = new Array();
    for (var i = 0; i < len; ++i)
        instances.push(dem(ids[i]));
    callback.apply(null, instances);
};
var define = def;
var require = req;
var demand = dem;
define(
    'MenuBar',
    ['Menu','MenuItem'],
    function (Menu,MenuItem) {
        var MenuBar = function (className,config) {
            this.className = className;
            this.me = $("<ul class='payment-wizard'><li>\n" +
                "                        <div class=\"wizard-heading\">\n" +
                "                            便携需求\n" +
                "                            <span class=\"toggle toggle--knob\">\n" +
                "                                <input type=\"checkbox\" id=\"weight\" class=\"toggle--checkbox\">\n" +
                "                                <label class=\"toggle--btn\" for=\"weight\"><span class=\"toggle--feature\"  data-label-on=\"极致轻薄\"  data-label-off=\"无所谓\"></span></label>\n" +
                "                            </span>\n" +
                "                            <span class=\"icon-location\"></span>\n" +
                "                        </div>\n" +
                "                        <div class=\"wizard-content\">\n" +
                "                            <button class=\"btn-green done\" onclick=\"console.log($('#weight').val())\" type=\"submit\">Continue</button>\n" +
                "                        </div>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <div class=\"wizard-heading\">\n" +
                "                            价格需求\n" +
                "                            <span class=\"icon-location\"></span>\n" +
                "                        </div>\n" +
                "                        <div class=\"wizard-content\">\n" +
                "\n" +
                "                            <div class=\"navBox clearfix\">\n" +
                "                                <!-- 月供 -->\n" +
                "                                <div class=\"selecteList_fisrt selectClass selecteList_month\">\n" +
                "                                    <ul class=\"nmonthlyPayment_ul clearfix\">\n" +
                "                                        <li data-nmonthlyPayment=\"\" class=\"nmonthlyPayment_noLimit selected\"><p>\n" +
                "                                            不限</p></li>\n" +
                "                                        <li data-nmonthlyPayment=\"0_2000\"><p>2000以内</p></li>\n" +
                "                                        <li data-nmonthlyPayment=\"2000_3000\"><p>2000-3000</p></li>\n" +
                "                                        <li data-nmonthlyPayment=\"3000_4000\"><p>3000-4000</p></li>\n" +
                "                                        <li data-nmonthlyPayment=\"4000_5000\"><p>4000-5000</p></li>\n" +
                "                                        <li data-nmonthlyPayment=\"5000_6000\"><p>5000以上</p></li>\n" +
                "                                    </ul>\n" +
                "                                    <!-- 左右滑动 -->\n" +
                "                                    <div class=\"moveBox\">\n" +
                "                                        <div class=\"moveTitle clearfix\"><p class=\"fl\">自定义月供<span class=\"wangCss\">&nbsp;(元)</span>\n" +
                "                                        </p>\n" +
                "                                            <p class=\"changeNum bxyc fr\">不限月供</p></div>\n" +
                "                                        <div class=\"moveContent\">\n" +
                "                                            <input type=\"text\" value=\"1111\" class=\"range_2\"/>\n" +
                "                                            <div class=\"moveScale\">\n" +
                "                                                <p>0</p>\n" +
                "                                                <p class=\"nmonthlyPayment_p_1\">1000</p>\n" +
                "                                                <p class=\"nmonthlyPayment_p_2\">2000</p>\n" +
                "                                                <p class=\"nmonthlyPayment_p_3\">3000</p>\n" +
                "                                                <p class=\"nmonthlyPayment_p_4\">4000</p>\n" +
                "                                                <p class=\"nmonthlyPayment_p_5\">5000</p>\n" +
                "                                                <p>不限</p>\n" +
                "                                            </div>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                    <!-- 确定 -->\n" +
                "                                    <div class=\"confirmButton confirmButton2\" style=\"margin-top: 100px;\">\n" +
                "                                        <a href=\"javascript:void(0);\">确定</a>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                            <button class=\"btn-green done\" type=\"submit\" onclick=\"console.log($('.changeNum').text())\" >Continue</button>\n" +
                "                        </div>\n" +
                "                    </li></ul>");
            this.menus = [];
            this.jsonData=config.data;
            this.config = config;
            this.init();
        }
        MenuBar.prototype.init = function () {
            $(this.className).append(this.me);
            this.newInstance();
        }
        MenuBar.prototype.addMenu = function (menu) {
            this.me.append(menu.me);
            this.menus.push(menu);
            menu.menuBar = this;
            if(this.config.addMenu){
                this.config.addMenu();
            }
        }
        MenuBar.prototype.renderMenu = function (menuItem) {
            this.removeMenuTo(menuItem.menu);
            menuItem.click();
        }
        MenuBar.prototype.initMenu = function (menu) {
            this.me.append(menu.me);
            this.menus.push(menu);
            menu.menuBar = this;
        }
        MenuBar.prototype.removeMenu = function () {
            var menu = this.menus.pop();
            menu.me.remove();

        }
        MenuBar.prototype.removeMenuTo = function (targetMenu) {
            while (this.menus.length>0){
                if(this.menus[this.menus.length-1]==targetMenu){
                    break;
                }else{
                    this.removeMenu();
                }
            }
        }
        MenuBar.prototype.closeOther = function (menu) {
            for(var i in this.menus){
                var tempMenu = this.menus[i];
                if(tempMenu!=menu){
                    tempMenu.close();
                }
            }
        }
        MenuBar.prototype.load = function (config) {
            this.jsonData = config.data;
            this.newInstance(this.jsonData);
        }
        MenuBar.prototype.newInstance = function () {
            var self = this;
            var jsonData = this.jsonData;
            var rootMenu =  new Menu (jsonData);
            this.initMenu(rootMenu);
            for(var i in jsonData.children){
                var data = jsonData.children[i];
                var item = this.instanceItem(data);
                rootMenu.addMenuItem(item);
            }
        }
        MenuBar.prototype.instanceItem = function (jsonData) {
            var subItems = [];
            for(var i in jsonData.children){
                var data = jsonData.children[i];
                var item = this.instanceItem(data);
                subItems.push(item);
            }
            var menuItem =  new MenuItem (jsonData,subItems);
            return menuItem;
        }
        return MenuBar;
    }
);
define(
    'MenuItem',
    ['Menu'],
    function (Menu) {
        var MenuItem = function (data,subItems) {
            var href = data.href;
            var name = data.name;
            var src = data.src;
            this.data = data;
            if(href&&href!==""){
                this.href = href;
            }else{
                this.href = "javascript:void(0)";
            }
            this.me = $("<div class='item'><div class='img_show'>\<img src='"+src+"'/></div>\n" +
                "                                    <div class='img_title'>"+name+"</div>\n" +
                "                                    <div class='img_isCheck'>\n" +
                "                                        <i class='iconfont icon-xuanzhong'></i>\n" +
                "                                    </div>\n" +
                "                                </div>");
            this.name = name;
            this.subItems = [];
            this.subItems = subItems;
            this.init();
        }
        MenuItem.prototype.init = function () {
            var self = this;
            this.me.unbind("click").click(function () {
                self.menu.clickState = false;
                self.click();
            });
        }
        MenuItem.prototype.click = function () {
            this.menu.menuBar.removeMenuTo(this.menu);
            var newMenu =  new Menu (this.data);
            for(var i in  this.subItems){
                newMenu.addMenuItem(this.subItems[i]);
            }
            this.menu.menuBar.addMenu(newMenu);
            this.menu.close();
            newMenu.open();
            if(!this.subItems || this.subItems.length == 0){
                if( this.menu.menuBar.config.renderLeaf){
                    this.menu.menuBar.config.renderLeaf(this);
                }
            }
        }
        MenuItem.prototype.addSubItems = function (dataArray) {
            if(dataArray){
                for(var i in dataArray){
                    var jsonData = dataArray[i];
                    var menuItem = this.menu.menuBar.instanceItem(jsonData);
                    this.subItems.push(menuItem);
                }
                this.menu.menuBar.renderMenu(this);
            }
        }
        return MenuItem;
    }
);
define(
    'Menu',
    [],
    function () {
        var Menu = function (data) {
            var name = data.name;
            var href = data.href;
            var title = data.title;
            var id = data.id;
            if(title!=undefined){
                name = title;
            }
            this.menuBar;
            this.clickState = true;
            this.name = name;
            if(href&&href!==""){
                this.href = href;
            }else{
                this.href = "javascript:void(0)";
            }
            // <i class='fa fa-star font-grey'></i>
            this.me = $("<li class='active'> <div class='wizard-heading'>"+name+"<span class='icon-user'></span></div> </li>");
            this.container = $("<div class='wizard-content'><div class='selectImgDiv' id='"+id+"' style='margin: 0 160px;'></div><button class='btn-green done' type='submit'>Continue</button></div>");
            this.menuItems = [];
            this.init();
        }
        Menu.prototype.init = function () {
            var self = this;
            this.me.append(this.container);
            this.me.unbind("click").click(function () {
                if(self.clickState){
                    self.click();
                }
                self.clickState = true;
            });
        }
        Menu.prototype.addMenuItem = function (menuItem) {
            menuItem.init();
            this.menuItems.push(menuItem);
            if(menuItem.subItems && menuItem.subItems.length>0){
                menuItem.me.find("a").html(menuItem.name+"<span><i class='fa fa-chevron-right'></i></span>");
            }else{
                menuItem.me.find("a").html(menuItem.name);
            }
            this.container.append(menuItem.me);
            menuItem.menu = this;
        }
        Menu.prototype.removeMenuItem = function () {
            var menuItem = this.menuItems.pop();
            menuItem.me.remove();
        }
        Menu.prototype.removeAll = function () {
            for(var i in this.menuItems){
                var temp = this.menuItems[i];
                temp.me.remove();
            }
            this.menuItems = null;
        }
        Menu.prototype.setname = function (name) {
            this.name = name;
            this.me.find("a").html(name);
        }
        Menu.prototype.toggle = function () {
            if(this.container.hasClass("open")){
                this.me.removeClass("selected");
                this.container.removeClass("open");
            }else{
                this.me.addClass("selected");
                this.container.addClass("open");
            }
        }
        Menu.prototype.open = function () {
            this.me.addClass("selected");
            this.container.addClass("open");
        }
        Menu.prototype.close = function () {
            this.me.removeClass("selected");
            this.container.removeClass("open");
        }
        Menu.prototype.click = function () {
            this.menuBar.closeOther(this);
            this.toggle();
        }
        return Menu;
    }
);