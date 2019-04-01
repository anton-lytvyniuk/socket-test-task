$(document).ready(function() {
    $('#add-new-room').on('click', () => {
        const room = $('#new-room').val();

        if (!room) return window.alert('Please enter room name');
        $.post({ 
            url: '/rooms', 
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({ room }),  
            success: function() {
                location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.responseText);
             }
        });
    });
}); 