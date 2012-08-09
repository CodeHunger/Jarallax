# Scroll Converter

This script converts vertical scrolling to horizontal scrolling. Most mouses only have a scroll wheel for vertical scrolling, which makes it difficult to scroll horizontally on a website. If you have a site where you want to be able to scroll vertically using the scroll wheel (or trackpad) to scroll the content horizontally, this is the script for you!




## How it works


The script listens for changes of the mouse wheel data, and updates the horizontal scroll value based on that. Sometimes the browser uses scrolling with easing, which is also transferred correctly. It will not perform exactly as normal scrolling, but it works good enough.


### Browser differences

While developing this I noticed big differences between browsers. It is very difficult to get this perfect in all browsers, so what I have tried is getting it fairly good in all browsers.

There are two properties in the event object where you can capture the wheel data: `wheelDelta` and `detail`. Different browsers use different properties, and give different values for the same amount of scroll. This script doesn't try to give a normalized value from these, but instead tries to normalize the experience to some degree.

Different pointing devices will give different results. A regular scroll wheel on an average mouse scroll in steps. A nice trackpad will have much better detail. Not all browsers expose this detail though. During my testing I found that Firefox gives the same value for a regular scroll wheel and a trackpad, while Safari and Chrome give different values and more fine-grained detail for the trackpad. That means the scrolling will look much better in these browsers, when using a good trackpad.


### Browser support

It works in all browsers I have tried in, including IE down to version 6.



## Usage


### Include the script into your page

	<script src="scroll-converter.min.js"></script>


### Initialize the script
To enable the script you need to activate it.

	scrollConverter.activate();

The `activate` method takes a function as an optional argument, which will execute everytime the scrolling updates. The first argument of that function is the current horizontal scroll offset.

	scrollConverter.activate(function (offset) {
		console.log(offset); // Logs the current horizontal scroll offset
	});


### Deactivation
If you later want to deactivate the conversion, you can call the `deactivate` method:

	scrollConverter.deactivate();

You can also deactivate all kinds off scrolling on the page, by calling this method:

	scrollConverter.deactivateAllScrolling();

If you want to activate the scrolling again you can just call the `activate` method again (but you can't pass a callback at this point).



## License


This script was developed by me ([Johannes Koggdal](http://koggdal.com/)) while working at [BombayWorks](http://bombayworks.com/). We open source it under the MIT license to spread the knowledge and make it simpler for other people to make the web more awesome.