import supabase from './db-client.js';

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method==='OPTIONS')return res.status(204).end();
  try{
    const token=req.headers.authorization?.replace('Bearer ','');
    if(!token)return res.status(401).json({error:'Unauthorized'});
    const {data:{user},error:authError}=await supabase.auth.getUser(token);
    if(authError||!user)return res.status(401).json({error:'Invalid session'});
    if(req.method==='GET'){
      const {data,error}=await supabase.from('user_profiles').select('*').eq('user_id',user.id).limit(1);
      if(error)throw error;return res.status(200).json(data?.[0]||null);
    }
    if(req.method==='POST'){
      const {fullname,age,gender,mobile}=req.body;
      if(!fullname||!age||!gender||!/^\+?[0-9 ()-]{7,18}$/.test(mobile||''))return res.status(400).json({error:'Please provide valid profile information.'});
      const {data,error}=await supabase.from('user_profiles').insert({user_id:user.id,fullname:fullname.trim(),age:Number(age),gender,mobile,email:user.email}).select().single();
      if(error)throw error;return res.status(201).json(data);
    }
    return res.status(405).json({error:'Method not allowed'});
  }catch(err){console.error('Profiles API:',err);return res.status(500).json({error:err.message});}
}
