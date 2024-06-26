import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Checkbox, Typography, IconButton, Button } from '@mui/material';
import { buyCourseUpdateUser, fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse } from 'src/redux/actions/cart.action';
import MTNLOGO from '../assets/images/MTN-logo.png';
import PAYCARDLOGO from '../assets/images/paycard-logo.png';
import ORANGELOGO from '../assets/images/orange-logo.png';
import LockIcon from '@mui/icons-material/Lock';
import { notifyErrorFxn,notifyInfoFxn } from 'src/utils/toast-fxn';
import axios from 'axios';
import * as uuid from 'uuid';
import { useNavigate } from 'react-router-dom';
import {setTransactionReference} from 'src/redux/actions/main.action.js'

const PaymentOptionsMtn = () => {
  const [pcChecked, setPcChecked] = useState(false);
  const [mtnChecked, setMtnChecked] = useState(false);
  const [orangeChecked, setOrangeChecked] = useState(false);
  const [momoToken, setMomoToken] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { transactionReference } = useSelector((state) => state.main);
 
 
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { purchasedCourses } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(true);


  const [accessToken,setAccessToken] = useState('');
  const [referenceStore,setReferenceStore] = useState('')

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price && item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);

  const generateOrderId = uuid.v4()

  const courseIdArray = cart.map((item)=>(item.id))

  //console.log("COURSE ID ARRAY IS,---->" ,courseIdArray)

   const cartToSubmit = {courses:cart,affiliateId:user &&user.affiliate}

//console.log("OUR USER DEETS,DO WE GET AFFILIATE?----->",cartToSubmit)


document.getElementById("purchase").addEventListener("click", function () {
  gtag("event", "purchase", {
          // This purchase event uses a different transaction ID
          // from the previous purchase event so Analytics
          // doesn't deduplicate the events.
          // Learn more: https://support.google.com/analytics/answer/12313109
          fullName:user && user.fullName,
          telephone:user && user.telephone,
          transaction_id: `${generateOrderId}`,
          value: totalPrice,
          tax: 0,
          shipping: 0,
          currency: "GNF",
          coupon: "n/a",
          affiliateId:user &&user.affiliate?user.affiliate:"none",
          items: [
            ...(cart.map((item)=>(
              {
                  packLead:item.packLead?item.packLead:false,
                  price:item.price,
                  packId:item.packId?item.packId:null,
                  item_id:item.id,
                  item_name:item.title,
                  coursepack_name:item.packName?item.packName:null,

              }
            ))
             )
          ]
    });
});


 
  // const momoHost = 'sandbox.momodeveloper.mtn.com';
  // const momoTokenUrl = `https://${momoHost}/collection/token/`;
  // const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`;
//
  //const momoTokenUrl = '/api/collection/token/';
  //const momoRequestToPayUrl = '/api/collection/v1_0/requesttopay';

  

  

 // const getMomoToken = async () => {
 //   const token = await axios({
 //     method: 'post',
 //     url: `https://proxy.momoapi.mtn.com/collection/token/`, 
 //     headers: {
 //       'Content-Type': 'application/json',
 //       'Ocp-Apim-Subscription-key': `${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
 //     },
 //   });
//
 //   //console.log('OUR FETCHED TOKEN IS:', token);
 //   setMomoToken(token.data.access_token);
