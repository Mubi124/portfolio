const {createClient}=require('@sanity/client');
const client=createClient({projectId:'6272nx4u',dataset:'production',apiVersion:'2024-05-08',token:'skzdglg9MjljRDUDCCNrcath1SgvLKa9HmnQs77w1sFpBkipAMErWrrnNIhykwnqv6cvY95lLaZivodpKST1Wim2avVaWubs60dfrqVnRLsbBC3A06rHc8l2udQMCTqGSS3CqlKSgTrDcBPfE3xUCo4ZtqxVaQ2cCkbsRD2yADBv8WuLrkrB',useCdn:false});
client.delete('aaa50a22-29ec-4286-a5d5-7348056404dc').then(r=>console.log('Deleted!')).catch(console.error);
