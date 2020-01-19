//module.exports = m => document.body.innerHTML += `Hello ${m}`;
let operators = ['+', '-', '*', '/', '%'];
let allOperators = ['+', '-', '*', '/', '^', '(', ')'];
let trigonometricFunctions = ['sin', 'cos', 'tg', 'ctg', 'asin', 'acos', 'atg', 'actg'];

class Calculator
{

	constructor(id)
	{
		this.id = id;
		this.expression = "0";
		this.lexems = [];
		this.vals = [];
		this.isError = false;
		this.memory = "0";
		this.mode = "Deg"; // "Rad"
	}

	buildScience()
	{
		this.expression = "0";
		let $calc = $(`#${this.id}`);
		$calc.empty().removeClass(`simple`).addClass(`science`)
			.append(`<div class="calcTitle">Science Calculator</div>`)
			.append(`<div class="calcField"></div>`)
			.append(`<div class="calcWorkField"><table class="calcButtons"></table></div>`);
		let $calcButtons = $calc.find(`.calcButtons`);
		$calcButtons
			.append(`<tr><td>←</td><td>MR</td><td>M+</td><td>M-</td><td>MS</td><td>MC</td><td>CE</td><td>C</td></tr>`)
			.append(`<tr><td>x<sup>2</sup><td>x<sup>3</sup></td><td>x<sup>y</sup></td><td>10<sup>x</sup></td><td>1/x</td><td>√</td><td>n!</td><td>=</td></tr>`)
			.append(`<tr><td>7</td><td>8</td><td>9</td><td>/</td><td>ln</td><td>Exp</td><td>(</td><td>)</td></tr>`)
			.append(`<tr><td>4</td><td>5</td><td>6</td><td>*</td><td>sin</td><td>cos</td><td>tg</td><td>ctg</td></tr>`)
			.append(`<tr><td>1</td><td>2</td><td>3</td><td>-</td><td>asin</td><td>acos</td><td>atg</td><td>actg</td></tr>`)
			.append(`<tr><td>±</td><td>0</td><td>.</td><td>+</td><td>π</td><td>e</td><td>abs</td><td class='mode'>Deg</td></tr>`);
		this.display();

		$calc.find(`.calcTitle`).click(()=>
		{
			this.buildSimple();
		});

		this.baseLogic();

		$calcButtons.find(`td:contains('←')`).click(()=>
		{
			if(this.isError == true) return;
			let pos = this.expression.length - 1;
			if(this.expression[pos] == '(')
			{
				for(pos = pos - 1; pos >= 0; pos--)
				{
					if(allOperators.indexOf(this.expression[pos]) != -1) break;
				}
				this.expression = this.expression.slice(0, pos + 1);
			}
			else this.expression = this.expression.slice(0, -1);
			if(this.expression.length == 0) 
				this.expression = '0';
			this.display();
		}).addClass(`systemBtn`);

		$calcButtons.find(`td:contains('x2')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) == -1)	
				this.expression += `^2`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('x3')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) == -1)	
				this.expression += `^3`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('xy')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) == -1)	
				this.expression += `^`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('10x')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `10^`;
			if(this.expression == '0')	this.expression = `10^`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('√')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `√(`;	
			if(this.expression == '0')	this.expression = `√(`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('n!')`).click(()=>
		{
			if(this.isError == true) return;

			let expr = this.getLastExpression();
			let pos = this.expression.lastIndexOf(expr);
			if(expr[0] == "-") 
				this.expression = this.expression.slice(0, pos + 1) + `fact(${expr.slice(1)})`;
			else if(expr[0] == "(")
				this.expression = this.expression.slice(0, pos) + `fact${expr}`;
			else this.expression = this.expression.slice(0, pos) + `fact(${expr})`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('ln')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `ln(`;	
			if(this.expression == '0')	this.expression = `ln(`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('Exp')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `Exp(`;	
			if(this.expression == '0')	this.expression = `Exp(`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('(')`).click(()=>
		{
			if(this.isError == true) return;
			let lastNumber = this.getLastNumber();
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(allOperators.indexOf(lastSymbol) != -1 && lastSymbol != ')')	
				this.expression += `(`;
			if(lastNumber == '0')
				this.expression = this.expression.slice(0, -1) + '(';
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains(')')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) == -1)	
				this.expression += `)`;
			this.display();
		}).addClass(`operationBtn`);

		$calcButtons.find(`td:contains('π')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `π`;	
			if(this.expression == '0')	this.expression = `π`;
			this.display();
		});

		$calcButtons.find(`td:contains('e')`).filter(function ()
		{
			return $(this).text() == 'e';
		}).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			// if(this.expression == '0')	this.expression = `e`;
			// else 
			if(isNaN(lastSymbol) == false || lastSymbol == `.`)	
				this.expression += `e`;	
			
			this.display();
		});

		$calcButtons.find(`td:contains('abs')`).click(()=>
		{
			if(this.isError == true) return;
			let length = this.expression.length;
			let lastSymbol = this.expression[length - 1];
			if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
				this.expression += `abs(`;	
			if(this.expression == '0')	this.expression = `abs(`;
			this.display();
		}).addClass(`operationBtn`);

		let $mode = $calcButtons.find(`td.mode`);
		$mode.click(()=>
		{
			if(this.mode == "Deg")
			{
				this.mode = "Rad";
				$mode.html("Rad");
			}
			else
			{
				this.mode = "Deg";
				$mode.html("Deg");
			}
		}).addClass(`operationBtn`);

		trigonometricFunctions.forEach((func, index) => 
		{
			$calcButtons.find(`td:contains('${func}')`).filter(function ()
			{
				return $(this).text() == func;
			}).click(()=>
			{
				if(this.isError == true) return;
				let length = this.expression.length;
				let lastSymbol = this.expression[length - 1];
				if(['+', '-', '*', '/', '^', '('].indexOf(lastSymbol) != -1)	
					this.expression += `${func}${this.mode}(`;	
				if(this.expression == '0')	this.expression = `${func}${this.mode}(`;
				this.display();
			}).addClass(`operationBtn`);
		});

	}

