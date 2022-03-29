/* eslint-diasble*/
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const stripe = Stripe(
      'pk_test_51KhGlaHAWczgrlmq0kCEt8jCslPiXVDchiwSsnxvmK2LoZvI23r7oeKlvpL7zPk5aZ1IXTzC93Od96lyzprMPo0v004kWG8mvg'
    );
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    console.log(session);

    // 2) Create chechoutform, charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    // showAlert('error', err);
  }
};
