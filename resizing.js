// We need to compare the sizes original.w > resize.w
// The ? mean is dynamic from the picture
function Resizer( original, resize ){
				
	var self = this;

	// Store the original size
	self.original		= self.convertSize( original );

	if( resize !== undefined ){
		self.resize		= self.convertSize( resize );
	}

	// return the new size...
	return self;

}
			
// Return the new size
//----------------------------------------------------------------------------------------------
Resizer.prototype.newSize = function( resize ){

	var newsize, dynamic, message, d, s;

	// Cheeck if we have dynamic resisizing
	dynamic 	= this.checkDynamic( resize );
				
	// Store the aspect ration
	this.ratio 	= this.aspectRatio( dynamic.length );
				
	if( dynamic.length ){
		// Cheek if we have more than one dynamic operator
		if( dynamic.length > 1 ){
			// Make shure we dont have set nothing for the new size
			newsize 	= this.original;
			// Add validation message
			message 	= 'Returning the original value becouse resize = ?x?';
		}else{
			// Set the dynamic side
			d = dynamic[0];
			// Set the static side
			for ( var match in resize ) { if( d !== match ) s = match;	}
				// Calculate the dynamic side
				resize[ d ] = Math.round( resize[ s ] / this.ratio );
				// Set the new size to resize vals...
				newsize 	= resize;
				message 	= 'The new size was calculated '+resize.w+'x'+resize.h;
		}
	}else{
		// Set the new size to resize vals...
		newsize 		= resize;
		// Add validation message
		message 		= 'No calculation is done becouse we dont have dynamic side';
	}

	// return new size object
	return { 'sizes': newsize, 'msg': message  };			
			
}
			
			
// Return Aspectratio of two sizes.
//----------------------------------------------------------------------------------------------
Resizer.prototype.getSize = function( ){

	// Return the calculations
	this.newsize  	= this.newSize( this.resize );

	return { 'size': this.newsize.sizes, 'ratio': this.ratio  };
			
}

			
// Return Aspectratio of two sizes.
//----------------------------------------------------------------------------------------------
Resizer.prototype.aspectRatio = function( dynamic ){
	// Calculate the aspectratio
	return  this.calcRatio( ( dynamic || dynamic !== null ) ? this.original : this.resize );
					
	// Rounded to the nearest 100th
	//Math.round( r * 100 ) / 100;
}
			
// Return Aspectratio of two sizes.
//----------------------------------------------------------------------------------------------
Resizer.prototype.checkDynamic = function( r ){
	var ds = [];
	for ( var p in r ) { if( isNaN( r[ p ] ) ) ds.push( p ); }
	// return the cheek
	return ds;
}
	
// Calculate Ratio of two sizes.
//----------------------------------------------------------------------------------------------
Resizer.prototype.calcRatio = function( o ){

	// Calculate the aspect ratio of w and h use abs to not get negative number...
	return Math.abs( o.w / o.h );
}
			

// Convert 640x480 string to { w: 640, h: 480 } object so we have acess to the dimentions
//----------------------------------------------------------------------------------------------
Resizer.prototype.convertSize = function( s ) {
			
	// split if is string
	if( ( typeof( s ) == 'string' ) ){
		s = s.split('x');
	}
				
	// return object whit sizes
	return {
		w: Number( s[0] ) || '?' ,
		h: Number( s[1] ) || '?'
	}
}