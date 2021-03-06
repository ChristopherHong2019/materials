var descriptors = [];
var properties = [];
var finalData = {"descriptors": descriptors, "properties": properties};

$(document).ready(function(){
  var wrapperD = $(".descriptors");
  var desc_add = $(".addDesc");
  var wrapperP = $(".properties");
  var prop_add = $(".addProp");
  var output = $(".output");
  var d = 1;
  var p = 1;
  $(desc_add).click(function(e){
    //console.log("add desc clicked!");
    e.preventDefault();
    d++;
    var idee = "d" + d.toString();
    $(wrapperD).append('<div><input type="descriptorText" class="add_field" name="descriptor" id=' + idee + '><a href="#" id=' + idee + ' class="remove_field">Remove</a></div>');
    var idee2 = "d" + (d - 1).toString();
    var item = $("#"+idee2).val();
    //console.log(idee2);
    descriptors.push(item);
    console.log("++++++++++++");
    console.log(descriptors);
    console.log("++++++++++++");
    //console.log(data);
  });

  $(prop_add).click(function(e){
    console.log("add prop clicked!");
    e.preventDefault();
    p++;
    var idee = "p" + p.toString();
    $(wrapperP).append('<div><input type="propertyText" class="add_field1" name="property" id=' + idee + '><a href="#" id=' + idee + ' class="remove_field1">Remove</a></div>');
    var idee2 = "p" + (p - 1).toString();
    var item = $("#"+idee2).val();
    console.log(idee2);
    properties.push(item);
    console.log(properties);
    console.log(finalData);
  });

  $(wrapperD).on("click", ".remove_field", function(e){
    //console.log(this.id);
    var onlyNum = this.id.toString().slice(-1);
    var index = onlyNum -1;
    //console.log("~~~~~~~~~~~~~~~~~~~~`` remove of desc");
    //console.log(index);
    descriptors.splice(index, 1);
    //console.log("old pdcount");
    //console.log(d);
    d--;
    //console.log("new d count");
    //console.log(d);
    //console.log("the index");
    //console.log(d);
    e.preventDefault(); $(this).parent('div').remove();
    $(".remove_field").each(function(){
      if (this.id > index+1){
        this.id = this.id -1;
      }
    });
    $(".add_field").each(function(){
      if (this.id > index+1){
        this.id = this.id -1;
      }
    });
    console.log("After remove");
    console.log(descriptors);
  });

  $(wrapperP).on("click", ".remove_field1", function(e){
    var onlyNum = this.id.toString().slice(-1);
    var index = onlyNum-1;
    console.log("~~~~~~~~~~~~~~~~~~~remove of prop~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(index);
    properties.splice(index, 1);
    console.log("old pdcount");
    console.log(p);
    p--;
    e.preventDefault(); $(this).parent('div').remove();
    $(".remove_field1").each(function(){
      if (this.id > index+1){
        this.id = this.id -1;
      }
    });
    $(".add_field1").each(function(){
      if (this.id > index+1){
        this.id = this.id -1;
      }
    });
    console.log("After remove");
    console.log(properties);
  });

  $('form').on('submit', function(event){
    $.ajax({
      url : 'add',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(finalData),
      contentType:"application/json; charset=UTF-8",
      success: function (data) {
        console.log(JSON.stringify(finalData))
        //$("p").text(JSON.stringify(finalData));
        //alert(JSON.stringify(finalData));
      }
    })
    .done(function(data){
      console.log(data)
      $(".output").text(data);
    });
    event.preventDefault();
    window.location.href='/add';
  });
  var rowID = -1;
  var datatable = JSON.parse($("#table").attr("name"));
  console.log(datatable);
  $('.dataframe').DataTable({
  "scrollX": true,
  "scrollY": 200,
  "rowCallback": function( row, data ) {
    //this is needed temp for now because i do not have actual uncertainity data, removing this and having full data will fix the coloring
    if (rowID < 1){
      rowID++;
    }
    var rowIndicies = datatable[rowID]
    //get list of this rowID index and for all indicies in that list, color them.
    console.log("~~~~~~~~");
    console.log(datatable);
    console.log("~~~~~~~~~");
    console.log(datatable[rowID]);
    console.log("~~~~~~~~~");
    console.log(rowID);
    for (i of rowIndicies){
        console.log("COLORING THIS NUM: ")
        console.log(i);
        $('td', row).eq(i).addClass('highlight');
      }
      // if (datatable[index] == 1){
      //   console.log(index);
      //   var id = 0;
      //   if (index >= 30){
      //     id = Math.floor(index / (30 * rowID));
      //     console.log("before math");
      //     console.log(index);
      //     console.log("after math");
      //     console.log(id);
      //   }
        //$('td', row).eq(4).addClass('highlight');
      }
  });
  // var tabley = $('.dataframe').DataTable();
  // console.log(tabley.row(0).data().column(0).data());
  // console.log(tabley.column(0).data());
});
