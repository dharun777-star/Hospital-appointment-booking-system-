import supabase from './db-client.js';
const adminOk=req=>req.headers['x-admin-auth']===Buffer.from('admin:admin123').toString('base64');
const cors=res=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization, X-Admin-Auth')};
export default async function handler(req,res){cors(res);if(req.method==='OPTIONS')return res.status(204).end();try{
 if(req.method==='GET'){let query=supabase.from('doctors').select('*').order('doctor_name');if(req.query.department)query=query.eq('department',req.query.department);if(req.query.q)query=query.or(`doctor_name.ilike.%${req.query.q}%,department.ilike.%${req.query.q}%`);const {data,error}=await query;if(error)throw error;return res.status(200).json(data)}
 if(!adminOk(req))return res.status(401).json({error:'Unauthorized administrator'});
 const body=req.body||{};if(req.method==='POST'){if(!body.doctor_name||!body.department||!body.qualification)return res.status(400).json({error:'Name, department and qualification are required.'});const {data,error}=await supabase.from('doctors').insert({doctor_name:body.doctor_name.trim(),department:body.department,experience:Number(body.experience),qualification:body.qualification.trim(),availability:body.availability||[],bio:body.bio||''}).select().single();if(error)throw error;return res.status(201).json(data)}
 if(req.method==='PUT'){const {id,...updates}=body;if(!id)return res.status(400).json({error:'Doctor ID is required.'});const {data,error}=await supabase.from('doctors').update(updates).eq('id',id).select().single();if(error)throw error;return res.status(200).json(data)}
 if(req.method==='DELETE'){const {error}=await supabase.from('doctors').delete().eq('id',body.id);if(error)throw error;return res.status(200).json({ok:true})}
 return res.status(405).json({error:'Method not allowed'});
 }catch(err){console.error('Doctors API:',err);return res.status(500).json({error:err.message})}}
