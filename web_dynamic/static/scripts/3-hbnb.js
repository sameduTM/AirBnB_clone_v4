$(document).ready(function () {
    let amenity_dict = {}
    let amenity_list = []
    $("input[type='checkbox']").click(function () {
        if (this.checked) {
            amenity_dict[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenity_dict[$(this).data('id')]
        }
        amenity_list = []
        for (const [key, value] of Object.entries(amenity_dict)) {
            amenity_list.push(value)
        }
        $(".amenities h4").html(amenity_list.join(', '));
    });
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data['status'] === "OK")
            $("div#api_status").addClass("available");
        else {
            $("div#api_status").removeClass("available");
        }
    });
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        data: JSON.stringify({}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            $("section.places").empty();
            Object.entries(data).forEach(([k, v]) => {
                const articleHtml = `<article>
                    <div class="title_box">
                        <h2>${v.name}</h2>
                        <div class="price_by_night">$${v.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${v.max_guest} Guest${v.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${v.number_rooms} Bedroom${v.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${v.number_bathrooms} Bathroom${v.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="user">
                        
                    </div>
                    <div class="description">
                        ${v.description}
                    </div>
                </article>`
                ;
                $("section.places").append(articleHtml);
            });
        }
    });
});
