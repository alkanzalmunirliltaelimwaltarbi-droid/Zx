window.SUPABASE_READY = false;
window.sb = null;
async function initSupabase(){
  const cfg = window.APP_CONFIG || {};
  if(!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return false;
  try{
    if(!window.supabase) return false;
    window.sb = window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
    window.SUPABASE_READY = true;
    return true;
  }catch(e){ console.error(e); return false; }
}
async function cloudRead(){
  if(!window.sb) return null;
  const [a,s,n] = await Promise.all([
    sb.from("announcements").select("*").eq("published",true).order("created_at",{ascending:false}),
    sb.from("services").select("*").eq("published",true).order("created_at",{ascending:false}),
    sb.from("notifications").select("*").eq("published",true).order("created_at",{ascending:false})
  ]);
  if(a.error || s.error || n.error) throw (a.error || s.error || n.error);
  return {
    announcements:(a.data||[]).map(x=>({id:x.id,title:x.title,desc:x.description,priority:x.priority,date:(x.created_at||"").slice(0,10)})),
    services:(s.data||[]).map(x=>({id:x.id,title:x.title,desc:x.description,category:x.category,phone:x.phone,location:x.location})),
    notifications:n.data||[]
  };
}
async function cloudAddAnnouncement(a){
  if(!sb) return;
  const {error}=await sb.from("announcements").insert({title:a.title,description:a.desc,priority:a.priority,published:true});
  if(error) throw error;
}
async function cloudAddService(s){
  if(!sb) return;
  const {error}=await sb.from("services").insert({title:s.title,description:s.desc,category:s.category,phone:s.phone,location:s.location,published:true});
  if(error) throw error;
}
