//棋局结束状态
var over = false;
//落子情况(二维数组)
var chessBoard = [];
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}
//赢法的数组
var wins = [];
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
//一开始黑方先落子
var me = true;
//赢法种类的索引
var count = 0;
//横线赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}
console.log(count);

//赢法的统计数组
var myWin = [];
var computerWin = [];
for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}
var chess = document.getElementById('chess');
//二维绘图 
var context = chess.getContext('2d');
//线条颜色
context.strokeSytle = '#BFBFBF';

//添加背景图片
var logo = new Image();
logo.src = 'image/1.jpg';
logo.onload = function() {
	//向画布上面绘制图片
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
};


//绘制五子棋盘
var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		//绘制竖线
		//线条的开始位置
		context.moveTo(15 + i * 30, 15);
		//线条的结束位置
		context.lineTo(15 + i * 30, 435);
		//stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
		context.stroke();

		//绘制横线
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}
};
//落子的位置和颜色
var oneStep = function(i, j, me) {

	//beginPath() 方法在一个画布中开始子路径的一个新的集合。
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	//closePath() 方法关闭一条打开的子路径。
	context.closePath();
	//填充渐变颜色
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, '#0A0A0A');
		gradient.addColorStop(1, '#636766');
	} else {
		gradient.addColorStop(0, '#D1D1D1');
		gradient.addColorStop(1, '#F9F9F9');
	}
	//填充的颜色
	context.fillStyle = gradient;
	//stroke()是用来描边的，fill()是用来填充的
	context.fill();
};

//落子事件
chess.onclick = function(e) {
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	//点击的时候获得X轴和Y轴的坐标
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	//判断是否已经落子
	if (chessBoard[i][j] === 0) {
		oneStep(i, j, me);
		//黑棋为1
		chessBoard[i][j] = 1;
		for (var k = 0; k < count; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k] === 5) {
					window.alert('你赢了');
					over = true;
				}
			}
		}
		if (!over) {
			me = !me;
			computerAl();
		}
	}
};
var computerAl = function() {
	//人脑和电脑的分数二维数组
	var myScore = [];
	var computerScore = [];
	//最高分数
	var max = 0;
	//最高分数的坐标
	var u = 0,
		v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;

		}
	}

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBoard[i][j] === 0) {
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						//人脑拦截程度
						if (myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if (myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if (myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if (myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						//电脑必下程度
						if (computerWin[k] == 1) {
							computerScore[i][j] += 220;
						} else if (computerWin[k] == 2) {
							computerScore[i][j] += 420;
						} else if (computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						} else if (computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (computerScore[i][j] == max) {
					if(computerScore[i][j]>computerScore[u][v]){
						u = i;
						v = j;
					}	
				}

				if (computerScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore[i][j] == max) {
					if(myScore[i][j]>myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	for (var k = 0; k < count; k++) {
			if (wins[u][v][k]) {
				computerWin[k]++;
				myWin[k] = 6;
				if (computerWin[k] === 5) {
					window.alert('你输了');
					over = true;
				}
			}
		}
		if (!over) {
			me = !me;
		}
};