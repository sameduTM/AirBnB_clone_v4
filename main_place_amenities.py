#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity with additional new objects
"""
import random
from models.amenity import Amenity
from models import storage

place_ids = [
    '36d4a968-fa61-4a8d-908f-bb3dcb91834a',  # Golden Cottage ID
    '49c1a530-8ef2-4a42-991b-9e9848bb66ca',  # Skyline Loft ID
    'ff136b20-725e-4b3e-bb93-ecf467c9f223'   # Serenity Villa ID
]

# creation of 3 various Amenity
amenity_1 = Amenity(name="Air Conditioning")
amenity_1.save()
amenity_2 = Amenity(name="Fireplace")
amenity_2.save()
amenity_3 = Amenity(name="Washer/Dryer")
amenity_3.save()
amenity_4 = Amenity(name="Parking")
amenity_4.save()
amenity_5 = Amenity(name="Hot Tub")
amenity_5.save()
amenity_6 = Amenity(name="Pet Friendly")
amenity_6.save()
amenity_7 = Amenity(name="Barbecue Grill")
amenity_7.save()

amenities = [amenity_1, amenity_2, amenity_3,
             amenity_4, amenity_5, amenity_6, amenity_7]

for amenity in amenities:
    # Select a random place from place_ids
    random_place_id = random.choice(place_ids)

storage.save()

print("OK")
