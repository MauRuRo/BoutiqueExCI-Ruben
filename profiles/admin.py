from django.contrib import admin
from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    # inlines = (OrderLIneItemAdminInline,)

    # readonly_fields = ('order_number', 'date',
    #                    'delivery_cost', 'order_total',
    #                    'grand_total', 'original_bag',
    #                    'stripe_pid')
    
    fields = ('user', 'default_phone_number', 'default_street_address1', 'default_street_address2',
              'default_town_or_city', 'default_county', 'default_postcode',
              'default_country')

    # list_display = ('order_number', 'date', 'full_name',
    #                 'order_total', 'delivery_cost',
    #                 'grand_total',)

    # ordering = ('-date',)

admin.site.register(UserProfile, UserProfileAdmin)