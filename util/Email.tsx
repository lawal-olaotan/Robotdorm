import mailchimp  from '@mailchimp/mailchimp_marketing'

const emailMarketingProvider = ()=> {


  const authenticate = ()=> {
      mailchimp.setConfig({
        apiKey:process.env.MAILCHIMP,
        server:process.env.MAILCHIMP_REGION
      })
    
  }

  const createContact = async(email_address:string,name:string)=> {
    // sets up email provider  authentication
    authenticate()

    const FNAME = name?.split(' ')[0]
    const contactObject = {
          email_address,
          status:"subscribed",
          merge_fields: { FNAME 
      }}
    await mailchimp.lists.addListMember('e57e782d37',contactObject);
  }

    return {
        createContact
    }
}

export default emailMarketingProvider