/*$(function() {
	alert(2);
	$('#logo').popover('hide')
});*/


$(function () {
    $("#tweets").live('hover', function(){
        $("#tweets")
            .popover({
                placement:"bottom",
                title:"Mierda",
                content:"Aquí puedes dar de alta a tus clientes",
                trigger:"hover",
                delay:{ show:500, hide:100 }
            });
    });

});