	baseLogic()
	{
		let $calc = $(`#${this.id}`);		
		let $calcButtons = $calc.find(`.calcButtons`);
		$calcButtons.find(`td:contains('MR')`).click(()=>
		{
			this.isError = false;
			this.expression = this.memory;			
			this.display();			
		}).addClass(`systemBtn`);
		$calcButtons.find(`td:contains('M+')`).click(()=>
		{
			if(this.isError == true) return;
			if(operators.indexOf(this.expression[this.expression.length - 1]) != -1)
			{
				if(this.memory[0] == '-') this.expression += `(${this.memory})`;
				else this.expression += this.memory;
			}
			else
			{
				if(this.memory[0] == '-') this.expression += this.memory;
				else this.expression += "+" + this.memory;
			}
			this.display();	
		}).addClass(`systemBtn`);
		$calcButtons.find(`td:contains('M-')`).click(()=>
		{
			if(this.isError == true) return;
			if(operators.indexOf(this.expression[this.expression.length - 1]) != -1)
			{
				if(this.memory[0] == '-') this.expression += `(${this.memory})`;
				else this.expression += `(-${this.memory})`;
			}
			else
			{
				if(this.memory[0] == '-') this.expression += "+" + this.memory.slice(1);
				else this.expression += "-" + this.memory;
			}
			this.display();	
		}).addClass(`systemBtn`);
		$calcButtons.find(`td:contains('MS')`).click(()=>
		{
			let number = this.compute(this.getLastExpression());			
			this.display();
			if(this.isError == true) return;
			this.memory = number;
		}).addClass(`systemBtn`);

		$calcButtons.find(`td:contains('CE')`).click(()=>
		{
			this.isError = false;
			let number = this.getLastExpression();
			let pos = this.expression.lastIndexOf(number);	
			this.expression = this.expression.slice(0, pos) + "0";
			if(this.expression.length == 0)
				this.expression = "0";
			this.display();
		}).addClass(`systemBtn`);
		$calcButtons.find(`td:contains('C')`).filter(function ()
		{
			return $(this).text() == 'C';
		}).click(()=>
		{
			this.isError = false;
			this.expression = "0";
			this.display();
		}).addClass(`systemBtn`);
		$calcButtons.find(`td:contains('MC')`).click(()=>
		{
			this.memory = "0";
			this.display();
		}).addClass(`systemBtn`);

		$calcButtons.find(`td:contains('1/x')`).click(()=>
		{
			if(this.isError == true) return;

			let expr = this.getLastExpression();
			let pos = this.expression.lastIndexOf(expr);
			if(expr[0] == "-") 
				this.expression = this.expression.slice(0, pos + 1) + '1/' + expr.slice(1);
			else this.expression = this.expression.slice(0, pos) + '1/' + expr;
			this.display();
		}).addClass(`operationBtn`);
		
		$calcButtons.find(`td:contains('±')`).click(()=>
		{
			if(this.isError == true) return;
			let lastNumber = this.getLastNumber();
			let pos = this.expression.lastIndexOf(lastNumber);
			if(lastNumber == "") return;
			if(lastNumber == '0') return;			
			let expr = this.getLastExpression();
			pos = this.expression.lastIndexOf(expr);
			if(expr[0] == "-") 
				this.expression = this.expression.slice(0, pos) + expr.slice(1);
			else
				this.expression = this.expression.slice(0, pos) + 
					(pos == 0 ? `-${expr}` : `(-${expr})`);			
			this.display();			
		}).addClass(`operationBtn`);
		$calcButtons.find(`td:contains('=')`).click(()=>
		{
			if(this.isError == true) return;
			this.expression = this.compute(this.expression);
			this.display();
		}).addClass(`eqBtn`);		
		$calcButtons.find(`td:contains('0')`).filter(function ()
		{
			return $(this).text() == '0';
		}).click(()=>
		{
			if(this.isError == true) return;
			if(this.expression[this.expression.length - 1] == 'e') return;
			if(this.getLastNumber() != '0')
			{
				this.expression += `0`;
				this.display();
			}			
		});
		for(let i = 1; i <= 9; i++)
		{
			$calcButtons.find(`td:contains('${i}')`).filter(function ()
			{
				return $(this).text() == i;
			})
			.click(()=>
			{
				if(this.isError == true) return;
				let lastNumber = this.getLastNumber();
				let length = this.expression.length;
				if(length > 0 && this.expression[length - 1] == ')') return;
				if(this.expression[length - 1] == 'e') return;		
				if(lastNumber != '0')
					this.expression += i.toString();
				else
				{
					this.expression = this.expression.slice(0, -1) + i;
				} 
				this.display();
			});
		}
		$calcButtons.find(`td:contains('.')`).click(()=>
		{
			if(this.isError == true) return;
			let number = this.getLastNumber();
			if(number.indexOf('.') != -1) return;
			if(number.length == 0) this.expression += `0`;
			this.expression += `.`;
			this.display();
		});

		operators.forEach((operator) => 
		{
			$calcButtons.find(`td:contains(${operator})`).filter(function ()
			{
				return $(this).text() == operator;
			})
			.click(()=>
			{
				if(this.isError == true) return;
				let lastSymbol = this.expression[this.expression.length - 1];
				if(operators.indexOf(lastSymbol) == -1)
				{
					if(operator != '-' && lastSymbol == '(') return;
					if(['-', '+'].indexOf(operator) == -1 && lastSymbol == 'e') return;
					if(operator == '%')
					{
						let lastNumber = this.getLastNumber();
						let pos = this.expression.lastIndexOf(lastNumber);
						if(pos == 0) this.expression = '0';
						else
						{
							this.getLexems();
							this.getValues();
							let number = parseFloat(this.vals[this.vals.length - 2]);
							let percent = parseFloat(this.vals[this.vals.length - 1]) / 100;
							number = number * percent;
							this.expression = this.expression.slice(0, pos) + number;
						}
						this.display();
						return;
					}
					this.expression += operator;
					this.display();
				}
			}).addClass(`operationBtn`);
		});
	}

