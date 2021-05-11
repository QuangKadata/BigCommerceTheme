/* eslint-disable */
import $ from 'jquery';
import Cookies from "js-cookie/src/js.cookie";
import Noty from "jquery.growl/javascripts/jquery.growl";

export default function() {
    const compareListItems = new Array();
    const compareList = Cookies.get('compare_list');
    function addToCompare(product_id){
        var result = findInList(product_id);
        if(result==1){
            var compareList = Cookies.get('compare_list');
            //console.log(compareList);
            var newCompareList = new Array();
            if(compareList!=null || compareList!=""){
                try{
                    var Clist = compareList.split(",");
                    for(var i = 0; i< Clist.length; i++ ){
                        newCompareList.push(Clist[i]);
                    }
                }
                catch(ex){}
            }
            newCompareList.push(product_id);

            jQuery(".navUser-item--compare span").html(newCompareList.length);
            if(newCompareList.length>0){
              jQuery(".navUser-item--compare").addClass('show');
            }
            Cookies.set('compare_list', newCompareList.toString(), { expires: 7, path: '/' });
            compareCountUpdate();
            $.growl.notice({ title: "Compare", message: "Item Successfully added to comparison list." });
            $('.compare-box[data-compare-id="'+product_id+'"]').parent().addClass('compare-active');
            $('.compare-box[data-compare-id="'+product_id+'"]').parent().find('a.button').removeClass('compare-box');
            if(!$('.nav-item-compare').hasClass('active')){
              $('.nav-item-compare').addClass('active').css('display','inline-block');
            }

        } else if(result==2)  {
            $.growl.warning({title: "Compare", message: "Item already added for comparison." });
        }
        else if(result==4){
            $.growl.warning({title: "Compare", message: "You can't compare more than 4 items at a time. Please remove some items from your list." });
        }
        else {
            $.growl.warning({title: "Compare", message: "Product comparision is not functioning." });
        }

    }
    function compareCountUpdate(){
        var compareList = Cookies.get('compare_list');
      //  console.log(compareList);
        if(compareList!=null || compareList!=""){
            try{
                var Clist = compareList.split(",");
                var totalItemsToCompare = parseInt(Clist.length);
                jQuery(".navUser-item--compare span").html(totalItemsToCompare);
            }
            catch(ex){
                jQuery(".navUser-item--compare span").html("0");
            }

        }

        compareNow();
    }
    function findInList(product_id){
        var compareList = Cookies.get('compare_list');

        if(compareList!=null || compareList!=""){
            try {
                var Clist = compareList.split(",");
                var totalItems = Clist.length;
                if(totalItems>=4){
                    return 4;
                }
                for(var i = 0; i< totalItems; i++ ){
                    var j = i;
                    if(product_id == Clist[j])
                        return 2;
                }
            }catch(ex) {}
        }
        return 1;


    }
    function removeCompareItem(item){
        var compareList = Cookies.get('compare_list');
        var newCompareList = new Array();

        if(compareList!=null || compareList!="") {
            try{
                var Clist = compareList.split(",");

                for(var i = 0; i< Clist.length; i++ ){

                    if(parseInt(Clist[i])!=parseInt(item)){
                        newCompareList.push(Clist[i]);
                        $('.compare-box[data-compare-id="'+Clist[i]+'"]').parent().removeClass('compare-active');
                        $('.compare-box[data-compare-id="'+Clist[i]+'"]').parent().find('a.button').addClass('compare-box');
                    }

                }
                jQuery(".navUser-item--compare span").html(newCompareList.length);
                Cookies.set('compare_list', newCompareList.toString(), { expires: 7, path: '/' });

                if(newCompareList.length<1){
                  Cookies.remove('compare_list');
                  jQuery(".navUser-item--compare").removeClass('show');
                }
            }
            catch(ex){}
            $.growl.warning({title: "Compare", message: "Item Successfully removed from comparison list." });
        }else{
           $.growl.warning({title: "Compare", message: "No items available for comparison !!!!" });
        }
        compareCountUpdate();
    }

    /* logic to send items to compare page */
    function compareNow(){

        let c_count=parseInt($('.navUser-item--compare span').text());
        if(c_count>0){
          $('.navUser-item--compare').addClass('show');
        }
        var compareList = Cookies.get('compare_list');
        if(compareList!=null || compareList!="" || compareList!=undefined){
            try{
                var Clist = compareList.split(",");
                var cItems = "";
                for(var i = 0; i< Clist.length; i++ ){
                    cItems += "/"+Clist[i];
                    $('.compare-box[data-compare-id="'+Clist[i]+'"]').parent().addClass("compare-active");
                    $('.compare-box[data-compare-id="'+Clist[i]+'"]').parent().find('a.button').removeClass('compare-box');
                }
                jQuery(".navUser-item--compare").attr("href","/compare"+cItems);
                if(location.pathname == '/compare/' || location.pathname == '/compare'){
                location.href = "/compare"+cItems;
                }
            }
            catch(ex){}
        } else{

            //$.growl.warning({ message: "No items available for comparison !!!!" });
        }
    }

    if(Cookies.get('compare_list')=="" || Cookies.get('compare_list')==undefined)
    {
      Cookies.remove('compare_list');
    }



    jQuery(document).ready(function(){
		jQuery(document).on("click",".compare-box",function(){

			addToCompare(jQuery(this).attr("data-compare-id"));

		});

    $(document).on('click','.compare-active',function() {
      jQuery(this).removeClass('compare-active');
      // console.log(jQuery(this).find('a.button').attr("data-compare-id"));
      removeCompareItem(jQuery(this).find('a.button').attr("data-compare-id"));
      jQuery(this).find('a.button').addClass('compare-box');
    });

		jQuery(document).on("click",".doRemove",function(){
			removeCompareItem(jQuery(this).attr("data-product-id"));
		});

      if($('.type-compare').length && (Cookies.get('compare_list')!=="" || Cookies.get('compare_list')!==undefined)){
        var compareList = Cookies.get('compare_list');

        try{
          if(jQuery('.compareTable .card').length==0){
              jQuery(".navUser-item--compare span").html("0");
              compareNow();
              jQuery('.compare-table-wrap').html('<p>No Product to compare</p>');
              jQuery('.compare-table-wrap .comparTableCustom').css('display','block');
          }else{
              jQuery('.compare-table-wrap .comparTableCustom').css('display','block');
              if(jQuery('.compareTable .card').length==1){
                jQuery(".navUser-item--compare span").html("1");
                $('.doRemove').attr('href',"/compare/");
              }else{
                var Clist = compareList.split(",");
                var cItems="";
                if(Clist.length==2){
                  // console.log(Clist[0]);
                  $('.doRemove:not([data-product-id="'+Clist[0]+'"])').attr('href',"/compare/"+Clist[0]);
                  $('.doRemove:not([data-product-id="'+Clist[1]+'"])').attr('href',"/compare/"+Clist[1]);
                }
              }
        }

        }catch(ex){

        }

      }

      $(document).ajaxStop(function(){
        var compareList = Cookies.get('compare_list');
        if(compareList!=null || compareList!="" || compareList!=undefined){
            try{
                var Clist = compareList.split(",");
                var cItems = "";
                for(var i = 0; i< Clist.length; i++ ){
                  // console.log(Clist[i])
                   $('#modal .compare-box[data-compare-id="'+Clist[i]+'"]').parent().addClass("compare-active");
                   $('#modal .compare-box[data-compare-id="'+Clist[i]+'"]').parent().find('a.button').removeClass('compare-box');
                }
             }
            catch(ex){}
        } else{

            //$.growl.warning({ message: "No items available for comparison !!!!" });
        }
      });
    });
	compareCountUpdate();
}
/* eslint-enable */
