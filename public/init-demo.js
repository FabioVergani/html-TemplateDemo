(w=>{'use strict';
	const d=w.document,
	onceWhen=(e,s,c)=>{
		const f=()=>{e.removeEventListener(s,g)},g=o=>{f();c(o)};
		e.addEventListener(s,g);
		return f
	},
	initDemo=w_load=>{
		let demoTitle='Demo';
		const w=w_load.currentTarget,
		stopListen_InitError=onceWhen(w,'error',e=>{e.target.document.title='ERROR';dECL.add('init-error')}),
		d=w.document,
		dECL=d.documentElement.classList,
		starter=d.getElementById('starter');
		//
		if(starter){
			if(starter.getAttribute('data-opt')){
				const demoContent=d.getElementById('demo-content'),
				dataKey=(o,p,v=null)=>{let r=o[p];if(r){try{r=JSON.parse(r.trim())}catch{r=v}}else{r=v};return r},
				demoOpt=dataKey(starter.dataset,'opt'),
				demoLog=demoOpt.log;
				//
				if(demoOpt.title){demoTitle=demoOpt.title};
				//
				if(demoLog.navPerfs){
					for(const e of w.performance.getEntriesByType('navigation')){
						const t=e.type,a=['%s%O',t,e];
						if(t!=='navigate'&&t!=='reload'){
							console.log.apply(null,a)
						}else{
							console.group.apply(null,a);
							console.log(
								'DOM'+'\n\u2000\u251C\u2500\u2004%s:%d'.repeat(3),
								'loaded',(e.domContentLoadedEventEnd-e.domContentLoadedEventStart),
								'complete',e.domComplete,
								'interactive',e.domInteractive
							);
							console.groupEnd()
						}
					}
				};
				//
				if(demoContent){
					const lorems=demoContent.getElementsByClassName('lorem-ipsum'),demoSkins=demoOpt.skins,demoDebug=demoOpt.debug;
					if(demoSkins||demoDebug){
						const frag=d.createDocumentFragment(),createElementIn=(e,s)=>e.appendChild(e.ownerDocument.createElement(s));
						if(demoSkins && demoSkins.length){
							const maxSkin=demoSkins.length;
							if(maxSkin){
								let linkLoaded=false,prevSkin=0,i=frag,loc=w.location;
								const demoRunLocally=loc.href.startsWith('file://'),
								USP=w.URLSearchParams,
								dH=d.head,
								f=createElementIn,
								link=i=f(i,'link'),
								selectSkin=f(i,'select'),
								updateQs=v=>{
									const l=loc;
									let t='skin',s=new USP(l.search);
									if(''==v){s.delete(t)}else{s.set(t,v)};
									s=s.toString();
									t=l.protocol+'//'+l.host+l.pathname;
									if(''!==s){t+='?'+s};
									w.history.pushState({path:t},'',t)
								},
								setSkin=v=>{
									const m=['./skin',null,'.css'],
									s=(m[1]=v!==''?'-'+v:v,m.join('')),
									ok=()=>{
										link.href=s;
										updateQs(prevSkin=v)
									},
									ko=()=>{
										const e=selectSkin,o=e[v-1];
										o.disabled=true;
										o.title='not available';
										updateQs(e.selectedIndex=prevSkin)
									};
									if(link.href!==s){
										if(demoRunLocally){
											const e=f(dH,'script'),g=onceWhen;
											e.async=true;
											new Promise((a,b)=>{g(e,'load',a);g(e,'error',b)}).then(()=>{e.remove();ok()}).catch(()=>{e.remove();ko()});
											e.src=s
										}else{
											fetch(s,{method:'GET'}).then(o=>{(200!==o.status?ko:ok)()})
										}
									}
								};
								i.rel='stylesheet';
								i.href='./skin-1.css';
								i=0;
								while(i<maxSkin){
									const e=f(selectSkin,'option');
									e.textContent=demoSkins[i];
									e.value=i+1;
									++i
								};
								selectSkin.firstElementChild.title='default';
								selectSkin.id='select-skin';
								selectSkin.addEventListener('change',evt=>{const e=evt.target;if(linkLoaded){setSkin(e.value)}else{e.selectedIndex=prevSkin}});
								onceWhen(link,'load',()=>{linkLoaded=true});
								dH.querySelector("link[rel=stylesheet]:last-of-type").after(link);
								demoContent.prepend(selectSkin);
								i=loc.search;
								if(''!==i){
									const o=new USP(i);
									if(o.has('skin')){
										let v=o.get('skin');
										if(v>0 && v<=maxSkin){selectSkin.selectedIndex=v-1}else{prevSkin=v=1};
										setSkin(v)
									}
								}
							}
						};
						if(demoDebug){
							const f=createElementIn,a=f(frag,'label'),b=f(a,'input');
							b.type='checkbox';
							b.id='debug-toggler';
							b.addEventListener('click',()=>{const o=dECL;o[o.toggle('debug')?'remove':'add']('no-debug')})
							a.appendChild(d.createTextNode('debug'));
							demoContent.appendChild(a)
						}
					};
					if(lorems){
						const dummyText=(a,b=1)=>{//phrases max,min
							let i=Math,j=i.max;
							const m=w.phrasesForFakeText||[
								"Tincidunt id aliquet risus feugiat in.",
								"Nisi vitae suscipit tellus mauris a. Tortor id aliquet lectus proin.",
								"Nisl nunc mi ipsum faucibus vitae.",
								"Eu facilisis sed odio morbi quis.",
								"Ut eu sem integer vitae justo eget magna.",
								"Gravida rutrum quisque non tellus orci ac auctor.",
								"Sit amet volutpat consequat mauris nunc congue nisi vitae.",
								"You bred raptors?",
								"Id cursus metus aliquam eleifend mi in nulla",
								"Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a.",
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
								"Elit duis tristique sollicitudin nibh sit. Tincidunt augue interdum velit euismod in.",
								"He's gonna eat the goat?",
								"Dinosaurs eat man; woman inherits the earth.",
								"Mi sit amet mauris commodo quis imperdiet massa tincidunt.",
								"Malesuada fames ac turpis egestas sed. Id porta nibh venenatis cras.",
								"I really hate that man.",
								"Nibh cras pulvinar mattis nunc sed. Massa sapien faucibus et molestie.",
								"That is one big pile of shit.",
								"Why didn't I build it in Orlando?",
								"Check the vending machines.",
								"Sed blandit libero volutpat sed. Dignissim enim sit amet venenatis urna cursus eget.",
								"When you gotta go, you gotta go.",
								"Boy, do I hate being right all the time.",
								"Ian, freeze!",
								"Well, at least you're out of the tree.",
								"I hate this hacker crap!",
								"Remind me to thank John for the wonderful weekend.",
								"Must go faster!",
								"Bloody move!",
								"Elementum pulvinar etiam non quam lacus.",
								"What about the lysine contingency?",
								"Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism.",
								"Uh uh uh!...You didn't say the magic word!",
								"Hold onto your butts.",
								"I can afford more glasses!",
								"I thought you were one of your big brothers.",
								"I'm gonna run you over when I come back down!",
								"Amphibian DNA.",
								"Look at all the blood.",
								"We spared no expense.",
								"Because we're being hunted.",
								"Clever girl.",
								"It's gonna come through the glass!"
							],
							l=m.length,r=i.random,f=i.floor,s=[];
							i=f(j(a,j(1,b)));
							j=0;
							do{
								const n=r();
								let v=f(n*l)+1;
								if(v===j){v=v<l?++v:--v};
								v=m[j=v];
								if(i>2){v=v+(n<.2?v+'\n':'\u0020')};
								s.push(v)
							}while(--i);
							return s.join('')
						};
						for(const lorem of lorems){
							lorem.appendChild(d.createTextNode(dummyText.apply(null,dataKey(lorem.dataset,'range',[40,1]))))
						}
					};
					//...
					if(w.demoStart){w.demoStart(demoContent)}
				}else{
					dECL.add('missing-demo-content')
				}
			}
		}else{
			dECL.add('missing-demo-script')
		};
		//
		dECL.replace('loading','loaded');
		d.title=demoTitle;
		stopListen_InitError()
	};
	if('complete'!==d.readyState){
		d.title='Loading\u2026';
		onceWhen(w,'load',initDemo)
	}else{
		initDemo({currentTarget:w})
	}
})(window);