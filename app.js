
(function(){
 const C=window.APP_CONFIG||{businessName:"Indulge Cafe"};
 const K={users:"sqpos_users",session:"sqpos_session",products:"sqpos_products",categories:"sqpos_categories",orders:"sqpos_orders",staff:"sqpos_staff",settings:"sqpos_settings",held:"sqpos_held"};
 const read=(k,f)=>{try{let v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}};
 const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 function seed(){
   if(!localStorage.getItem(K.products)) write(K.products,window.DEFAULT_PRODUCTS||[]);
   if(!localStorage.getItem(K.categories)){
     let cats=[...new Set((window.DEFAULT_PRODUCTS||[]).map(p=>p.category))];
     write(K.categories,cats.map((name,i)=>({id:i+1,name,active:true})));
   }
   if(!localStorage.getItem(K.users)) write(K.users,[]);
   if(!localStorage.getItem(K.orders)) write(K.orders,[]);
   if(!localStorage.getItem(K.staff)) write(K.staff,[]);
   if(!localStorage.getItem(K.held)) write(K.held,[]);
   if(!localStorage.getItem(K.settings)) write(K.settings,{businessName:C.businessName||"Indulge Cafe",address:"",abn:"",phone:"",gstRate:10,receiptFooter:"Thank you!"});
 }
 seed();
 const A={
   K,read,write,
   money:n=>"$"+Number(n||0).toFixed(2),
   nextId:a=>a.length?Math.max(...a.map(x=>Number(x.id)||0))+1:1,
   session:()=>read(K.session,null),
   requireLogin(){if(!this.session()){location.href="index.html";return false}return true},
   logout(){localStorage.removeItem(K.session);location.href="index.html"},
   products:()=>read(K.products,[]),saveProducts:v=>write(K.products,v),
   categories:()=>read(K.categories,[]),saveCategories:v=>write(K.categories,v),
   orders:()=>read(K.orders,[]),saveOrders:v=>write(K.orders,v),
   staff:()=>read(K.staff,[]),saveStaff:v=>write(K.staff,v),
   held:()=>read(K.held,[]),saveHeld:v=>write(K.held,v),
   settings:()=>read(K.settings,{}),saveSettings:v=>write(K.settings,v),
   today(){let d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")},
   shell(active,title){
     const items=[["dashboard.html","⌂","Home","home"],["pos.html","▦","Checkout","pos"],["orders.html","≡","Orders","orders"],["products.html","□","Items","products"],["sales.html","▥","Reports","sales"],["staff.html","♙","Staff","staff"],["backup.html","⇩","Backup","backup"],["settings.html","⚙","Settings","settings"]];
     return `<div class="side"><div class="logo">I</div>${items.map(x=>`<a class="${active===x[3]?"active":""}" href="${x[0]}"><span class="ico">${x[1]}</span>${x[2]}</a>`).join("")}<a href="#" onclick="App.logout();return false"><span class="ico">↪</span>Logout</a></div>
     <div class="main"><div class="top"><div class="brand">${title||this.settings().businessName||"Indulge Cafe"}</div><div>${this.session()?.name||""}</div></div><div id="page"></div></div>`;
   },
   exportBackup(){
     const payload={version:1,exportedAt:new Date().toISOString(),products:this.products(),categories:this.categories(),orders:this.orders(),staff:this.staff(),settings:this.settings(),held:this.held()};
     const b=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="indulge-pos-backup-"+this.today()+".json";a.click();URL.revokeObjectURL(u);
   },
   importBackup(file,cb){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.products)||!Array.isArray(d.orders))throw Error();this.saveProducts(d.products);this.saveCategories(d.categories||[]);this.saveOrders(d.orders);this.saveStaff(d.staff||[]);this.saveSettings(d.settings||this.settings());this.saveHeld(d.held||[]);cb&&cb()}catch(e){alert("Invalid backup file")}};r.readAsText(file)}
 };
 window.App=A;
})();
