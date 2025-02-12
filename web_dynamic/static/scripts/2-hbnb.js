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
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
        if(data['status'] === "OK")
            $("div#api_status").addClass("available");
        else {
            $("div#api_status").removeClass("available");
        }
    });
});
