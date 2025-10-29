// Limpia storage lo antes posible y agrega defensas para evitar saturación
(function(){
  try { sessionStorage.clear(); } catch(e){}
  try { localStorage.clear(); } catch(e){}

  try {
    Object.keys(localStorage || {}).forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
  } catch(e){}
  try {
    Object.keys(sessionStorage || {}).forEach(function(k){ try{ sessionStorage.removeItem(k); }catch(e){} });
  } catch(e){}

  // Envoltura defensiva: intenta evitar ResourceQuotaExceeded en futuros setItem
  ['localStorage','sessionStorage'].forEach(function(storeName){
    try {
      var store = window[storeName];
      if (!store || store.__wrappedForQuota) return;
      var _set = store.setItem.bind(store);
      store.setItem = function(k, v){
        try { _set(k, v); }
        catch(err){
          try { store.removeItem(k); _set(k, v); } catch(_err){ /* silenciar */ }
        }
      };
      store.__wrappedForQuota = true;
    } catch(e){ /* noop */ }
  });
})();