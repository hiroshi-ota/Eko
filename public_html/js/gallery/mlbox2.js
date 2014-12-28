// v2.4 / airmedia.pl / CC license
/** @expose */

function getStyle(n, s) { if(n.currentStyle) { var compStyle = n.currentStyle[s]; } else if(window.getComputedStyle) { var compStyle = window.getComputedStyle(n, null).getPropertyValue(s); } return compStyle; }

function mlbox() {
/** @expose */
	var id=typeof mlbox_dir!=='undefined'?mlbox_dir:'images/',
/** @expose */
	fc=typeof mlbox_fc!=='undefined'?mlbox_fc:'black',
/** @expose */
	bc=typeof mlbox_bg!=='undefined'?mlbox_bg:'white',
	z=1000,
	fa=['.php4','.php5','.php6','.php','.htm','.html','.txt','.asp','.aspx'],
	xh=false,hc=false,
	bg,pg,ct,im,ok,el,ms=false,ms6=false,dt=document,bo=dt.body,
	ht=(dt.compatMode.toLowerCase().indexOf('back')==-1?dt.documentElement:dt.body),
	wh,ww,isOpera=!!window.opera||navigator.userAgent.indexOf(' OPR/')>=0,
	isChrome=!!window.chrome && !isOpera,iem=navigator.userAgent.match(new RegExp("IEMobile", "i"));
/*@cc_on @*/
/*@if(@_jscript_version>=5 && @_jscript_version<=5.6) ms6=true;@end @*/
/*@if(@_jscript_version>=5 && @_jscript_version<=5.8) ms=true;@end @*/

	function init() {
		for(var i in dt.links)
			if(dt.links[i].className && dt.links[i].href && dt.links[i].className.match(/(^|\s)mlbox($|\[|\s)/) && dt.links[i].onclick==null) dt.links[i].onclick = mlbox.load;
		pg = dt.createElement('img');
		pg.setAttribute('src',id+'ml_load.gif');
		with(pg.style) {
			position='absolute';
			backgroundColor=bc;
			display='none';
			zIndex=z+1;
		}
		bo.appendChild(pg);
		pg.onclick=mlbox.die;
	}
/** @expose */
	mlbox.load=function() {
		if(el)return!1;
		if(ms6){var s=bo.getElementsByTagName('select');for(var i=0;i<s.length;i++)s[i].style.visibility='hidden';}
		el=this;
		if(arguments[0] && arguments[0].length>0) {
			el=document.createElement('a');
			el.setAttribute('href',arguments[0]);
		}
		cal();
		bg=dt.createElement('div');
		with(bg.style) {
			top=0;
			left=0;
			position='fixed';
			width=ww+'px';
			height=wh+'px';
			backgroundColor='black';
			opacity='0.7';
			zIndex=z;
		}
		if(ms) {
			bg.style.filter='alpha(opacity=70)';
			bg.style.msFilter='alpha(opacity=70)';
		}
		apos();
		bo.insertBefore(bg,pg);
		pre();
		return!1;
	}
/** @expose */
	mlbox.die = function() {
		if(xh) return;
		if(bg) {
			bo.removeChild(bg);
			bg=null;
			if(ct && im) {
				im.innerHTML='';
				ct.removeChild(im);
				im=null;
			}
			if(ct) {
				bo.removeChild(ct);
				ct=null;
			}
			if(ms6){var s=dt.getElementsByTagName('select');for(var i=0;i<s.length;i++)s[i].style.visibility='';}
			pg.style.display='none';
			el=null;
			dt.onkeydown=ok;
		}
	}
/** @expose */
	mlbox.res = function() {
		if(xh) return!1;
		cal();
		if(bg) {
			bg.style.width=ww+'px';
			bg.style.height=wh+'px';
		}
		apos();
		if(im)
		{
			im.style.height='auto';
			im.style.width='auto';
			if(hc) {
				if(im.offsetHeight > wh-80) {
					im.style.height = (wh-80)+'px';
					im.style.overflowY = 'scroll';
				} else {
					im.style.height = 'auto';
					im.style.overflowY = 'visible';
				}
				if(im.offsetWidth > ww-80) {
					im.style.width = (ww-80)+'px';
					im.style.overflowX = 'scroll';
				} else {
					im.style.width = 'auto';
					im.style.overflowX = 'visible';
				}
			} else {
				if(im.clientHeight > wh-80) {
					im.style.height = (wh-80)+'px';
				}
				if(im.clientWidth > ww-80) {
					im.style.height = 'auto';
					im.style.width = (ww-80)+'px';
				}
			}
			var cty = Math.round((wh-ct.offsetHeight)/2);
			if(ms6) cty+=st();
			var ctx = Math.round((ww-ct.offsetWidth)/2);
			if(ms6) ctx+=sl();
			ct.style.top = cty+'px';
			ct.style.left = ctx+'px';
			if(ms6 || iem)
			{
				ct.style.position = 'absolute';
				ct.style.top = cty+ht.scrollTop+'px';
				ct.style.left = ctx+ht.scrollLeft+'px';
			}
			return [ctx,cty];
		}
		return!1;
	}

	function shw() {
		if(xh) return;
		cal();
		if(bg) {
			bg.style.width=ww+'px';
			bg.style.height=wh+'px';
		}
		apos();
		if(el && im) {
			if(!hc) bg.onclick = mlbox.die;
			ct = dt.createElement('div');
			with(ct.style) {
				position = 'fixed';
				backgroundColor = bc;
				padding = '20px';
				visibility = 'hidden';
				zIndex = z+2;
			}
			dt.body.insertBefore(ct, pg);
			ct.appendChild(im);
			var cty = mlbox.res()[1];
			xh = true;
			if(el.getAttribute('title') && el.getAttribute('title').length > 0) {
				var s = dt.createElement('p');
				with(s.style) {
					margin = '0';
					paddingTop = '6px';
					color = fc;
					lineHeight = 'normal';
					fontSize = '12px';
				}
				s.appendChild(dt.createTextNode(el.getAttribute('title')));
				ct.style.paddingBottom = '8px';
				ct.appendChild(s);
				ct.style.top = (cty-Math.round(s.offsetHeight/2)+4)+'px';
			}

			var s = dt.createElement('img');
			with(s.style) {
				display = 'block';
				position = 'absolute';
				top = '1px';
				right = '1px';
				width = '16px';
				height = '16px';
				cursor = 'pointer';
			}
			s.setAttribute('src', id+'ml_close.gif');
			s.setAttribute('alt', 'ESC');
			s.onclick = mlbox.die;
			ct.appendChild(s);

			var po = null, no = null;
			if(el.className.indexOf('[')>1) {
				var g = el.className.replace(/^(.*)\[/, '').replace(/\](.*)?$/, '');
				var tmp = false, nxt = false, reg = new RegExp('(^|\\s)mlbox\\['+g+'\\]($|\\s)','');
				for(var i in dt.links)
					if(dt.links[i].className && dt.links[i].className.match(reg)) {
						if(po != null) nxt = true;
						if(dt.links[i] == el && po == null) po = tmp;
						tmp = dt.links[i];
						if(nxt && dt.links[i] != el) {
							no = dt.links[i];
							break;
						}
					}
				var w = Math.round(im.offsetWidth/2-10);
				if(hc) w = 45;
				if(po) {
					var s = dt.createElement('div');
					cte(s);
					with(s.style) {
						left = '20px';
						width = w+'px';
						backgroundImage = 'url('+id+'ml_prev.gif)';
					}
					s.onmouseover = function(){this.style.backgroundPosition='center left';}
					s.onclick = function(){bg.onclick=null;chg(po);}
					ct.appendChild(s);
				}
				if(no) {
					var s = dt.createElement('div');
					cte(s);
					with(s.style) {
						right = '20px';
						width = w+'px';
						backgroundImage = 'url('+id+'ml_next.gif)';
					}
					s.onmouseover = function(){this.style.backgroundPosition='center right';}
					s.onclick = function(){bg.onclick=null;chg(no);}
					ct.appendChild(s);
				}
				if(po || no) {
					im.onclick = null;
					im.style.cursor = 'default';
				}
			}

			var kc = 0;
			ok = dt.onkeydown;
			dt.onkeydown = function(event) {
				kc = ('which' in event) ? event.which : event.keyCode;
				if(kc == 37 && po && !hc) {
					if(event.preventDefault) event.preventDefault();
					if(event.stopPropagation) event.stopPropagation();
					bg.onclick = null;
					chg(po);
				}
				if(kc == 39 && no && !hc) {
					if(event.preventDefault) event.preventDefault();
					if(event.stopPropagation) event.stopPropagation();
					bg.onclick = null;
					chg(no);
				}
				if(kc == 27) {
					if(event.preventDefault) event.preventDefault();
					if(event.stopPropagation) event.stopPropagation();
					mlbox.die();
				}
			}

			ct.style.visibility = '';
			pg.style.display = 'none';
			xh=false;
		}
	}

	function chg(obj) {
		if(xh) return;
		dt.onkeydown = ok;
		if(ct) {
			bo.removeChild(ct);
			ct = null;
			im = null;
		}
		el = obj;
		pre();
	}

	var apos = function() {			/* TODO : apos() */
		if(ms6 || iem)
		{
			bg.style.position='absolute';
			bg.style.top = ht.scrollTop+'px';
			bg.style.left = ht.scrollLeft+'px';
		}
	}

	var pre = function() {
		cal();
		with(pg.style) {
			top = (Math.round((wh-pg.offsetHeight-40)/2)+st())+'px';
			left = (Math.round((ww-pg.offsetWidth-40)/2)+sl())+'px';
			padding = '20px';
			display = 'block';
		}
		var ss = el.href.toLowerCase();
		var fnd = false;
		for(var i in fa) if(ss.indexOf(fa[i])>0) {
			fnd = true;
			break;
		}
		if(fnd) {
			hc = true;
			axf();
		}
			else
		{
			hc = false;
			im = dt.createElement('img');
			var ts = (isChrome?'?t='+new Date().getTime():'');
			im.setAttribute('src', el.href+ts);
			im.onclick = mlbox.die;
			im.style.cursor = 'pointer';
			if(im.complete) shw(); else im.onload = shw;
		}
	}

	var cte = function(s) {
		with(s.style) {
			position='absolute';
			top=0;
			height='100%';
			backgroundRepeat='no-repeat';
			backgroundPosition='-1000px -1000px';
			cursor = 'pointer';
		}
		s.onmousedown=function(){return!1;}
		s.onselectstart=function(){return!1;}
		s.onmouseout=function(){this.style.backgroundPosition='-1000px -1000px';}
	}

	var st = function() {
		var s=0;if(window.pageYOffset)s=window.pageYOffset;else{s=ht.scrollTop;}return s;
	}

	var sl = function() {
		var s=0;if(window.pageXOffset)s=window.pageXOffset;else{s=ht.scrollLeft;}return s;
	}

	var cal = function() {
		var w=window;
		wh=w.innerHeight || w.clientHeight || ht.clientHeight;
		ww=w.innerWidth || w.clientWidth || ht.clientWidth;
	}

	var axf = function() {
		if(xh) return;
		try {
			xh = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e) {
			try { xh = new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {
				if(typeof XMLHttpRequest != 'undefined') {
					xh = new XMLHttpRequest();
				}
			}
		}
		if(xh) {
			var sst = '200';
			if(el.href.indexOf('file:/')>-1) sst = '0';
			xh.open('GET', el.href, true);
			xh.onreadystatechange = function() {
				if(xh.readyState == 4) {
					im = dt.createElement('div');
					if(xh.status == sst) im.innerHTML = xh.responseText;
						else im.innerHTML = 'Error! Status='+xh.status;
					xh=false;
					shw();
				}
			}
			xh.send(el.href);
		} else mlbox.die();
	}

	init();

	if(window.innerWidth) {
		var wiW = window.innerWidth + window.innerHeight * 3;
		setInterval(function() {
			if(window.innerWidth + window.innerHeight * 3 != wiW) {
				wiW = window.innerWidth + window.innerHeight * 3;
				mlbox.res();
			}
		}, 150);
	}

}
window['mlbox']=mlbox;
if(window.addEventListener) window.addEventListener('load', mlbox, false); else { if(window.attachEvent) window.attachEvent('onload', mlbox); }