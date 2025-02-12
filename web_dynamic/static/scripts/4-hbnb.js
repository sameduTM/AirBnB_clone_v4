$(document).ready(function () {
    let amenity_dict = {}; // Stores amenities as { id: name }
    let amenity_ids = [];  // Stores selected amenity IDs

    // Combined checkbox click handler
    $("input[type='checkbox']").click(function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (this.checked) {
            amenity_dict[id] = name; // Add to dictionary
            amenity_ids.push(id);   // Add to IDs list
        } else {
            delete amenity_dict[id]; // Remove from dictionary
            const index = amenity_ids.indexOf(id);
            if (index > -1) {
                amenity_ids.splice(index, 1); // Remove from IDs list
            }
        }

        // Update the displayed amenities
        $(".amenities h4").html(Object.values(amenity_dict).join(', '));
    });

    // Check API status
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("API status check failed:", textStatus, errorThrown);
    });

    // Function to load places
    function loadPlaces(filters = {}) {
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            data: JSON.stringify(filters),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                $("section.places").empty(); // Clear existing places
                if (Array.isArray(data)) {
                    data.forEach(place => {
                        const article = `
                            <article>
                                <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                </div>
                                <div class="information">
                                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                </div>
                                <div class="description">
                                    ${place.description}
                                </div>
                            </article>
                        `;
                        $("section.places").append(article);
                    });
                } else {
                    console.error("Unexpected data format:", data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Failed to load places:", textStatus, errorThrown);
            }
        });
    }

    // Initial load of places (no filters)
    loadPlaces();

    // Filter places when the button is clicked
    $("button").click(function () {
        loadPlaces({ amenities: amenity_ids });
    });
});