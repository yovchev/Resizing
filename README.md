# [Resizing](http://daniel3d.github.com/Resizing) - Javascript Resizing Algorithm 

Algorithem which resize from size A to size B where you can use size B whit dynamic 
side


## Feature Overview

- Fast algorithem to calculate dynamic side of given size.
- Calculate aspect ratio.


## A Few Examples

### None dynamic Resizing:

If you use it non dynamic way is not making almost nothing.
but it give you the aspect ratio of the size.

```javascript

	resize = new Resizer('800x600', '640x480');

	resizing.getSize();

	/*
	{
		ratio: 1.3333333333333333
		size: {
			h: 480
			w: 640
		}
	}
	*/

```

### Dynamic Resizing:

The dymaic one is tricky because give you ability 
to ask for one of the side to be dynamically calculated.

```javascript

	resizing = new Resizer('800x600', '300x?');

	resizing.getSize();

	/*
		{
			ratio: 1.3333333333333333
			size: {
				h: 225
				w: 300
			}
		}
	*/

```

## Inputs

You can input sizes couple of ways.

```javascript
	
	// You can pass array
	from = ['800', '600'];
	// Or object whit keys w - width, h - height
	to 	 = { w: '300', h: '?' };

	resizing = new Resizer(from, to);

	resizing.getSize();

	/*
		{
			ratio: 1.3333333333333333
			size: {
				h: 225
				w: 300
			}
		}
	*/

```

## License

Resizing is open-sourced software licensed under the MIT License.