	buildSimple()
	{
		this.expression = "0";
		let $calc = $(`#${this.id}`);
		$calc.empty().removeClass(`science`).addClass(`simple`)
			.append(`<div class="calcTitle">Simple Calculator</div>`)
			.append(`<div class="calcField"></div>`)
			.append(`<div class="calcWorkField"><table class="calcButtons"></table></div>`);
		let $calcButtons = $calc.find(`.calcButtons`);
		$calcButtons
			.append(`<tr><td>MR</td><td>M+</td><td>M-</td><td>MS</td></tr>`)
			.append(`<tr><td>←</td><td>CE</td><td>C</td><td>MC</td></tr>`)
			.append(`<tr><td>%</td><td>1/x</td><td>√</td><td>=</td></tr>`)
			.append(`<tr><td>7</td><td>8</td><td>9</td><td>/</td></tr>`)
			.append(`<tr><td>4</td><td>5</td><td>6</td><td>*</td></tr>`)
			.append(`<tr><td>1</td><td>2</td><td>3</td><td>-</td></tr>`)
			.append(`<tr><td>±</td><td>0</td><td>.</td><td>+</td>`);

		this.display();
		$calc.find(`.calcTitle`).click(()=>
		{
			this.buildScience();
		});
		this.baseLogic();
		$calcButtons.find(`td:contains('←')`).click(()=>
		{
			if(this.isError == true) return;
			if(this.expression[this.expression.length - 1] == ')')
			{
				let lastNumber = this.getLastNumber();
				let pos = this.expression.lastIndexOf(lastNumber);
				this.expression = this.expression.slice(0, pos - 2) + lastNumber;
			}
			else this.expression = this.expression.slice(0, -1);
			if(this.expression.length == 0) 
				this.expression = '0';
			this.display();
		}).addClass(`systemBtn`);

		$calcButtons.find(`td:contains('√')`).click(()=>
		{
			if(this.isError == true) return;
			let lastNumber = this.getLastNumber();
			let pos = this.expression.lastIndexOf(lastNumber);
			if(lastNumber == "") return;			
			let expr = this.getLastExpression();
			pos = this.expression.lastIndexOf(expr);
			console.log(expr);
			let number = parseFloat(this.compute(expr));			
			if(number < 0)
			{
				this.expression = "error";
				this.isError = true;
			}
			else this.expression = this.expression.slice(0, pos) + Math.sqrt(number);			
			this.display();
		}).addClass(`operationBtn`);
	}	

