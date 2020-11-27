from django.shortcuts import render, redirect, reverse
from django.contrib import messages

from .forms import OrderForm

def checkout(request):
    bag = request.session.get('bag', {})
    if not bag:
        messages.error(request, "There's nothing in your bag at the moment")
        return redirect(revers('products'))
    
    order_form = OrderForm()
    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
        'stripe_public_key': 'pk_test_51HsDgjDkrpalIwBc7BEDcca6MTlERYinria7OXBUoKsGDYEqsFGJIzQrsAZgIbwy0r7H8xckVrwnN55KUZi7UKVx00YYVxm0aD',
        'client_secret': 'test client secret',
    }

    return render(request, template, context)