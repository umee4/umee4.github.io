//------------------------------------
//共通汎用関数
//------------------------------------
(function(global){
	'use strict';
  
	  /* dialog */
	  function showDialog(arrParam, styleFile){
  
		  let sDom=
			  '<div class="dialog-background" style="position: fixed;top: 0;left: 0;height: 100%;width: 100%;">'
			  + '<div class="dialog" style="position: fixed; top: 271px; left: 78.5px;">'
				+ '<div class="modal-header">' + arrParam[0] + '</div>';
		  if(arrParam.length !== 2){
			  for(let i=1, len=arrParam.length; i<len; i=i+2){
				  // sDom+='<div class="modal-selects" onclick="' + arrParam[i+1] + ';document.querySelector(\'.dialog-background\').close();">' + arrParam[i] + '</div>';
				  sDom+='<div class="modal-selects">' + arrParam[i] + '</div>';
			  }
		  }
		  sDom+='</div></div><div></div>';
  
		  const node=document.createElement("div");
		  node.innerHTML=sDom;
		  if(document.querySelector('.dialog-background')) document.querySelector('.dialog-background').parentElement.remove();
		  document.body.appendChild(node);
  
		  if(arrParam.length === 2){
			  //フラッシュメッセージ
			  setTimeout(function () { document.querySelector('.dialog-background').close(); }, arrParam[1]);
		  }else{
			  let nodeSelects = document.querySelectorAll('.modal-selects');
			  for(let i=2, j=0, len=arrParam.length; i<len; i=i+2){
				  nodeSelects[j++].addEventListener("click" , ()=>{
					  document.querySelector('.dialog-background').close();
					  arrParam[i]();
				  }, false);
			  }
		  }

		  var callbackFunc = function(){
			const self = document.querySelector('.dialog-background');

			self.resize = function(){
				// var div=self.root.firstChild.firstElementChild;
				// if(!div){return};
				var windowWidth = (window.innerWidth || document.documentElement.clientWidth || 0);
				var windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
				self.style.top= ((windowHeight - self.offsetHeight)/2) + "px";
				self.style.left= ((windowWidth - self.offsetWidth)/2) + "px";
			}

			//   self.on('update', function () {
			// 	self.resize();
			//   })

			self.showModal=function(){
				//self.root.style.display="";
				self.resize();
			}()

			self.close=function(){
				self.style.display="none"
			}
		  }
  
		  //スタイル読み込み
		  if(styleFile === undefined){
			  appendHtmlFile( document.body.lastElementChild.lastElementChild,
							  'https://bbcdn.githack.com/umiusi/lib/raw/HEAD/dialog/dialog_nomal.html',
							  callbackFunc);
		  }else{
			  appendHtmlFile( document.body.lastElementChild.lastElementChild,
							  styleFile,
							  callbackFunc);
		  }
  
	  }
  
	  /* sleep */
	  function sleep(milliseconds) {
		  return new Promise(resolve => setTimeout(resolve, milliseconds));
  
		  // using:
		  //   async function useFunc() {
		  //     await sleep(5000);
		  //     //proc
		  //   }  
	  }
  
	  /*
		  *	HTML部品追加
		  *		oDom: 追加先の要素
		  *		sHtmlFile: Htmlの部品ファイル(CSSも可)
		  */
	  // //レイアウト要素追加
	  // appendHtmlFile( document.body.lastElementChild, './AvgCss.html');
	  function appendHtmlFile(oDom, sHtmlFile, callbackFunc) {
		  var myXml = new XMLHttpRequest();
		  myXml.onreadystatechange = function(data) {
			  if (myXml.readyState === 4) {
				  if (myXml.status == 200) {
					  oDom.innerHTML = data.target.response;
				  } else {
					  oDom.innerHTML = data.target.response;
				  }
				  callbackFunc();
			  }
		  }
		  myXml.open("GET", sHtmlFile, true);
		  myXml.send(null);
	  }
  
	  /* jQuery記法用 */
	  if (global.$$ === undefined) {
		  global.$$ = function(q) { return document.querySelector(q); }
		  global.$$.all = function(q) { return document.querySelectorAll(q); }
	  }
  
  
	if(typeof global.ytlib === 'undefined'){
	  global.ytlib={};
	}
	global.ytlib.showDialog=showDialog;
	global.ytlib.sleep=sleep;
	global.ytlib.appendHtmlFile=appendHtmlFile;
  })(window);
  
  // window.onload = function() {
  
  //   //山札テスト
  //   {
  //     var talon = new window.Cards.Talon();
  //   console.log(talon.cards);
  //   console.log(talon.getZun());
  //     //console.log(talon.pull());
  //     // talon.setJoker(1);
  //     // talon.shuffle();
  //     // talon.setJoker(2);
  //     // talon.shuffle();
  //   // console.log(talon.cards);
  //   // console.log(talon.getZun());
  //     //talon.reset();
  //   // console.log(talon.cards);
  //   // console.log(talon.getZun());
  //   }
  
  //   //手札テスト
  //   {
  //     //配る
  //     var user1 = new window.Cards.UserCards();
  //     var user2 = new window.Cards.UserCards();
	
  //     user1.inCard(talon.pull());
  //   console.dir(user1.cards);
  //   console.log(user1.getZun());
	
  //     user1.inCard(talon.pull());
  //   console.dir(user1.cards);
  //   console.log(user1.getZun());
  
  //   // console.log(user1.outCard(2));
  //   // console.dir(user1.cards);
  //   // console.log(user1.getZun());
	
  //   console.log(user1.outCard('102'));
  //   console.dir(user1.cards);
  //   console.log(user1.getZun());
	
  //   console.log(talon.cards);
  //   console.log(talon.getZun());
  
  
	
  //     user2.inCard(talon.pull());
  //   console.dir(user2.cards);
  //   console.log(user2.getZun());
	
  //     user2.inCard(talon.pull());
  //   console.dir(user2.cards);
  //   console.log(user2.getZun());
  
  //   console.log(user2.outCard(2));
  //   console.dir(user2.cards);
  //   console.log(user2.getZun());
	
  //   // console.log(user2.outCard('104'));
  //   // console.dir(user2.cards);
  //   // console.log(user2.getZun());
	
  //   console.log(talon.cards);
  //   console.log(talon.getZun());
	
  //   console.dir(user1.cards);
  //   console.log(user1.getZun());
  
  //   }
  
  
  //   return;
  // }
