var chess  = document.getElementById('chess');
//二维绘图 
var context = chess.getContext('2d');

context.moveTo(0,0);
context.lineTo(450,450);
//stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
context.stroke();