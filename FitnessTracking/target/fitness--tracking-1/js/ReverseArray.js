Array.prototype.fastReverse = function() {
	var originalArray = this;
	var left = null;
	var right = null;
	var length = originalArray.length;
	var array = [];
	
	for (left = 0, right = length - 1; left < right; left += 1, right -= 1) {
	    var temporary = originalArray[left];
	    array[left] = originalArray[right];
	    array[right] = temporary;
	}
	return array;
};