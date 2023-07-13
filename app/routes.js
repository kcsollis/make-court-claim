//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Benefit type - either continue the journey or refer user to paper form
router.post('/benefit-type-answer', function (req, res) {

    // Make a variable and give it the value from 'benefit-type'
    var type = req.session.data['benefit-type']

    // Check whether the variable matches a condition
    if (type === "30 hours free childcare scheme" || type === "Child Benefit" || type === "Child Support" || type === "Compensation Recovery Unit" || type === "Contracted Out Employment Group" || type === "Disability Working Allowance" || type === "Health in Pregnancy Grant" || type === "Home Responsibilities Protection" || type === "Incapacity Benefit" || type === "Severe Disablement Allowance" || type === "Tax Credit" || type === "Tax-Free Childcare" || type === "Vaccine Damage Payment"){
      // Send user to paper form
      res.redirect('/live-service/paper-form')
    } else {
      // // Send user to language
      res.redirect('/live-service/language')
    }
  })

  // Does the user want to create an account or not?
  router.post('/save-answer', function (req, res) {

    // Make a variable and give it the value
    var answer = req.session.data['save-appeal']

    // Check whether the variable matches a condition
    if (answer === "save-yes"){
      // Send user to IDAM to create account
      res.redirect('/live-service/idam')
    } else {
      // // Send user to next step
      res.redirect('/live-service/MRN')
    }
  })

    // Does the user have an MRN?
    router.post('/MRN-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['MRN']
  
      // Check whether the variable matches a condition
      if (answer === "MRN-yes"){
        // Send user to enter MRN date
        res.redirect('/live-service/MRN-date')
      } else {
        // // Send user to next step
        res.redirect('/live-service/contacted-DWP')
      }
    })

    // Has the user already contacted DWP?
    router.post('/DWP-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['DWP']
  
      // Check whether the variable matches a condition
      if (answer === "DWP-yes"){
        // Send user to enter explain why they don't have one
        res.redirect('/live-service/MRN-explain')
      } else {
        // // Send user to contact DWP
        res.redirect('/live-service/contact-DWP')
      }
    })

      // Is the MRN date still valid? This isn't real validation, I've just set it to only work if the MRN is dated 2023.
      router.post('/MRN-date-answer', function (req, res) {

        // Make a variable and give it the value
        var answer = req.session.data['MRN-date-year']
    
        // Check whether the variable matches a condition
        if (answer === "2023"){
          // Send user to DWP page
          res.redirect('/live-service/MRN-DWP-address')
        } else {
          // // Send user to contact check date
          res.redirect('/live-service/MRN-check-date')
        }
      })

        // Did the user enter the correct date?
        router.post('/MRN-check-date-answer', function (req, res) {

          // Make a variable and give it the value
          var answer = req.session.data['MRN-check-date']
      
          // Check whether the variable matches a condition
          if (answer === "check-date-yes"){
            // Send user to Why is your appeal late
            res.redirect('/live-service/late-appeal')
          } else {
            // // Send user to back to re-enter date
            res.redirect('/live-service/MRN-date')
          }
        })


        // Is there an appointee?
        router.post('/appointee-answer', function (req, res) {

          // Make a variable and give it the value
          var answer = req.session.data['appointee']
      
          // Check whether the variable matches a condition
          if (answer === "appointee-yes"){
            // Send user to appointee name
            res.redirect('/live-service/appointee-name')
          } else {
            // // Send user to enter their name
            res.redirect('/live-service/name')
          }
        })


           // Do they want SMS notifications and if so, did they give us their number?
           router.post('/notification-preference-answer', function (req, res) {

            // Make a variable and give it the value
            var answer = req.session.data['text-notification']
            var number = req.session.data['phone-number']
        
            // Check whether the variable matches a condition
            if(answer === "yes"){
              if(number){
                  res.redirect('/live-service/use-number')
              } else {
                  res.redirect('/live-service/enter-number')
              }
          } else {
              res.redirect('/live-service/representative')
          }
          })

      // Use number they previously entered?
        router.post('/use-number-answer', function (req, res) {

          // Make a variable and give it the value
          var answer = req.session.data['use-number']
      
          // Check whether the variable matches a condition
          if (answer === "yes"){
            // Send user to representative (continuing journey)
            res.redirect('/live-service/text-confirmation')
          } else {
            // // Send user to enter number
            res.redirect('/live-service/enter-number')
          }
        })


     // Do they want to register a rep?
        router.post('/representative-answer', function (req, res) {

          // Make a variable and give it the value
          var answer = req.session.data['representative']
      
          // Check whether the variable matches a condition
          if (answer === "yes"){
            // Send user to enter rep details
            res.redirect('/live-service/representative-details')
          } else {
            // // Send user to enter number
            res.redirect('/live-service/appeal')
          }
        })


     // Supporting evidence?
     router.post('/evidence-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['supporting-evidence']
  
      // Check whether the variable matches a condition
      if (answer === "yes"){
        // Send user to upload
        res.redirect('/live-service/upload-evidence')
      } else {
        // continue to hearings
        res.redirect('/live-service/hearing')
      }
    })

         // Do they want to attend the hearing?
     router.post('/hearing-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['attend-hearing']
  
      // Check whether the variable matches a condition
      if (answer === "yes"){
        // Send user to hearing options
        res.redirect('/live-service/hearing-options')
      } else {
        // continue to not attending screen
        res.redirect('/live-service/not-attending')
      }
    })

     // Do they need support at the hearing?
     router.post('/hearing-support-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['hearing-support']
  
      // Check whether the variable matches a condition
      if (answer === "yes"){
        // Send user to hearing options
        res.redirect('/live-service/support-details')
      } else {
        // continue to not attending screen
        res.redirect('/live-service/hearing-availability')
      }
    })

    // Do they have dates they can't attend a hearing?
     router.post('/hearing-availability-answer', function (req, res) {

      // Make a variable and give it the value
      var answer = req.session.data['hearing-availability']
  
      // Check whether the variable matches a condition
      if (answer === "yes"){
        // Send user to hearing options
        res.redirect('/live-service/hearing-dates')
      } else {
        // continue to not attending screen
        res.redirect('/live-service/PCQ')
      }
    })


