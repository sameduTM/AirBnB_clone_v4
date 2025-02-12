$(document).ready(function () {
    let amenityDict = {}; // Stores amenities as { id: name }
    let stateDict = {};   // Stores states as { id: name }
    let cityDict = {};    // Stores cities as { id: name }

    // Function to update the displayed locations (states and cities)

    // Function to update the displayed amenities
    function updateAmenities() {
        const selectedAmenities = Object.values(amenityDict).join(', ');
        $(".amenities h4").html(selectedAmenities || '&nbsp;');
    }

    // Handle state checkbox clicks
    $(".locations .popover ul li input[type='checkbox']").click(function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (this.checked) {
            stateDict[id] = name; // Add to state dictionary
        } else {
            delete stateDict[id]; // Remove from state dictionary
        }

    });

    // Handle city checkbox clicks
    $(".locations .popover ul li ul li input[type='checkbox']").click(function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (this.checked) {
            cityDict[id] = name; // Add to city dictionary
        } else {
            delete cityDict[id]; // Remove from city dictionary
        }

    });

    // Handle amenity checkbox clicks
    $(".amenities .popover ul li input[type='checkbox']").click(function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (this.checked) {
            amenityDict[id] = name; // Add to amenity dictionary
        } else {
            delete amenityDict[id]; // Remove from amenity dictionary
        }

        updateAmenities(); // Update the displayed amenities
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
        const filters = {
            amenities: Object.keys(amenityDict),
            states: Object.keys(stateDict),
            cities: Object.keys(cityDict)
        };
        loadPlaces(filters);
    });
});