	display()
	{
		let expr = this.expression.replace("Deg", "<sub>Deg</sub>");
		expr = expr.replace("Rad", "<sub>Rad</sub>");
		$(`#${this.id}`).find(`.calcField`).html(expr);
	}

	compute(expression)
	{
		let result;
		try {
			result = this.parseExpression(expression);
			if(result.indexOf("Infinity") != -1) throw "error";
			if(result.indexOf("Nan") != -1) throw "error";
		} catch(e) {
			result = "error";
			this.isError = true;
			this.display();
		}
		return result;
	}

	parseExpression(expression)
	{
		expression = expression.replace("√", "Math.sqrt");
		expression = this.parsePow(expression);
		expression = expression.replace("ln", "Math.log");
		expression = expression.replace("Exp", "Math.exp");
		expression = expression.replace("fact", "this.factorial");
		expression = expression.replace("abs", "Math.abs");
		expression = expression.replace("π", "Math.PI");
		trigonometricFunctions.forEach((func, index) =>
		{
			let pos = 0;
			while(expression.indexOf(func, pos) != -1)
			{
				pos = expression.indexOf(func, pos);
				if(pos > 0)
				{
					if(/[a-zA-Z]/.test(expression[pos - 1]) == true)
						pos+=6;
					else
					{
						expression = expression.slice(0, pos) + "this." + expression.slice(pos);
						pos+=6;
					}
				}
				else 
				{
					expression = expression.slice(0, pos) + "this." + expression.slice(pos);
					pos+=6;
				}
				if(pos >= expression.length - 1) break;
			}
		});
		return eval(expression).toString();
	}

	sinDeg(value)
	{
		return Math.sin(Math.PI / 180 * value);
	}

	sinRad(value)
	{
		return Math.sin(value);
	}

	cosDeg(value)
	{
		return Math.cos(Math.PI / 180 * value);
	}

	cosRad(value)
	{
		return Math.cos(value);
	}

	tgDeg(value)
	{
		return Math.tan(Math.PI / 180 * value);
	}

	tgRad(value)
	{
		return Math.tan(value);
	}

	ctgDeg(value)
	{
		return 1 / Math.tan(Math.PI / 180 * value);
	}

	ctgRad(value)
	{
		return 1 / Math.tan(value);
	}

	asinDeg(value)
	{
		return 180 / Math.PI * Math.asin(value);
	}

	asinRad(value)
	{
		return Math.asin(value);
	}

	acosDeg(value)
	{
		return 180 / Math.PI *  Math.acos(value);
	}

	acosRad(value)
	{
		return Math.acos(value);
	}

	atgDeg(value)
	{
		return 180 / Math.PI *  Math.atan(value);
	}

	atgRad(value)
	{
		return Math.atan(value);
	}

	actgDeg(value)
	{
		return 180 / Math.PI * (Math.PI / 2 -  Math.atan(value));
	}

	atgRad(value)
	{
		return Math.PI / 2 - Math.atan(value);
	}

	factorial(value)
	{
		if(value < 0) throw "error";
		if(value.toString().indexOf('.') != -1) throw "error";
		let rval = 1;
	    for (let i = 2; i <= value; i++)
	        rval = rval * i;
	    return rval;
	}

	parsePow(expression)
	{
		while(expression.indexOf('^') != -1)
		{
			let pos = expression.indexOf('^');
			let prev = this.getPrevExpression(expression, pos);
			let next = this.getNextExpression(expression, pos);
			expression = expression.slice(0, pos - prev.length) + 
				`Math.pow(${prev}, ${next})` + expression.slice(pos + next.length + 1); 
		}
		return expression;
	}

