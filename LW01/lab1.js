class Lab1
{
	constructor(){}

	task1(str)
	{
		let word = str.toLowerCase();
		let wordArr = word.split("");
		let symbols = [];
		for(let i = 0; i < wordArr.length; i++)
		{
			if(symbols.indexOf(wordArr[i]) == -1)
				symbols.push(wordArr[i]);
			else return false;
		}
		return true;
	}

	task2(number)
	{
		let numbers = number.toString().split("");
		numbers = numbers.map((symbol) => parseInt(symbol, 10));		
		if(numbers.length == 1) return -1;

		let results = [[]];
		for (let i = 0; i < numbers.length; i++)
		{
			while(results[results.length - 1].length == i)
			{
				let last = results.pop();
				for (let j = 0; j <= last.length; j++)
				{
					let copy = last.slice();
					copy.splice(j, 0, numbers[i]);					
					results.unshift(copy);					
				}				
			}
		}

		let lessNumber = -1;
		results.forEach((permute) => 
		{
			let newNumber = permute.join("");
			if(newNumber < number && newNumber > lessNumber) lessNumber = newNumber;
		});
	    if(lessNumber[0] == 0 || lessNumber == number) return -1;
	    return parseInt(lessNumber, 10);
	}
}

module.exports = Lab1;
