var data = [
	{
		"Country": "india",
		"City": "bihar",
		"type": "Electric",
		"Department": "$3,000",
		"image": "http://www.sweetwater.com/images/items/120/LPST5HTHDCH-medium.jpg?9782bd"
	},
	{
		"Country": "india",
		"City": "delhi",
		"type": "Electric",
		"Department": "$1,500",
		"image": "http://www.sweetwater.com/images/items/120/SGSEBCH-medium.jpg?e69cfe"
	},
	{
		"Country": "pakistan",
		"City": "delhi",
		"type": "Electric",
		"Department": "$2,000",
		"image": "http://www.sweetwater.com/images/items/120/TelePLMPHB-medium.jpg?28e48b"
	},
	{
		"Country": "india",
		"City": "delhi",
		"type": "Electric",
		"Department": "$2,000",
		"image": "http://www.sweetwater.com/images/items/120/StratAMM3SB2-medium.jpg?dfd0a9"
	},
	{
		"Country": "india",
		"City": "delhi",
		"type": "Electric",
		"Department": "$5,000",
		"image": "http://www.sweetwater.com/images/items/120/G613655GE-medium.jpg?9bfb0e"
	},
	{
		"Country": "india",
		"City": "bihar",
		"type": "Electric",
		"Department": "$5,000",
		"image": "http://www.sweetwater.com/images/items/120/HBII10BGWB-medium.jpg?982763"
	},
	{
		"Country": "india",
		"City": "bihar",
		"type": "Acoustic",
		"Department": "$2,500",
		"image": "http://www.sweetwater.com/images/items/120/SSHBHCNP-medium.jpg?11fbea"
	}
];

var products = "",
	makes = "",
	models = "",
	types = "";

for (var i = 0; i < data.length; i++) {
	var Country = data[i].Country,
	City = data[i].City,
		type = data[i].type,
		Department = data[i].Department,
		rawDepartment = Department.replace("$",""),
		rawDepartment = parseInt(rawDepartment.replace(",","")),
		image = data[i].image;
	
	//create product cards
	products += "<div class='col-sm-4 product' data-make='" + Country + "' data-model='" + City + "' data-type='" + type + "' data-price='" + rawDepartment + "'><div class='product-inner text-center'><img src='" + image + "'><br />Country: " + Country + "<br />City: " + City + "<br />Type: " + type + "<br />Department: " + Department + "</div></div>";
	
	//create dropdown of makes
	if (makes.indexOf("<option value='" + Country + "'>" + Country + "</option>") == -1) {
		makes += "<option value='" + Country + "'>" + Country + "</option>";
	}
	
	//create dropdown of models
	if (models.indexOf("<option value='" + City+"'>" + City + "</option>") == -1) {
		models += "<option value='" + City + "'>" + City + "</option>";
	}
	
	//create dropdown of types
	if (types.indexOf("<option value='" + type + "'>" + type + "</option>") == -1) {
		types += "<option value='" + type + "'>" + type + "</option>";
	}
}

$("#products").html(products);
$(".filter-make").append(makes);
$(".filter-model").append(models);
$(".filter-type").append(types);

var filtersObject = {};

//on filter change
$(".filter").on("change",function() {
	var filterName = $(this).data("filter"),
		filterVal = $(this).val();
	
	if (filterVal == "") {
		delete filtersObject[filterName];
	} else {
		filtersObject[filterName] = filterVal;
	}
	
	var filters = "";
	
	for (var key in filtersObject) {
	  	if (filtersObject.hasOwnProperty(key)) {
			filters += "[data-"+key+"='"+filtersObject[key]+"']";
	 	}
	}
	
	if (filters == "") {
		$(".product").show();
	} else {
		$(".product").hide();
		$(".product").hide().filter(filters).show();
	}
});

//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var Country = $(this).data("make").toLowerCase(),
		City = $(this).data("model").toLowerCase(),
			type = $(this).data("type").toLowerCase();

		if (Country.indexOf(query) > -1 || City.indexOf(query) > -1 || type.indexOf(query) > -1) {
			$(this).show();
		}
	});
});