//
 //   //possible errors, if you do CORS, you may need to set up a server and get the token from there
 //   // only EUR currency works in sandbox, but we have specified production so..lets see how it goes

 // };



 // const momoTokenUrl = 'http://localhost:5008/api/get-token';
 // const momoRequestToPayUrl = 'http://localhost:5008/api/requesttopay';
 //const momoPayStatusUrl = 'http://localhost:5008/api/paystatus'


 const momoTokenUrl = 'https://vercel-code-14me.vercel.app/api/get-token'
 const momoRequestToPayUrl = 'https://vercel-code-14me.vercel.app/api/requesttopay';
 const momoPayStatusUrl = 'https://vercel-code-14me.vercel.app/api/paystatus'

 const newVercel = 'https://vercel-code-14me.vercel.app/'

  useEffect(() => {
    dispatch(fetchPurchasedCourse(user?.uid));
 
  }, []);

  const handlePcCheckboxChange = () => {
    setPcChecked(true);
    setMtnChecked(false);
  };

  const handleMtnCheckboxChange = () => {
    setMtnChecked(true);
    setPcChecked(false);
  };


  const startRequestToPay = async () => {
    if(!user){
      notifyErrorFxn("You must be logged in to proceed!");
      return;
    }


     setIsLoadingOne(true);
     notifyInfoFxn("Veuillez patienter... assurez-vous de ne pas actualiser l'écran pendant le processus de paiement.")
   
         if(user && !user.telephone){
      notifyErrorFxn("Please add your phone number in the profile section before you pay via mtn");
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  
     };
       setIsLoading(true);
       axios.post(momoTokenUrl, {}, { headers })
        .then(response => {
            const access_token = response.data.access_token;
            //console.log("ACCESS-TOKEN 1ST REQUEST-->", access_token);
           axios.post(momoRequestToPayUrl, {
            amount: totalPrice,
            currency: 'GNF',
            externalId: `${generateOrderId}`,
            payer: {
              partyIdType: 'MSISDN',
              partyId:`${user && user.telephone && (user.telephone).toString()}`,
              //partyId: '2246534566'
            },
            payerMessage: 'Payment for order',
            payeeNote: 'Payment for order',
            momoToken: access_token
          }).then((res) => {
              //console.log("Payment completed...--->", res.data);
              let today = new Date().toDateString();

            if(/*res.data && res.data.status !== "PENDING" || res.data && res.data.status !== "FAILED"||*/ res.data && res.data.payerReferenceId){
                 //console.log("OUR PAYER REFERENCE ID IS--->",res.data.payerReferenceId)
              setReferenceStore(res.data.payerReferenceId) //,<--- maybe store it in redux for persistence
              dispatch(setTransactionReference(res.data.payerReferenceId))

               setTimeout(()=>{setIsLoadingTwo(false)},30000)
              }else{
                setIsLoadingOne(false);
                notifyErrorFxn(`THERE WAS A PROBLEM INITIATING PAYMENT, PLEASE TRY AGAIN`)

                //console.log("OUR ISSUE LIES IS HERE, CHECK THROUGH RES.DATA---->",res.data)
              }
          }).catch((error) => {
            setIsLoading(false);
            setIsLoadingOne(false);
            console.error('Payment Request Error:', error);
            notifyErrorFxn('Payment Request Error...');
          })
        }).catch(error => {
            // Handle errors
            setIsLoadingOne(false)
            setIsLoading(false);
            console.error(' FAILED TO EVEN GET A TOKEN IN THE FIRST PLACE ------->', error);
            notifyErrorFxn('PROBLEM INITIATING PAYMENT, PLEASE TRY AGAIN');
        });

  }


  const getPaymentStatusAndPurchase = async () => {


    setIsLoadingTwo(true);
    //setTimeout(()=>{setIsLoadingOne(false);},30000) ---> actually I will set it after i get my response on the payment status, for us to be able to try payment again, if it goes wrong


    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  
     };

     axios.post(momoTokenUrl, {}, { headers })
     .then(response => {
      const access_token = response.data.access_token;
      //console.log("ACCESS-TOKEN 2ND REQUEST-->", access_token);


          if(!transactionReference && !referenceStore){
            notifyErrorFxn(`SOMETHING WENT WRONG,WE ARE NOT ABLE TO TRACK THE TRANSACTION`)
            return
          }

     axios.post(momoPayStatusUrl, {
      payerReferenceId: transactionReference?transactionReference:referenceStore,
      momoToken: access_token
    }).then((res) => {
        //console.log("Payment STATUS (IN FINISH PAYMENT) HAS BEEN REQUESTED...---->", res.data);
        let today = new Date().toDateString();

      if(/*res.data && res.data.status !== "PENDING" || res.data && res.data.status !== "FAILED"||*/ res.data && res.data.status === "SUCCESSFUL"){
        dispatch(buyCourse(cartToSubmit, user.id ?? user.uid, today, navigate, setIsLoading));

        
        dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate));
        }else{

        
          if(res.data && res.data.status !== "SUCCESSFUL" ||res.data && res.data.status !== "SUCCESS"  ){
            setIsLoadingOne(false)
            notifyErrorFxn(`THE PAYMENT YOU  TRIED TO MAKE WAS NOT SUCCESSFUL, YOU CAN TRY AGAIN`)

            }


          if(res.data && res.data.reason){
            setIsLoadingOne(false)
            notifyErrorFxn(`MTN MOMO RESPONSE - ${res.data.reason}`)
            //console.log("OUR REASON IS HEREEE---->",res.data.reason)
          }
         
        }
    }).catch((error) => {
      
      setIsLoadingTwo(false);
      console.error('Payment Request Error:', error);
      notifyErrorFxn('Payment Request Error...');
    })

  }).catch(error => {
    // Handle errors
    setIsLoading(false);
    setIsLoadingTwo(false)
    console.error(' FAILED TO EVEN GET A TOKEN IN THE SECOND PLACE ------->', error);
    notifyErrorFxn('PROBLEM FINISHING PAYMENT,MAKE SURE YOU HAVE VERIFIED ON YOUR MOBILE AND TRY AGAIN');
});


  }

  

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '1rem' }}
      >
        <center>
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              //borderBottom: '3px solid red',
              width: '250px',
              marginTop: '20px',
            }}
          >
           <img src={MTNLOGO} alt="MTN Logo" style={{ width: '100px', height: '100px' }} />
          </p>
        </center>
      </Grid>
      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px' }}>
           1.)  Cliquez sur “Vérifier”
          </Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: 400, fontSize: '18px', marginTop: '15px', marginBottom: '15px' }}
          >
           2.)  Après avoir vérifié sur votre téléphone cliquez sur  “Finir paiement”
          
          </Typography>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '0px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#FFFFFF',
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
             
              <Grid item >
               
              <Button
            type="button"
            onClick={() => { startRequestToPay()
             
            }}
            disabled={isLoadingOne === true ? true:false }
            variant="contained"
            style={{
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoadingOne && isLoadingTwo?"Please Wait..": "Vérifier"}
          </Button>
              </Grid>
            </Grid>
          </Paper>
          
         
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 30,
              width: 390,
              border: '0px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#FFFFFF',
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              
              <Grid item>
             
              <Button
              id="purchase"
            type="button"
            onClick={() => {
             getPaymentStatusAndPurchase()
            }}
            disabled={isLoadingTwo === true ? true:false }
            variant="contained"
            style={{
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {"Finir paiement"}
          </Button>

              </Grid>
            </Grid>
          </Paper>

          <br />
         
          <br />
         

         
        </div>
      </Grid>

      

    </Container>
  );
};
export default PaymentOptionsMtn;