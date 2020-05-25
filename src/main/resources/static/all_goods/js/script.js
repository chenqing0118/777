let $card = $(".card");
let $button = $(".shop");
let productInfo = $(".prod-info");

const createSleeveText = () => {
	$card.each((index, element) => {
		let content = $(element)
			.find("p")
			.text();
		let splitContent = content.split(" ");
		$(element)
			.find("p")
			.text("");
		splitContent.forEach((text, index) => {
			$(element).find("p").append(`
				<span class="sleeve-element">
 					<span class="slvd-text">${text} </span>
 				</span>
			`);
		});
	});
};


const setHeight = () => {
	$card.each((index, element) => {
		let $this = $(element);
		let setHeight = $this.outerHeight();
		$this
			.attr("data-height", setHeight)
			.height($this.find(".card_hero").height() + "px");
	});

	let slider = new Flickity(".card-parent", {
		pageDots: false,
		prevNextButtons: false,
		freeScroll: true
	});

	$(".card-parent")
		.find(".flickity-viewport")
		.css({ overflow: "visible" });
};

const expandCard = event => {
	let $this = $(event.currentTarget);
	let $cardParent = $this.parent();
	let $slvText = $(".slvd-text");

	if ($cardParent.hasClass("active")) {
		$cardParent.css({
			height: $cardParent.find(".card_hero").height() + "px"
		});
		$cardParent.removeClass("active");
		$cardParent.find(".slvd-text").each((index, textBlock) => {
			let $slvdTextEl = $(textBlock);
			$(textBlock).css({ "transition-delay": "0ms" });
		});
	} else {
		$cardParent.css({
			height: $cardParent.attr("data-height") + "px"
		});
		$this.parents(".card-parent").height($cardParent.attr("data-height") + "px");
		$cardParent.addClass("active");
		$cardParent.find(".slvd-text").each((index, textBlock) => {
			let delay = 30 * index + "ms";
			let $slvdTextEl = $(textBlock);
			$(textBlock).css({ "transition-delay": delay });
		});
	}
};

createSleeveText();
setHeight();
$button.on("click", event => expandCard(event));