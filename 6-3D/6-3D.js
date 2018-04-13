(function() {
	function DemoRun(n) {
		/*中心变换区域所在盒子*/
		this.oUlLists = document.querySelector("ul.lists");
		/*button所在盒子*/
		this.oUlChangeBtn = document.querySelector("ul.changeBtn");
		/*中心变换盒子中一行小方块的个数*/
		this.listN =n;
		/*控制中心变换盒子中每一行的小方块个数*/
		if(this.listN%2==0) {
			this.tranN = Math.ceil(this.listN/2);
		}else {
			this.tranN = Math.floor(this.listN/2);
		}
		/*二维空间内可视小方块个数*/
		this.listN2 =this.listN*this.listN;
		/*三维空间内可是小方块个数*/
		this.lists = this.listN*this.listN*this.listN;
	}
	DemoRun.prototype = {
		/*初始化*/
		init: function() {
			/*执行创建下方切换按钮的函数*/
			this.creatChangeBtn();
			/*执行在变换区域创建小方块的函数*/
			this.creatLists();
			/*尾异步加载动画*/
			setTimeout(function() {
				this.grid();
				// this.hex();
			}.bind(this),200)
			/*执行单机buttom切换的函数*/
			this.change();
		},
		// 创建切换button
		creatChangeBtn: function() {
			var txt= "",
				oli1 = "<li class='one'>grid</li>",
				oli2 = "<li class='two'>table</li>",
				oli3 = "<li class='three'>hex</li>";
			txt= oli1+oli2+oli3;
			this.oUlChangeBtn.innerHTML = txt;
		},
		// 创建中心块
		creatLists: function() {
			var oFrag = document.createDocumentFragment();
			for(var i=0;i<this.lists;i++) {
				var oli = document.createElement("li");
				var	tXrandom = Math.random()*1500-600,//随机X位移
					tYrandom = Math.random()*900-300,//随机Y位移
					tZrandom = Math.random()*5000-300;//随机Z位移
				oli.innerHTML = "Hello";
				// oli.style.transform = "translate3d("+tXrandom+"px,"+tYrandom+"px,"+tZrandom+"px)";
				oFrag.appendChild(oli);
			}
			this.oUlLists.appendChild(oFrag);
		},
		// 三维
		grid: function() {
			// 函数执行优化
			if(this.grid.arr) {
				for(var i=0;i<this.lists;i++) {
					this.aLis[i].style.transform = this.grid.arr[i];
				}
			}else {
				this.grid.arr = [];
				this.aLis = document.querySelectorAll("ul.lists li"),
					distX = 150,
					distY = 100,
					distZ = -3000;
				for(var i=0;i<this.lists;i++) {
					var tx = i%this.listN-this.tranN,
						ty = Math.floor(i%this.listN2/this.listN)-this.tranN,
						tz = Math.floor(i/this.listN2)%this.listN;
					var val = "translate3D("+tx*distX+"px,"+ty*distY+"px,"+tz*distZ+"px)"; 
					console.log(val);
					this.grid.arr[i] = val;
					this.aLis[i].style.transform = val;
				}
			}
		},
		// 表格
		table: function() {
			if(this.table.arr) {
				for(var i=0;i<this.lists;i++) {
					this.aLis[i].style.transform = this.table.arr[i];
				}	
			}else {
				this.table.arr = [];
				this.aLis = document.querySelectorAll("ul.lists li"),
					distX = 70,
					distY = 70,
					listRow = this.listN*3;
				for(var i=0;i<this.lists;i++) {
					var nowTranRow = Math.floor(listRow/2),
						nowTranCol = Math.floor(listRow/3)-1,
						tx = i%listRow-nowTranRow;
						ty = Math.floor(i/listRow%listRow)-nowTranCol;
					var val = "translate3D("+tx*distX+"px,"+ty*distY+"px,-1000px)";
					this.table.arr[i] = val;
					this.aLis[i].style.transform = val;
				}
			}
			
		},
		// 螺旋
		hex: function() {
			if(this.hex.arr) {
				for(var i=0;i<this.lists;i++) {
					this.aLis[i].style.transform = this.hex.arr[i];
				}
			}else {
				this.hex.arr = [];
				this.aLis = document.querySelectorAll("ul.lists li"),
					cir = this.listN-2,
					num = this.lists/cir;
					deg = 360/num,
					ty = this.listN-cir;
					tz = this.listN*75;
				for(var i=0;i<this.lists;i++) {
					var val = "rotateY("+i*deg+"deg) translateY("+(i-70)*ty+"px)translateZ("+tz+"px)";
					this.hex.arr[i] = val;
					this.aLis[i].style.transform = val;
				}
			}
			
		},
		change: function() {
			var aLiChangeBtn = document.querySelectorAll("ul.changeBtn li"),
				arrLiChangeBtn = [],
				arrInit = [this.grid,this.table,this.hex];
			for(var i=0,len=aLiChangeBtn.length;i<len;i++) {
				arrLiChangeBtn.push(aLiChangeBtn[i]);
			}
			for(let i=0,len=arrLiChangeBtn.length;i<len;i++) {
				arrLiChangeBtn[i].onclick = function() {
					arrInit[i].call(this);
				}.bind(this);
				/*此处必须绑定两次this指向，否则执行错误*/ 
			}
		}
	};
	var demoRun = new DemoRun(5);
	demoRun.init();
})();


