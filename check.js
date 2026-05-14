const {createClient}=require('@sanity/client');
const client=createClient({projectId:'6272nx4u',dataset:'production',apiVersion:'2024-05-08',token:'skzdglg9MjljRDUDCCNrcath1SgvLKa9HmnQs77w1sFpBkipAMErWrrnNIhykwnqv6cvY95lLaZivodpKST1Wim2avVaWubs60dfrqVnRLsbBC3A06rHc8l2udQMCTqGSS3CqlKSgTrDcBPfE3xUCo4ZtqxVaQ2cCkbsRD2yADBv8WuLrkrB',useCdn:false});
client.fetch('*[_type=="project"]{_id,title,order,image}').then(r=>console.log(JSON.stringify(r,null,2))).catch(console.error);
