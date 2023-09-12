
const client = require('twilio')(TWILIO_ID, TWILIO_KEY);


client.messages  
      .create({  
        mediaUrl: ['https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C117178086443174257227/tlk_OpYgwD3I9iPz6Lh7OhzQy/1694560182709.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1694646593&Signature=QXZ1%2Flf03mNeSP%2B7xXbm2KuSltk%3D&X-Amzn-Trace-Id=Root%3D1-6500efc1-3605f32d19c528841a3b3d50%3BParent%3D4538b8fb8efc8621%3BSampled%3D1%3BLineage%3D6b931dd4%3A0'],
        from: 'whatsapp:+14155238886', 
        body: 'Hol ',
        to: 'whatsapp:+59177667376'
       })
      .then(message => console.log(message.sid));