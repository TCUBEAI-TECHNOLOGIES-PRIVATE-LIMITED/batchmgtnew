import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Batchcreation from './Batchcreation';
import Allbatches from './Allbatches';
import { Authenticator, useAuthenticator,CheckboxField, Input, Label, TextAreaField} from '@aws-amplify/ui-react';
import { Amplify as AmplifyConfig } from 'aws-amplify'; // Import Amplify as AmplifyConfig
import awsconfig from './aws-exports';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import Viewbatch from './Viewbatch';
import AddProduct from './Components/Products/AddProduct'
import ListProducts from './Components/Products/ListProducts'
import ViewProduct from './Components/Products/ViewProduct'
import Header from './Header';

AmplifyConfig.configure(awsconfig); // Use AmplifyConfig instead of Amplify

const App = () => {
  return (
    <>

<Authenticator
      // Default to Sign Up screen
      initialState="signUp"
      // Customize `Authenticator.SignUp.FormFields`
      components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
              <>

<div>
                <Label>
                  Company Name
                </Label>
              </div>
              <Input
              type='text'
              name='custom:Company-Name'
              placeholder= "Enter Company Name"
              required/>
              
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />

                
                <div>
                <Label>
                  Company Address
                </Label>
              </div>
              <TextAreaField
              type='text'
              name='custom:Company-Address'
              placeholder= "Enter Company Address"
              required/>

                {/* Append & require Terms & Conditions field to sign up  */}
                <CheckboxField
                  errorMessage={validationErrors}
                  hasError={!!validationErrors.acknowledgement}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms & Conditions"
                />
              </>
            );
          },
        },
      }}
      services={{
        async validateCustomSignUp(formData) {
          if (!formData.acknowledgement) {
            return {
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
        },
      }}
    >
      {({ signOut, user }) => (
        <main>
          <>
           <Router>
           <Header signOut={signOut}/>

          <Routes>
            <Route path="/" element={<Batchcreation  />} />
            <Route path="/batches" element={<Allbatches  />} />
            <Route path="/batch/:id" element={<Viewbatch  />} />
            <Route path="/addproduct" element={<AddProduct  />} />
            <Route path="/products" element={<ListProducts  />} />
            <Route path="/product/:id" element={<ViewProduct />} />
          </Routes>
          </Router>
          </>
        </main>
      )}
    </Authenticator>
   
     
      
    </>
  );
};

export default App;
