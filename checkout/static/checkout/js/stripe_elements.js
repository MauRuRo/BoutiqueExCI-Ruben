

var stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
var clientSecret = $('#id_stripe_client_secret').text().slice(1, -1);

var stripe = Stripe(stripePublicKey);
var elements = stripe.elements()

var style = {
  base: {
    color: '#000',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    color: '#dc3545',
    iconColor: '#dc3545',
    ':-webkit-autofill': {
      color: '#dc3545',
    },
  }
};

var card = elements.create('card', {style: style});

card.mount('#card-element')

//  handle realtime validation errors on the card element.

card.addEventListener('change', function (event){
    var errorDiv = document.getElementById('card-errors');
    if (event.error) {
        var html = `<span class="icon" role="alert"></span><i class="fas fa-times"></i></span><span>${event.error.message}</span>`;
        $(errorDiv).html(html);
    } else {
        errorDiv.textContent = '';
    }
});

// handle form submit

var form = document.getElementById('payment-form');

form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  card.update({'diabled': true});
  $('#submit-button').attr('disabled', true);
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
    }
  }).then(function(result) {
    if (result.error) {
        var errorDiv = document.getElementById('card-errors');
        var html = `<span class="icon" role="alert"></span><i class="fas fa-times"></i></span><span>${result.error.message}</span>`;
        $(errorDiv).html(html);
        card.update({'diabled': false});
        $('#submit-button').attr('disabled', false);
    } else {
        if (result.paymentIntent.status === 'succeeded') {
        form.submit();
      }
    }
  });
});