	getPrevExpression(expression, pos)
	{
		let counter = 0;
		let expr = "";
		for(let i = pos - 1; i >= 0; i--)
		{
			if(expression[i] == ')') counter++;
			if(expression[i] == '(') counter--;
			if(counter == 0)
			{
				if(['+', '*', '/', '^'].indexOf(expression[i]) != -1) break;
				if(expression[i] == '-')
				{
					if(i == 0) break;
					if(expression[i - 1] != '(') break;
				}
			}
			expr = expression[i] + expr;
			if(['+', '-', '*', '/', '^'].indexOf(expression[i]) == -1) continue;
			if(counter == 0) break;
		}
		return expr;
	}

	getNextExpression(expression, pos)
	{
		let counter = 0;
		let expr = "";
		for(let i = pos + 1; i < expression.length; i++)
		{
			if(expression[i] == ')') counter--;
			if(expression[i] == '(') counter++;
			if(counter == 0)
			{
				if(['+', '*', '/', '^'].indexOf(expression[i]) != -1) break;
				if(expression[i] == '-')
				{
					if(i == 0) break;
					if(expression[i - 1] != '(') break;
				}
			}
			expr += expression[i];
			if(['+', '-', '*', '/', '^'].indexOf(expression[i]) == -1) continue;
			if(counter == 0) break;
		}
		return expr;
	}

	getLastNumber(last)
	{
		let number = "";
		let expr = this.expression;
		if(last == undefined) last = expr.length - 1;
		for(let i = last; i >= 0; i--)
		{			
			if(expr[i] == ')') continue;
			if(isNaN(expr[i]) == false || expr[i] == '.' || expr[i] == 'e')
				number = expr[i] + number;
			else if((i == 0 || expr[i - 1] == '(') && expr[i] == '-')
				number = expr[i] + number;
			else if(i > 0 && expr[i - 1] == 'e' && (expr[i] == '-' || expr[i] == '+'))
				number = expr[i] + number;
			else return number;
		}		
		return number;
	}

	getLastExpression()
	{
		let number = "";
		let expr = this.expression;
		let counter = 0;
		let lastNumber = this.getLastNumber();
		for(let i = expr.length - 1; i >= 0; i--)
		{			
			if(expr[i] == ')') counter++;
			if(expr[i] == '(') counter--;
			if(counter == 0)
			{
				if(['+', '*', '/', '^'].indexOf(expr[i]) != -1) break;
				if(expr[i] == '-')
				{
					if(i == 0) break;
					if(expr[i - 1] != '(') break;
				}
			}
			number = expr[i] + number;
			if(['+', '-', '*', '/', '^'].indexOf(expr[i]) == -1) continue;
			if(counter == 0) break;
		}		
		if(lastNumber.length > number.length) number = lastNumber;
		return number;
	}

	getLexems()
	{
		let lexems = [];
		let expr = this.expression;
		expr = expr.toLowerCase();
		let lexem = ""; 
		for(let i = 0; i < expr.length; i++)
		{
			let symbol = expr[i];
			if(isNaN(symbol) == true)
			{
				let length = lexem.length;
				if(length > 0 && lexem[length - 1] == 'e')
				{
					if(symbol == '-' || symbol == '+')
						lexem += symbol;
				}
				if(allOperators.indexOf(symbol) != -1)
				{
					if(symbol == '-' && (i == 0 || expr[i - 1] == '('))
						lexem += symbol;
					else 
					{
						if(lexem.length > 0)
							lexems.push({ value: lexem, type: this.getType(lexem)});
						lexems.push({ value: symbol, type: this.getType(symbol)});
						lexem = "";
					}
				}
				if(symbol == '.') lexem += symbol;
			}
			else
			{
				lexem += symbol;
			}
		}
		if(lexem != "") lexems.push({ value: lexem, type: this.getType(lexem)});
		this.lexems = lexems;
	}

	getType(lexem)
	{
		if(allOperators.indexOf(lexem) != -1) return "operator";
		if(isNaN(lexem) == false) return "number";
		if(lexem == 'π') return "const";
		return "func";
	}

	getValues()
	{
		this.vals = this.lexems.filter((lexem) => lexem.type == "number" || lexem.type == "const");
		if(this.vals.length > 0)
			this.vals = this.vals.map((lexem) => lexem.value);
	}

}

module.exports = Calculator;