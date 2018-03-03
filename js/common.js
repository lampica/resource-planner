function toPercent(number) 
{
	var percent = parseFloat(number*100).toFixed(1)+"%";
	return percent;
}

function toFixedFloat(number, decSpaces) 
{
	var percent = parseFloat(number).toFixed(decSpaces);
	return percent;
}