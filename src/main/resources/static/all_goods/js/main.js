/**
 * main.js
 */
var tips=[['大大大','小小小']];
var Level=[['性能相对较弱，','性能相对较强，'],['容量相对小，','容量相对大，'],['低色域屏幕，','高色域屏幕，']];
var cpu=[['满足办公影音需求。','可以胜任更繁重的工作。'],['可以满足多数游戏。','游戏更加流畅。'],['基本满足生产工具需求。','作为生产工具可节约更多时间。']];
var gpu=[['满足办公影音需求。','可以满足一些国民游戏。'],['可以满足一些国民游戏。<1650maxq','多数游戏中低特效。<=1660ti','游戏基本无限制。>=2060maxq'],['不会有严重影响。','支持显卡加速的计算（人工智能，渲染）节约部分时间']];
var storageLevel=['容量相对小，','容量相对大，'];
var memorySize=[['满足办公影音需求','可以同时开启更多软件。'],['可以满足多数游戏。=16','游戏无压力。'],['作为生产工具必备容量。=16','作为生产工具多多益善。']];
var memoryRate=['频率相对低，可以满足需求。','频率相对高，对少部分游戏有提升效果。'];
var storage=[['不适合存放大量资料。<=256','存放更多资料和软件。'],['游戏玩家基础容量=512','可存放多款大型游戏。'],['生产工具基础容量=512','安装更多软件，保存更多项目文件，多多益善。']];
var gamutLevel=['低色域屏幕，','高色域屏幕，'];
var gamut=[['不会影响文字办公和网页浏览。','更好的观影体验。'],['游戏画面展现一般。','更真实的游戏画面体验。'],['不会影响代码工作。','图像工作者必备。']];
var refreshRate=['一般刷新率，满足多数需求。=60','高刷新率，竞技游戏更加连贯。>100'];

(function() {

	var viewEl = document.querySelector('.view'),
		gridEl = viewEl.querySelector('.grid'),
		items = [].slice.call(gridEl.querySelectorAll('.product')),
		basket;

	// the compare basket
	function CompareBasket() {
		this.el = document.querySelector('.compare-basket');
		this.compareCtrl = this.el.querySelector('.action--compare');
		this.compareWrapper = document.querySelector('.compare');
		this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close');
		
		this.itemsAllowed = 2;
		this.totalItems = 0;
		this.items = [];

		// compares items in the compare basket: opens the compare products wrapper
		this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
		// close the compare products wrapper
		var self = this;
		this.closeCompareCtrl.addEventListener('click', function() {
			// toggle compare basket
			classie.add(self.el, 'compare-basket--active');
			// animate..
			classie.remove(viewEl, 'view--compare');
		});
	}

	CompareBasket.prototype.add = function(item) {
		// check limit
		if( this.isFull() ) {
			return false;
		}

		classie.add(item, 'product--selected');

		// create item preview element
		var preview = this._createItemPreview(item);
		// prepend it to the basket
		this.el.insertBefore(preview, this.el.childNodes[0]);
		// insert item
		this.items.push(preview);

		this.totalItems++;
		if( this.isFull() ) {
			classie.add(this.el, 'compare-basket--full');
		}

		classie.add(this.el, 'compare-basket--active');
	};

	CompareBasket.prototype._createItemPreview = function(item) {
		var self = this;

		var preview = document.createElement('div');
		preview.className = 'product-icon';
		preview.setAttribute('data-idx', items.indexOf(item));
		
		var removeCtrl = document.createElement('button');
		removeCtrl.className = 'action action--remove';
		removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
		removeCtrl.addEventListener('click', function() {
			self.remove(item);
		});
		
		var productImageEl = item.querySelector('img.product__image').cloneNode(true);

		preview.appendChild(productImageEl);
		preview.appendChild(removeCtrl);

		var productInfo = item.querySelector('.product__info').innerHTML;
		preview.setAttribute('data-info', productInfo);

		return preview;
	};

	CompareBasket.prototype.remove = function(item) {
		classie.remove(this.el, 'compare-basket--full');
		classie.remove(item, 'product--selected');
		var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
		this.el.removeChild(preview);
		this.totalItems--;

		var indexRemove = this.items.indexOf(preview);
		this.items.splice(indexRemove, 1);

		if( this.totalItems === 0 ) {
			classie.remove(this.el, 'compare-basket--active');
		}

		// checkbox
		var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
		if( checkbox.checked ) {
			checkbox.checked = false;
		}
	};

	CompareBasket.prototype._compareItems = function() {
		var self = this;

		// remove all previous items inside the compareWrapper element
		[].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function(item) {
			self.compareWrapper.removeChild(item);
		});

		for( i = 0; i < this.totalItems; ++i) {
			var compareItemWrapper = document.createElement('div');
			compareItemWrapper.className = 'compare__item';

			var compareItemEffectEl = document.createElement('div');
			compareItemEffectEl.className = 'compare__effect';

			compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
            // alert(compareItemEffectEl.querySelector('span.cpu').textContent);
			compareItemWrapper.appendChild(compareItemEffectEl);

			this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
		}

		//高亮字段
		var columnList = document.getElementsByClassName('column');
		for ( i = 0; i < columnList.length;i++){

			columnList[i].style.fontWeight='bold';
			columnList[i].style.fontsize='120%';
		}


        var compareList=document.querySelectorAll('div.compare__item');
		if(parseInt(compareList[0].querySelector('span.memorySize').textContent)>parseInt(compareList[1].querySelector('span.memorySize').textContent)){
			compareList[0].querySelector('span.memorySizeTips').textContent=tips[0][0];
			compareList[1].querySelector('span.memorySizeTips').textContent=tips[0][1];
		}else{
			compareList[0].querySelector('span.memorySizeTips').textContent=tips[0][1];
			compareList[1].querySelector('span.memorySizeTips').textContent=tips[0][0];
		}
		// if(parseInt(compareList[0].querySelector('span.storage').textContent)>parseInt(compareList[1].querySelector('span.storage').textContent)){
		// 	compareList[0].querySelector('span.storageTips').textContent=tips[0][0];
		// 	compareList[1].querySelector('span.storageTips').textContent=tips[0][1];
		// }else{
		// 	compareList[0].querySelector('span.storageTips').textContent=tips[0][1];
		// 	compareList[1].querySelector('span.storageTips').textContent=tips[0][0];
		// }
		setTimeout(function() {
			// toggle compare basket
			classie.remove(self.el, 'compare-basket--active');
			// animate..
			classie.add(viewEl, 'view--compare');
		}, 25);
	};

	CompareBasket.prototype.isFull = function() {
		return this.totalItems === this.itemsAllowed;
	};

	function init() {
		// initialize an empty basket
		basket = new CompareBasket();
		initEvents();
	}

	function initEvents() {
		items.forEach(function(item) {
			var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
			checkbox.checked = false;

			// ctrl to add to the "compare basket"
			checkbox.addEventListener('click', function(ev) {
				if( ev.target.checked ) {
					if( basket.isFull() ) {
						ev.preventDefault();
						return false;
					}
					basket.add(item);
				}
				else {
					basket.remove(item);
				}
			});
		});
	}

	init();

})();