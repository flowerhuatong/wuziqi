//落子情况(二维数组)
var chessBoard = [];
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}
//一开始黑方先落子
var me = true;

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
	console.log(i + '+' + j);
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
	//点击的时候获得X轴和Y轴的坐标
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	//判断是否已经落子
	if (chessBoard[i][j] === 0) {
		oneStep(i, j, me);
		//黑棋为1，白棋为2
		if (me) {
			chessBoard[i][j] = 1;
		} else {
			chessBoard[i][j] = 2;
		}
		me = !me;
	}
};